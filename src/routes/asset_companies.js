const express = require('express');
const router = express.Router(); //objeto poder ingresar rutas
const Asset_CompanySchema = require('../models/Asset_Company');
const verifyToken = require('../controllers/verifyToken');
const verifyRoles = require('../controllers/verifyRoles');

router.get('/ver_empresas_activo', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try{
        const asset_company = await Asset_CompanySchema.find().sort({_id: -1});
        return res.status(200).json(asset_company);
    }catch(error){
        return res.status(500).send({status: "ERROR ALGO SALIO MAL"});
    }
});

router.post('/agregar_empresa_activo', verifyToken, verifyRoles(["admin"]), async(req, res) => {
    const {
        name,
        businessName,
        location
     } = req.body; //obtengo los datos de la pagina

     const asset_company = new Asset_CompanySchema({
        name: name,
        businessName: businessName,
        location: location
     });
     console.log(asset_company);
     try{
         await asset_company.save(); //guardo en la bd
         return res.status(200).json({status: 'Empresa Guardado'});
     }catch(error){
        res.status(500).send({status: 'ERROR AL REGISTRAR LA EMPRESA'});
     }
});


router.put('/editar_empresa_activo/:id', verifyToken, verifyRoles(["admin"]), async (req, res) => {
    const {
        name: name,
        businessName: businessName,
        location: location
    } = req.body; //obtengo los datos que me mandan

    const newAsset_companies = {
        name,
        businessName,
        location
    };
    try {
        const find = await Asset_CompanySchema.findByIdAndUpdate(req.params.id, newAsset_companies);
        if( !find ) throw "NOT FOUND";
        return res.status(200).json({status: 'Empresa Actualizada'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EMPRESA NO ENCONTRADA'});
        }
        return res.status(500).send({status: 'ERROR AL ACTUALIZAR LA EMPRESA'}); //guardo el nuevo proveedor con la id que obtengo y mando documento actualizado
    }
});

router.delete('/eliminar_empresa_activo/:id', verifyToken, verifyRoles(["admin"]), async (req, res) => {
    try{
        const find = await Asset_CompanySchema.findByIdAndDelete(req.params.id);
        if( !find ) throw "NOT FOUND";
        res.status(200).json({status: 'Empresa Eliminada'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EMPRESA NO ENCONTRADA'});
        }
        return res.status(500).send({status: 'ERROR AL ELIMINAR LA EMPRESA'});
    }
})

module.exports = router;