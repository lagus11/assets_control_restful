const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const St_DamagedSchema = require("../models/status/St_Damaged");
const verifyToken = require("../controllers/verifyToken");
const path = require("path");
const fs = require("fs");
const { generateTime } = require("../utils/generateTime");
const { generateNewTag } = require("../utils/generateNewTag");
const { incrementCounter } = require("../utils/incrementCounter");
const verifyRoles = require("../controllers/verifyRoles");

router.post("/danado", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  const {
    idAsset,
    tag,
    employeeNumber,
    fullNameEmployee,
    dateDamaged,
    ultimateStat,
  } = req.body; //obtengo los datos de la pagina

  try {
    const { newTag, auxTag } = await generateNewTag(tag);
    const { newDate, newDateUrl } = generateTime(dateDamaged);

    const investReport_url = newDateUrl + "_" + newTag + ".pdf";
    const receiPayment_url = newDateUrl + "_" + newTag + ".pdf";

    const st_damaged = new St_DamagedSchema({
      idAsset: idAsset,
      dateDamaged: newDate,
      investReport_url: investReport_url,
      employeeNumber: employeeNumber,
      fullNameEmployee: fullNameEmployee,
      receiPayment_url: receiPayment_url,
      ultimateStat: ultimateStat,
    });

    if (!!req.files) {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ status: "Error PDF" });
      }
      const investReport = req.files.investReport;
      const receiPayment = req.files.receiPayment;

      const rutaActaInv = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "danados/acta_investigacion/"
      );

      const rutaRecCobro = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "danados/recibo_cobro/"
      );

      investReport.mv(rutaActaInv + investReport_url,
        async (err) => {
          if (err) throw "ErrorPdf";
        }
      );

      receiPayment.mv(rutaRecCobro + receiPayment_url,
        async (err) => {
          if (err) throw "ErrorPdf";
        }
      );
    }

    await st_damaged.save();
    await incrementCounter(tag, auxTag);
    res.status(200).json({ ok: true, status: "Dañado con Exito" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR DAÑADO" });
    }
    if (error.name === "ErrorPdf") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR PDF" });
    }
    return res
      .status(500)
      .json({ ok: false, status: "ERROR AL MANDAR DAÑADO" });
  }
});

router.get("/detalles_danado/:id", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const st_damaged = await St_DamagedSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1)
      .populate({ path: "idAsset" });

    return res.status(200).json(st_damaged[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

router.get( "/ViewInvestReport/:investReport_url", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try {
      const ruta = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "danados/acta_investigacion/",
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

router.get("/ViewReceiPayment/:receiPayment_url", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try {
      const ruta = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "danados/recibo_cobro/",
        `${req.params.receiPayment_url}`
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
  const ruta =  path.join(
    __dirname,
    "..",
    "respaldos",
    "/",
    "danados/acta_investigacion/"
  );
  img.mv(ruta + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

router.post("/updateReceiPayment/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status: "Error PDF" });
  }
  const img = req.files.file;
  const ruta =  path.join(
    __dirname,
    "..",
    "respaldos",
    "/",
    "danados/recibo_cobro/"
  );
  img.mv(ruta + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

module.exports = router;
