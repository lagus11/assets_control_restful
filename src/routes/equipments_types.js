const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const Equipment_TypeSchema = require("../models/Equipment_Type");
const verifyToken = require("../controllers/verifyToken");
const verifyRoles = require("../controllers/verifyRoles");

router.get("/ver_tipoEquipo",verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]),
  async (req, res) => {
    try {
      let newEquipment_type = {};

      if (!!req.user_type_equipments) {
        newEquipment_type = {
          _id: { $in: req.user_type_equipments },
        };
      }

      const equipment_type = await Equipment_TypeSchema.find({$and: [newEquipment_type]}).sort({
        _id: -1,
      });
      return res.status(200).json(equipment_type);
    } catch (error) {
      return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
    }
  }
);

router.post("/agregar_tipoEquipo",verifyToken, verifyRoles(["admin"]), async (req, res) => {
    const { name, description } = req.body; //obtengo los datos de la pagina

    const equipment_type = new Equipment_TypeSchema({
      name: name,
      description: description,
    });
    console.log(equipment_type);
    try {
      await equipment_type.save(); //guardo en la bd
      return res.status(200).json({ status: "Tipo de Equipo Guardado" });
    } catch (error) {
      res.status(500).send({ status: "ERROR AL REGISTRAR EL TIPO EQUIPO" });
    }
  }
);

router.put("/editar_tipoEquipo/:id", verifyToken, verifyRoles(["admin"]), async (req, res) => {
    const { name, description } = req.body;

    const newEquipment_type = {
      name,
      description,
    };

    try {
      const find = await Equipment_TypeSchema.findByIdAndUpdate(
        req.params.id,
        newEquipment_type
      );
      if (!find) throw "NOT FOUND";
      return res.status(200).json({ status: "Tipo de Equipo Actualizado" });
    } catch (error) {
      if (error === "NOT FOUND") {
        return res
          .status(404)
          .json({ status: "ERROR TIPO DE EQUIPO NO ENCONTRADO" });
      }
      return res
        .status(500)
        .send({ status: "ERROR AL ACTUALIZAR EL TIPO DE EQUIPO" });
    }
  }
);

router.delete("/eliminar_tipoEquipo/:id", verifyToken, verifyRoles(["admin"]), async (req, res) => {
    try {
      const find = await Equipment_TypeSchema.findByIdAndRemove(req.params.id); //encuentra y borra documento
      if (!find) throw "NOT FOUND";
      res.status(200).json({ status: "Tipo de Equipo Eliminado" });
    } catch (error) {
      if (error === "NOT FOUND") {
        return res
          .status(404)
          .json({ status: "ERROR TIPO DE EQUIPO NO ENCONTRADO" });
      }
      return res
        .status(500)
        .send({ status: "ERROR AL ELIMINAR EL TIPO DE EQUIPO" });
    }
  }
);

router.get("/detalles_tiposEquipos", verifyToken, verifyRoles(["admin"]), async (req, res) => {
    try {
      const equipments_types = await Equipment_TypeSchema.find().count(); //datos obtenidos
      return res.status(200).json(equipments_types);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
    }
  }
);

module.exports = router;
