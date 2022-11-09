const express = require('express');
const router = express.Router(); //objeto poder ingresar rutas

const SupplierSchema = require('../models/Supplier');
const verifyToken = require('../controllers/verifyToken');
const verifyRoles = require('../controllers/verifyRoles');

router.get('/ver_proveedores', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try{
        const suppliers = await SupplierSchema.find().sort({_id: -1});
        return res.status(200).json(suppliers);
    }catch(error){
        return res.status(500).send({status: "ERROR ALGO SALIO MAL"});
    }
});

router.post('/agregar_proveedor', verifyToken, verifyRoles(["admin"]), async(req, res) => {
    const {
        name,
        address,
        phone_number,
        email,
        type,
        comment
     } = req.body; //obtengo los datos de la pagina

     const suppliers = new SupplierSchema({
        name: name,
        address: address,
        phone_number: phone_number,
        email: email,
        type: type,
        comment: comment
     });
     console.log(suppliers);
     try{
         await suppliers.save(); //guardo en la bd
         return res.status(200).json({status: 'Proveedor Guardado'});
     }
     catch(error){
        if(error.name === "ValidationError"){ 
            console.log(error);
            return res.status(400).json({status: 'ERROR AL REGISTRAR EL PROVEEDOR'});
        }
        return res.status(500).send({status: 'ERROR AL REGISTRAR EL PROVEEDOR'});
     }
});

router.put('/editar_proveedor/:id', verifyToken, verifyRoles(["admin"]), async (req, res) =>{
    const { 
        name,
        address,
        phone_number,
        email,
        type,
        comment
     } = req.body; //obtengo los datos que me mandan
    const newSupplier = { 
        name,
        address,
        phone_number,
        email,
        type,
        comment
     }; //creo una nueva tarea
     try{
        const find = await SupplierSchema.findByIdAndUpdate(req.params.id, newSupplier);
        if ( !find ) throw "NOT FOUND";
        return res.status(200).json({status: 'Proveedor Actualizado'});
     }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR PROVEEDOR NO ENCONTRADO'});
        }
        return res.status(500).send({status: 'ERROR AL ACTUALIZAR EL PROVEEDOR'}); //guardo el nuevo proveedor con la id que obtengo y mando documento actualizado
    }
});

router.delete('/eliminar_proveedor/:id', verifyToken, verifyRoles(["admin"]), async (req, res) => {
    try{
        const find = await SupplierSchema.findByIdAndRemove(req.params.id); //encuentra y borra documento
        if( !find ) throw "NOT FOUND";
        res.status(200).json({status: 'Proveedor Eliminado'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR PROVEEDOR NO ENCONTRADO'});
        }
        return res.status(500).json({status: 'ERROR AL ELIMINAR EL PROVEEDOR'});
    }
});

router.get('/detalles_proveedores', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try {
        const suppliers = await SupplierSchema.find().count(); //datos obtenidos
        return res.status(200).json(suppliers);
    }catch(error){
        console.log(error);
        return res.status(500).json({status: "ERROR ALGO SALIO MAL"});
    }
});

module.exports = router;