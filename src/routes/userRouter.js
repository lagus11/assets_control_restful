const express = require('express');
const router = express.Router(); //objeto poder ingresar rutas
const UserSchema = require('../models/User');
const { generateToken, generateRefreshToken } = require('../utils/generateToken');
const verifyToken = require('../controllers/verifyToken');
const jwt = require("jsonwebtoken");
/*
router.get('/ver', async (req, res) => {
   const users = await UserSchema.find();
   //console.log(users);
   res.json(users);
});
*/
/*
router.get('/:user/:password', async (req, res) => {
  const user =  await User.find({$and: [{user: req.params.user},{ password: req.params.password}]});
  res.json(user);
});*/

// NOTA ESTA RUTA GENERA ERROR NAVEGAR VARIAS VENTANAS
// SE QUEDA ESPERANDO LOS DATOS DE LA CONSULTA PARA LLENAR LA TABLA
/*
router.get('/favicon.ico', async (req, res) => {
    res.status(204);
});
*/
let refreshTokens = [];


router.get('/', async (req, res) => {
    res.status(200).send("<h1>Servidor en funcionamiento<h1/>");
});
/*
router.post('/', async (req, res) => {

   const  { user, password } = req.body;
   const User = new UserSchema({
      user: user,
      password: password
   });

   await User.save(err => {
    if(err){
        res.status(500).json({status: 'Usuario No Guardado'});
    }else{
        res.status(200).json({status: 'Usuario Guardado'});
    }
   }); //guardo en la bd
});*/

router.post('/authenticate', async (req, res) => {
    const { user, password } = req.body;
    UserSchema.findOne({user}, (err, user) => {
        try{
            if(err){
                res.status(500).json({status: 'ERROR AL AUTENTICAR'});
            } else if (!user){
                res.status(403).json({status: 'USUARIO Y/O CONTRASENA INCORRECTA'});
            } else{
                user.isCorrectPassword(password, (err, result) => {
                    if(err){
                        return res.status(500).send({status: 'ERROR AL AUTENTICAR'});
                    } else if(result){
                        //return res.status(200).json({estatus: 'USUARIO AUTENTICADO CORRECTAMENTE'});
                        //res.json({estatus: 'USUARIO AUTENTICADO CORRECTAMENTE', ok: true});
                        const token = generateToken({userId: user._id, name: user.name, role: user.role});
                        const refreshToken = generateRefreshToken({userId: user._id, name: user.name, role: user.role}, res);
                        //refreshTokens.push(refreshToken);
                        res.status(200).json({token: token});
                        
                        //probar la lista y negar el acceso 
                        //refreshTokens.push(token);
                        //refreshTokens.map((tokens) => {
                        //    console.log(tokens);
                        //})
                    } else{
                        return res.status(403).json({status: 'USUARIO Y/O CONTRASENA INCORRECTA'});
                    }
                });
            }
        }catch(error){
            console.log("EXTISTIO UN ERROR");
        }
    });
});

router.post("/refreshToken", async (req, res) => {
    try{
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw SyntaxError("Not exist RefreshToken");
        const {user} = jwt.verify(refreshTokenCookie, process.env.secretRefreshToken);
        refreshTokens = refreshTokens.filter((token) => token !== refreshTokenCookie);
        console.log(user);
        const newAccessToken = generateToken(user);
        //const newRefreshToken = generateRefreshToken(user, res); <---- genera nuevo refresh 1h, causa siempre este activa

        //refreshTokens.push(newRefreshToken);
        return res.status(200).json(newAccessToken);
    }catch(error){
        const TokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT malformado",
            "Not exist RefreshToken": "Refresh Token no existe"
          };
          if(error.message === 'jwt expired'){
            return res.status(401).json(TokenVerificationErrors[error.message]);
          }
          return res.status(403).json(TokenVerificationErrors[error.message]);
    }
});


/*
router.post("/refresh", (req, res) => {
    //tomamos el refresh token from the user
    const refreshToken = req.body.token;
    
    //enviamos error si es que invalido
    if(!refreshToken) return res.status(401).json({status: "Tu no estas Autenticado"});
    if(!refreshToken.includes(refreshToken)){
        return res.status(403).json({status: "Refresh token is not validate"});
    }

    
    //si es ok, creamos access token, refresh token

})
*/
router.post("/logout", verifyToken, (req, res) => {
    res.status(200).json({status: "You logged out successfully"});
})

module.exports = router;