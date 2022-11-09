const express = require('express');
const router = express.Router(); //objeto poder ingresar rutas
const AssetSchema = require('../models/Asset');
const verifyToken = require('../controllers/verifyToken');
const verifyRoles = require('../controllers/verifyRoles');


router.get('/ver_equipos', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
        //desde req podemos traer datos desde verifyToken y validar permisos
        try{
            const limit = Number(req.query.limit) || 10; //recibimos cuantos veremos
            const skip = Number(req.query.skip) || 0; //recibimos desde donde
            const search = req.query.search; //recibimos busqueda
            const sortById = req.query.sortByid;
            const sortByDesc = req.query.sortByDesc;
            const isAsset = req.query.isAsset || 0; // 1 = true, 0 = false
           
            let sortingOrder = {}; //arreglo para ordenar sort
            const ord = sortByDesc ? 1 : -1; //true asc / false desc
            let total = '';

            let asset = null;
            let assets = '';
            let newEquipment_type = {};


            if(!!req.user_type_equipments){
                newEquipment_type = {
                    equipment_type: {$in: req.user_type_equipments}
                }
            }

            if(sortById){
                sortingOrder[sortById] = ord; // id con order
            }else{
                sortingOrder["_id"] = -1; //default id con desc
            }

            if(isAsset == 1){
                asset = {
                    status: {$nin: ["BAJA"/*, "ROBADO"*/]}
                };
            }else{
                asset = {
                    status: {$in: ["BAJA"/*, "ROBADO"*/]}
                };
            }

            //preguntamos si existe search
            if(search){
                //obtenemos datos con busqueda en tag
                //constante para buscar globalmente en todos los campos bd
                    const findGlobal = [
                        {tag: { $regex: search}}, 
                        {make: {$regex: search}},
                        {model: {$regex: search}},
                        {serial_number: {$regex: search}},
                        {asset_code: {$regex: search}},
                        {asset_type: {$regex: search}},
                        //{equipment_type: {$regex: search}}, <- GENERA PROBLEMA CON POPULATE
                        {status: {$regex: search}},
                        {invoice: {$regex: search}},
                        //{supplier: {$regex: search}},
                        //{asset_company: {$regex: search}},
                        //{location: {$regex: search}},
                        //{datePurchase: {$regex: search}}
                    ];
                    
                    /*const assets = AssetSchema.aggregate([{
                        $lookup: {
                            from: "equipment_type",
                            let: { "equipment_type": '$equipment_type._id'},
                            //localField: 'equipment_type',
                            //foreignField: '_id',
                            //as: 'equipment_type',
                            pipeline: [
                                {
                                    $match:{
                                        $expr: {
                                            $and: [
                                                {$in: ["_id", "$$equipment_type"]},
                                                {$eq: ["$name", 'Movil']},
                                            ]
                                        }
                                    }
                                }
                            ],
                            as: "newDatas"
                        }
                    }]);*/
                   //                                                                                          collaction tome en cuenta valor en la comparacion
               
                  assets = await AssetSchema.find({$and: [{$or: [
                    {tag: { $regex: search}}, 
                    {make: {$regex: search}},
                    {model: {$regex: search}},
                    {serial_number: {$regex: search}},
                    {asset_code: {$regex: search}},
                    {asset_type: {$regex: search}},
                    {status: {$regex: search}},
                    {invoice: {$regex: search}},
                    ]},
                    {newEquipment_type}]
                    /*[{$or: findGlobal}, asset]*/}).lean()
                   .populate({path: 'supplier', select: 'name'})
                   .populate({path: 'equipment_type', select: 'name'})
                   .populate({path: 'asset_company', select: 'name'})
                   .populate({path: 'location', select: 'name'})
                   .sort(sortingOrder).skip(skip).limit(limit).collation({locale: "en_US", numericOrdering: true}); //datos obtenidos
                   total = await AssetSchema.count({$and: [{$or: findGlobal}, asset]}); //contador 
                    //assets = await AssetSchema.find({$or: findGlobal}, {"status": {$ne: "Baja"}}).lean().sort(sortingOrder).skip(skip).limit(limit).collation({locale: "en_US", numericOrdering: true}); //datos obtenidos
                   // assets = await AssetSchema.find({$and: [{$or: findGlobal}, {"status": {$ne: "Baja"}}]}).lean().sort(sortingOrder).skip(skip).limit(limit).collation({locale: "en_US", numericOrdering: true}); //datos obtenidos
                  
                }else{
                //obtenemos datos sin busqueda
                
                   assets = await AssetSchema.find({$and: [newEquipment_type, asset]}).lean()
                    .populate({path: 'supplier', select: 'name'})
                    .populate({path: 'equipment_type', select: 'name'})
                    .populate({path: 'asset_company', select: 'name'})
                    .populate({path: 'location', select: 'name'})
                    .sort(sortingOrder).skip(skip).limit(limit).collation({locale: "en_US", numericOrdering: true});
                    
                    total = await AssetSchema.count({$and: [newEquipment_type, asset]}); //contador
                    
                }

            
            
            //calculo el total de paginas que hay 
            const paginated = Math.ceil(total / limit);
            return res.status(200).json({
                                        data: assets,
                                        page: {
                                            limit,
                                            skip,
                                            total,
                                            paginated
                                        }});
        }
        catch(error){
            console.log(error);
            return res.status(500).send({status: "ERROR ALGO SALIO MAL"});
        }
});

router.get('/ver_editar_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async(req, res) => {
    try{
        const find = await AssetSchema.findById(req.params.id)
        .populate('mobileDetail')
        .populate('desktopDetail');

        if( !find ) throw "NOT FOUND";
        res.status(200).json(find);
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EQUIPO NO ENCONTRADO'});
        }
        return res.status(500).send({status: 'ERROR ALGO SALIO MAL'}); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
    }
});

router.get('/ver_detalles_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async(req, res) => {
    try{
        const find = await AssetSchema.findById(req.params.id)
        .populate({path: 'supplier', select: 'name'})
        .populate({path: 'equipment_type', select: 'name'})
        .populate({path: 'asset_company', select: 'name'}) //encuentra y borra documento
        .populate({path: 'location', select: 'name'}) //encuentra y borra documento
        .populate('mobileDetail')
        .populate('desktopDetail');
        if( !find ) throw "NOT FOUND";
        res.status(200).json(find);
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EQUIPO NO ENCONTRADO'});
        }
        console.log(error);
        return res.status(500).send({status: 'ERROR ALGO SALIO MAL'}); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
    }
});

router.post('/agregar_equipo', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async(req, res) => {
    const {
        tag,
        make,
        model,
        serial_number,
        asset_code,
        asset_type,
        equipment_type,
        status,
        invoice,
        supplier,
        asset_company,
        location,
        datePurchase,
        observation,
        mobileDetail,
        desktopDetail
     } = req.body; //obtengo los datos de la pagina
     console.log(req.body);

     const Asset = new AssetSchema({
        tag: tag,
        make: make,
        model: model,
        serial_number: serial_number,
        asset_code: asset_code,
        asset_type: asset_type,
        equipment_type: equipment_type,
        status: status,
        invoice: invoice,
        supplier: supplier,
        asset_company: asset_company,
        location: location,
        datePurchase: datePurchase,
        dateRegistration: new Date(),
        observation: observation,
        mobileDetail: mobileDetail,      
        desktopDetail: desktopDetail
     });
     console.log(Asset);
     try{
         await Asset.save();
         return res.status(200).json({status: 'Equipo Guardado'});
     }catch(error){
        console.log(error);
        if(error.name === "ValidationError"){ 
            return res.status(400).json({status: 'ERROR AL REGISTRAR EL EQUIPO'});
        }
        return res.status(500).send({status: 'ERROR AL AGREGAR EL EQUIPO'});
     }
});

router.put('/editar_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) =>{
    const { 
        tag,
        make,
        model,
        serial_number,
        asset_code,
        asset_type,
        equipment_type,
        status,
        invoice,
        supplier,
        asset_company,
        location,
        datePurchase,
        dateDrop,
        observation,
        mobileDetail,     
        desktopDetail
    } = req.body; //obtengo los datos que me mandan
    console.log(req.body);
    const newAsset = { 
        tag,
        make,
        model,
        serial_number,
        asset_code,
        asset_type,
        equipment_type,
        status,
        invoice,
        supplier,
        asset_company,
        location,
        datePurchase,
        dateDrop,
        observation,
        mobileDetail,     
        desktopDetail
     }; //creo una nueva tarea
     try{
        const find = await AssetSchema.findByIdAndUpdate(req.params.id, newAsset, {runValidators: true});
        if( !find ) throw "NOT FOUND";
        return res.status(200).json({status: 'Equipo Actualizado'});
     }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EQUIPO NO ENCONTRADO'});
        }
        console.log(error);
        return res.status(500).send({status: 'ERROR AL ACTUALIZAR EL EQUIPO'}); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
     }
});

router.put('/cambioState_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
    const { status, location } = req.body;
    const newStatus = { status, location };
    try{
        const find = await AssetSchema.findByIdAndUpdate(req.params.id, newStatus, {runValidators: true});
        if( !find ) throw "NOT FOUND";
        return res.status(200).json({status: 'Estatus Actualizado'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EQUIPO NO ENCONTRADO'});
        }
        console.log(error);
        return res.status(500).send({status: 'ERROR AL ACTUALIZAR EL ESTATUS'}); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
    }
});

router.delete('/eliminar_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
    try{
        const find = await AssetSchema.findByIdAndRemove(req.params.id); //encuentra y borra documento
        if( !find ) throw "NOT FOUND";
        res.status(200).json({status: 'Equipo Eliminado'});
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EQUIPO NO ENCONTRADO'});
        }
        return res.status(500).send({status: 'ERROR AL ELIMINAR EL EQUIPO'}); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
    }
});

router.get('/detalles_equipos', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try {
        const assets = await AssetSchema.find().count(); //datos obtenidos
        const stock = await AssetSchema.find({'status':'STOCK'}).count(); //datos obtenidos
        const asignado = await AssetSchema.find({'status':'ASIGNADO'}).count(); //datos obtenidos
        const prestamo = await AssetSchema.find({'status':'PRESTAMO'}).count(); //datos obtenidos
        const reparacion = await AssetSchema.find({'status':'REPARACIÓN'}).count(); //datos obtenidos
        const robado = await AssetSchema.find({'status':'ROBADO'}).count(); //datos obtenidos
        const baja = await AssetSchema.find({'status':'BAJA'}).count(); //datos obtenidos

        return res.status(200).json({
            data: {
                assets: assets, 
                stock: stock, 
                asignado: asignado,
                prestamo: prestamo, 
                reparacion: reparacion, 
                robado: robado, 
                baja: baja
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({status: "ERROR ALGO SALIO MAL"});
    }
});

router.get('/ver_tipo_equipo/:equipment_type', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]),  async (req, res) => {
    try{
        const find = await AssetSchema.find({equipment_type: req.params.equipment_type})
        .populate({path: 'supplier', select: 'name'})
        .populate({path: 'equipment_type', select: 'name'})
        .populate({path: 'asset_company', select: 'name'}) //encuentra y borra documento
        .populate({path: 'location', select: 'name'}) //encuentra y borra documento
        .populate('mobileDetail')
        .populate('desktopDetail');
        if( !find ) throw "NOT FOUND";
        res.status(200).json(find);
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EQUIPO NO ENCONTRADO'});
        }
        console.log(error);
        return res.status(500).send({status: 'ERROR ALGO SALIO MAL'}); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
    }
});

router.post('/ver_tipos_equipos/', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try{
        const find = await AssetSchema.find({$and: [{equipment_type: {$in: req.body.type}}]})
        .populate({path: 'supplier', select: 'name'})
        .populate({path: 'equipment_type', select: 'name'})
        .populate({path: 'asset_company', select: 'name'}) //encuentra y borra documento
        .populate({path: 'location', select: 'name'}) //encuentra y borra documento
        .populate('mobileDetail')
        .populate('desktopDetail').sort({equipment_type: -1});
        if( !find ) throw "NOT FOUND";
        res.status(200).json(find);
    }catch(error){
        if(error === "NOT FOUND"){
            return res.status(404).json({status: 'ERROR EQUIPO NO ENCONTRADO'});
        }
        console.log(error);
        return res.status(500).send({status: 'ERROR ALGO SALIO MAL'}); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
    }
});
module.exports = router;