const express = require("express");
const verifyRoles = require("../controllers/verifyRoles");
const router = express.Router(); //objeto poder ingresar rutas
const verifyToken = require("../controllers/verifyToken");
const History_assetSchema = require("../models/History_Asset");

router.post("/agregar_historial", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  const { idAsset, EmployeeNumber, fullNameEmployee } = req.body; //obtengo los datos de la pagina

  const dateDelivery = new Date();
  
  const history_asset = {
    idAsset: idAsset,
    EmployeeNumber: EmployeeNumber,
    fullNameEmployee: fullNameEmployee,
    dateDelivery: dateDelivery,
  };

  const history_assetSave = new History_assetSchema(history_asset);

  try {
    const find = await History_assetSchema.findOne({ idAsset: idAsset }); //guardo en la bd si no existe el registro

    if (!!find) {
      //si existe un activo con su registro historial, nomas actualiza, contrario guarda registro
      await History_assetSchema.findByIdAndUpdate(find.id, history_asset);
    } else {
      await history_assetSave.save();
    }
    return res.status(200).json({ status: "Historial Guardado" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      console.log(error);
      return res
        .status(400)
        .json({ status: "ERROR AL REGISTRAR EL HISTORIAL" });
    }
    return res.status(500).send({ status: "ERROR AL REGISTRAR EL HISTORIAL" });
  }
});

router.get("/ver_historial/:idAsset", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const find = await History_assetSchema.find({idAsset: req.params.idAsset})
    if (!find) throw "NOT FOUND";
    res.status(200).json(find);
  } catch (error) {
    if (error === "NOT FOUND") {
      return res.status(404).json({ status: "ERROR HISTORIAL NO ENCONTRADO" });
    }
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" }); //guardo el nuevo equipo con la id que obtengo y mando documento actualizado
  }
});

module.exports = router;
