const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const St_StolenSchema = require("../models/status/St_Stolen");
const verifyToken = require("../controllers/verifyToken");
const path = require("path");
const fs = require("fs");
const { generateTime } = require("../utils/generateTime");
const { generateNewTag } = require("../utils/generateNewTag");
const { incrementCounter } = require("../utils/incrementCounter");
const verifyRoles = require("../controllers/verifyRoles");


router.post("/robado", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  const { idAsset, tag, dateStolen, employeeNumber, fullNameEmployee } =
    req.body; //obtengo los datos de la pagina

  try {
    const { newTag, auxTag } = await generateNewTag(tag);
    const { newDate, newDateUrl } = generateTime(dateStolen);

    const investReport_url = newDateUrl + "_" + newTag + ".pdf";
    const actPublMinistry_url = newDateUrl + "_" + newTag + ".pdf";

    const st_stolen = new St_StolenSchema({
      idAsset: idAsset,
      dateStolen: newDate,
      employeeNumber,
      employeeNumber,
      fullNameEmployee,
      fullNameEmployee,
      investReport_url: investReport_url,
      actPublMinistry_url: actPublMinistry_url,
    });

    if (!!req.files) {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ status: "Error PDF" });
      }
      const investReport = req.files.investReport;
      const actPublMinistry = req.files.actPublMinistry;

      const rutaActaInv = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "robados/acta_investigacion/"
      );

      const rutaActaMinPub = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "robados/acta_ministerio_publico/"
      );

      investReport.mv(rutaActaInv + investReport_url,
        async (err) => {
          if (err) throw "ErrorPdf";
        }
      );

      actPublMinistry.mv(rutaActaMinPub + actPublMinistry_url,
        async (err) => {
          if (err) throw "ErrorPdf";
        }
      );
    }

    await st_stolen.save();
    await incrementCounter(tag, auxTag);
    res.status(200).json({ ok: true, status: "Robado con Exito" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR ROBADO" });
    }
    if (error.name === "ErrorPdf") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR PDF" });
    }
    return res
      .status(500)
      .json({ ok: false, status: "ERROR AL MANDAR ROBADO" });
  }
});

router.get("/detalles_robado/:id", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const st_stolen = await St_StolenSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1)
      .populate({ path: "idAsset" });

    return res.status(200).json(st_stolen[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

router.get("/ViewInvestReport/:investReport_url", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try {
      const ruta = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "robados/acta_investigacion/",
        `${req.params.investReport_url}`
      );
      res.status(200).download(ruta, function (err) {
        if (err) {
          return res.status(404).json("Pdf no encontrado");
        }
      });
    } catch (error) {
      return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
    }
  }
);

router.get("/ViewActPublMinistry/:actPublMinistry_url", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]),async (req, res) => {
    try {
      const ruta = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "robados/acta_ministerio_publico/",
        `${req.params.actPublMinistry_url}`
      );
      res.status(200).download(ruta, function (err) {
        if (err) {
          return res.status(404).json("Pdf no encontrado");
        }
      });
    } catch (error) {
      return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
    }
  }
);

router.post("/updateInvestReport/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status: "Error PDF" });
  }
  const img = req.files.file;
  const rutaActaInv = path.join(
    __dirname,
    "..",
    "respaldos",
    "/",
    "robados/acta_investigacion/"
  );
  img.mv(rutaActaInv + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

router.post("/updateActPublMinistry/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status: "Error PDF" });
  }
  const img = req.files.file;
  const rutaActaMinPub = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "robados/acta_ministerio_publico/"
      );
  img.mv(rutaActaMinPub + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

module.exports = router;
