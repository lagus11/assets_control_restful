const express = require('express');
const verifyRoles = require('../controllers/verifyRoles');
const router = express.Router();//objeto para poder ingresar rutas
//const StatusSchema = require('../models/Status');
const verifyToken = require('../controllers/verifyToken');

router.post('/agregar_status', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async(req, res) => {
   const {
        idEmployee,
        idAsset,
        status,
        name,
        lastname,
        area,
    } = req.body; //obtengo los datos de la pagina

    const Status = new StatusSchema({
        idEmployee: idEmployee,
        idAsset: idAsset,
        status: status,
        name: name,
        lastname: lastname,
        area: area
    });

    console.log(Status);
    if(!name){
        
    }

    try{
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({status: "Error PDF"});
        } 
        const img = req.files.file;
        
        img.mv('respaldos//'+ img.name, async (err) =>{
            if (err) throw 'ErrorPdf';
        });
        await Status.save();
        res.status(200).json({ok: true, status: 'Asignación con Exito'});
    }catch(error){
        if(error.name === 'ValidationError'){
            return res.status(400).json({ok: false, status: 'ERROR AL REGISTRAR'});
        }
        if(error.name === 'ErrorPdf'){
            return res.status(400).json({ok: false, status: 'ERROR AL REGISTRAR PDF'});
        }
        return res.status(500).json({ok: false, status: 'ERROR AL ASIGNAR'})
    }
});

module.exports = router;