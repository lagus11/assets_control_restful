const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
 
    let token = req.headers?.authorization;
    let refreshToken = req.cookies.refreshToken; 
    
    try{
      if(!token) throw new SyntaxError("No Bearer");
      token = token.split(" ")[1];
     
      //desarrollo en diferentes plataformas
      jwt.verify(token, process.env.secretToken);
      if(!refreshToken) throw new SyntaxError("Not exist RefreshToken");
      

      //podemos mandar los permisos o roles
        //req.usuario = usuario.usuario;
        //console.log(usuario.usuario);
      next();
    }catch(error){
      console.log(error);
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
}

module.exports = verifyToken;