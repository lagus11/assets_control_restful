const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const St_AssignationSchema = require("../models/status/St_Assignation");
const verifyToken = require("../controllers/verifyToken");
const verifyRoles = require("../controllers/verifyRoles");
const path = require("path");
const fs = require("fs");
const { generateTime } = require("../utils/generateTime");
const  { generateNewTag } = require("../utils/generateNewTag");
const  { incrementCounter } = require("../utils/incrementCounter");

router.post("/asignar", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  const {
    idAsset,
    tag,
    employeeNumber,
    name,
    lastname,
    area,
    immBoss,
    dateAssignation,
  } = req.body; //obtengo los datos de la pagina
  try {
  
    const {newTag, auxTag} = await generateNewTag(tag);
    const { newDate, newDateUrl } = generateTime(dateAssignation);

    const urlPdf = newDateUrl + "_" + newTag + ".pdf";
    const st_assignation = new St_AssignationSchema({
      idAsset: idAsset,
      dateAssignation: newDate,
      employeeNumber: employeeNumber,
      name: name,
      lastname: lastname,
      area: area,
      immBoss: immBoss,
      urlPdf: urlPdf,
    });

    if (!!req.files) {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ status: "Error PDF" });
      }
      const pdf = req.files.file;
      const ruta = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "asignados",
        "/",
        "resguardo/"
      );
      pdf.mv(ruta+ urlPdf, async (err) => {
      });
    }
    await st_assignation.save();
    await incrementCounter(tag, auxTag);
    res.status(200).json({ ok: true, status: "Asignación con Exito" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ ok: false, status: "ERROR AL REGISTRAR" });
    }
    if (error.name === "ErrorPdf") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR PDF" });
    }
    return res.status(500).json({ ok: false, status: "ERROR AL ASIGNAR" });
  }
});

router.get("/detalles_asignar/:id", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const st_assignation = await St_AssignationSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1)
      .populate({ path: "idAsset" });

    return res.status(200).json(st_assignation[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

router.get("/ViewPdf/:urlPdf", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
   const ruta = path.join(
      __dirname,
      "..",
      "respaldos",
      "/",
      "asignados",
      "/",
      "resguardo/",
      `${req.params.urlPdf}`
    );
    res.status(200).download(ruta, function (err) {
      if (err) {
        return res.status(404).json("Pdf no encontrado");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/updatePdf/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  try{
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ status: "Error PDF" });
    }
    const img = req.files.file;
    const ruta = path.join(
      __dirname,
      "..",
      "respaldos",
      "/",
      "asignados",
      "/",
      "resguardo/"
    );
    img.mv(ruta + img.name, async (err) => {
      //if (err) throw "ErrorPdf";
      console.log(err)
    });
  
    return res.status(200).json({ status: "PDF Actualizado" });
  }catch(error){
    console.log(error);
  }
});


module.exports = router;
