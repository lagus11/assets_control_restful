const express = require('express');
const router = express.Router(); //objeto poder ingresar rutas
const Microsoft_UserSchema = require('../models/Microsoft_User');
const verifyTokenMicrosoft = require('../controllers/verifyTokenMicrosoft');
const { generateToken, generateRefreshToken } = require("../utils/generateToken");
const verifyToken = require('../controllers/verifyToken');
const verifyRoles = require('../controllers/verifyRoles');

router.get('/ver_usuario_autorizado', verifyToken, verifyRoles(["admin"]), async (req, res) => {
    try{
        const microsoft_user = await Microsoft_UserSchema.find().sort({_id: -1}); //muestro todas las cuentas ordenadas ingreso
        return res.status(200).json(microsoft_user);
    }catch(error){
        return res.status(500).send({status: "ERROR ALGO SALIÓ MAL"});
    }
});

router.post('/agregar_usuario_autorizado', verifyToken, verifyRoles(["admin"]), async(req, res) => {
    const {
        email,
        name,
        role
     } = req.body; //obtengo los datos de la pagina

     const usuarios_autorizados = new Microsoft_UserSchema({
        email: email,
        name: name,
        role: role,
     }); //creo esquema con los datos
     try{
         console.log(usuarios_autorizados);
         await usuarios_autorizados.save(); //guardo en la bd
         return res.status(200).json({status:'usuario autorizado Guardado'});
     }catch(error){
        if(error.name === "ValidationError"){
            return res.status(400).json({status: 'ERROR AL REGISTRAR EL USUARIO AUTORIZADO'});
        }
        return res.status(500).send({status: 'ERROR AL REGISTRAR EL USUARIO'});
     }
});

router.post('/usuario_autorizado', verifyTokenMicrosoft, async (req, res) => {

    try{
        Microsoft_UserSchema.findOne({email: req.email}, (err, user) => {
            if(err) {
                return res.status(500).json({status: 'ERROR AL AUTENTICAR'});
            }else if (!user){
                return res.status(404).json({status: 'EL USUARIO NO EXISTE'});
            } else {
                //hago el token para accesso que contiene el id
                const token = generateToken({userId: user._id, name: user.name, role: user.role});
                const refreshToken = generateRefreshToken(user._id, res);
                return res.status(200).json({token: token});
            }
        });
    }catch(error){
        return re.status(500).send({status: 'ERROR AL AUTENTICAR'});
    }
});

router.put('/editar_usuario_autorizado/:id', verifyToken, verifyRoles(["admin"]), async (req, res) => {
    const {
        email,
        name,
        role 
    } = req.body;

    const newUserAutorization = {
        email,
        name,
        role
    }
    try {
        const find = await Microsoft_UserSchema.findByIdAndUpdate(req.params.id, newUserAutorization);
        if( !find ) throw "NOT FOUND";
        return res.status(200).json({status: 'Usuario Autorizado Actualizado'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR USUARIO AUTORIZADO NO ENCONTRADO'});
        }
        return res.status(500).send({status: 'ERROR AL ACTUALIZAR EL USUARIO AUTORIZADO'}); //guardo el nuevo proveedor con la id que obtengo y mando documento actualizado
    }
});

router.delete('/eliminar_usuario_autorizado/:id', verifyToken, verifyRoles(["admin"]), async (req, res) => {
    try{
        const find = await Microsoft_UserSchema.findByIdAndRemove(req.params.id); //encuentra y borra documento
        if( !find ) throw "NOT FOUND";
        res.status(200).json({status: 'Usuario Autorizado Eliminado'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR USUARIO AUTORIZADO NO ENCONTRADO'});
        }
        return res.status(500).send({status: 'ERROR AL ELIMINAR EL USUARIO AUTORIZADO'});
    }
});

router.get('/detalles_usuarios', verifyToken, verifyRoles(["admin"]), async (req, res) => {
    try {
        const users = await Microsoft_UserSchema.find().count(); //datos obtenidos
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.status(500).send({status: "ERROR ALGO SALIO MAL"});
    }
});


module.exports = router;