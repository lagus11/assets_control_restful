const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const verifyToken = require("../controllers/verifyToken");
const verifyRoles = require("../controllers/verifyRoles");
const LocationSchema = require("../models/Location");

router.post("/agregar_ubicacion", verifyToken, verifyRoles(["admin"]), async (req, res) => {
  const { name, type } = req.body; //obtengo los datos de la pagina

  const locations = new LocationSchema({
    name: name,
    type: type,
  });
  console.log(locations);
  try {
    await locations.save(); //guardo en la bd
    return res.status(200).json({ status: "Ubicación Guardada" });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log(error);
      return res
        .status(400)
        .json({ status: "ERROR AL REGISTRAR LA UBICACIÓN" });
    }
    return res.status(500).send({ status: "ERROR AL REGISTRAR LA UBICACIÓN" });
  }
});

router.get("/ver_ubicaciones", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const location = await LocationSchema.find().sort({_id: -1});
    return res.status(200).json(location);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

router.put("/editar_ubicacion/:id", verifyToken, verifyRoles(["admin"]), async (req, res) => {
  const { name, type } = req.body;

  const newLocation = {
    name,
    type,
  };

  try {
    const find = await LocationSchema.findByIdAndUpdate(
      req.params.id,
      newLocation
    );
    if (!find) throw "NOT FOUND";
    return res.status(200).json({ status: "Ubicación Actualizada" });
  } catch (error) {
    if (error === "NOT FOUND") {
      return res
        .status(404)
        .json({ status: "ERROR UBICACIÓN NO ENCONTRADA" });
    }
    return res
      .status(500)
      .send({ status: "ERROR AL ACTUALIZAR LA UBICACIÓN" });
  }
});

router.delete("/eliminar_ubicacion/:id", verifyToken, verifyRoles(["admin"]), async (req, res) => {
  try {
    const find = await LocationSchema.findByIdAndRemove(req.params.id); //encuentra y borra documento
    if (!find) throw "NOT FOUND";
    res.status(200).json({ status: "Ubicación Eliminada" });
  } catch (error) {
    if (error === "NOT FOUND") {
      return res
        .status(404)
        .json({ status: "ERROR UBICACIÓN NO ENCONTRADA" });
    }
    return res
      .status(500)
      .send({ status: "ERROR AL ELIMINAR LA UBICACIÓN" });
  }
});

module.exports = router;
