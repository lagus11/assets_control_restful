const express = require('express');
const router = express.Router(); //objeto poder ingresar rutas
const AssetD_MobileSchema = require('../models/details_asset/AssetD_Mobile');
const verifyToken = require('../controllers/verifyToken');
const verifyRoles = require('../controllers/verifyRoles');

router.get('/ver_detalles_movil', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try{
        const assetD_mobile = await AssetD_MobileSchema.find().sort({_id: -1});
        return res.status(200).json(assetD_mobile);
    }catch(error){
        return res.status(500).send({status: "ERROR ALGO SALIO MAL"});
    }
});

router.post('/agregar_detalles_movil', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async(req, res) => {
    const {
        numberPhone,
        imei,
        company
     } = req.body; //obtengo los datos de la pagina

     const assetD_mobile = new AssetD_MobileSchema({
        numberPhone: numberPhone,
        imei: imei,
        company: company
     });
     console.log(assetD_mobile);
     try{
         await assetD_mobile.save(); //guardo en la bd
         return res.status(200).json({id: assetD_mobile._id});
     }catch(error){
        res.status(500).send({status: 'ERROR AL REGISTRAR EL DETALLE DEL EQUIPO'});
     }
});

router.put('/editar_detalles_movil/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
    const {
        numberPhone,
        imei,
        company 
    } = req.body;

    const newDetailMobile = {
        numberPhone: numberPhone,
        imei: imei,
        company: company
    }
    try {
        const find = await AssetD_MobileSchema.findByIdAndUpdate(req.params.id, newDetailMobile);
        if( !find ) throw "NOT FOUND";
        return res.status(200).json({status: 'OK'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR DETALLES EQUIPO NO ENCONTRADO'});
        }
        return res.status(500).send({status: 'ERROR AL ACTUALIZAR DETALLES EQUIPO'}); //guardo el nuevo proveedor con la id que obtengo y mando documento actualizado
    }
});


module.exports = router;