const express = require('express');
const router = express.Router(); //objeto poder ingresar rutas
const AssetD_DesktopSchema = require('../models/details_asset/AssetD_Desktop');
const verifyToken = require('../controllers/verifyToken');
const verifyRoles = require('../controllers/verifyRoles');

router.get('/ver_detalles_desktop', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try{
        const assetD_desktop = await AssetD_DesktopSchema.find().sort({_id: -1});
        return res.status(200).json(assetD_desktop);
    }catch(error){
        return res.status(500).send({status: "ERROR ALGO SALIO MAL"});
    }
});

router.post('/agregar_detalles_desktop', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async(req, res) => {
    const {
        so,
        procesador,
        gb
     } = req.body; //obtengo los datos de la pagina

     const assetD_desktop = new AssetD_DesktopSchema({
        so: so,
        procesador: procesador,
        gb: gb
    });
     console.log(assetD_desktop);
     try{
         await assetD_desktop.save(); //guardo en la bd
         return res.status(200).json({id: assetD_desktop._id});
     }catch(error){
        res.status(500).send({status: 'ERROR AL REGISTRAR EL DETALLE DEL EQUIPO'});
     }
});

router.put('/editar_detalles_desktop/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
    const {
        so,
        procesador,
        gb
    } = req.body;

    const newDetailDesktop = {
        so: so,
        procesador: procesador,
        gb: gb
    }
    try {
        const find = await AssetD_DesktopSchema.findByIdAndUpdate(req.params.id, newDetailDesktop);
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