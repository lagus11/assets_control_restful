const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const St_LostSchema = require("../models/status/St_Lost");
const verifyToken = require("../controllers/verifyToken");
const path = require("path");
const fs = require("fs");
const { generateTime } = require("../utils/generateTime");
const { generateNewTag } = require("../utils/generateNewTag");
const { incrementCounter } = require("../utils/incrementCounter");
const verifyRoles = require("../controllers/verifyRoles");

router.post("/extraviado", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  const { idAsset, tag, dateLost, employeeNumber, fullNameEmployee } = req.body; //obtengo los datos de la pagina

  const { newTag, auxTag } = await generateNewTag(tag);
  const { newDate, newDateUrl } = generateTime(dateLost);

  const investReport_url = newDateUrl + "_" + newTag + ".pdf";
  const receiPayment_url = newDateUrl + "_" + newTag + ".pdf";

  const st_lost = new St_LostSchema({
    idAsset: idAsset,
    dateLost: newDate,
    employeeNumber: employeeNumber,
    fullNameEmployee: fullNameEmployee,
    investReport_url: investReport_url,
    receiPayment_url: receiPayment_url,
  });

  try {
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
        "extraviados/acta_investigacion/"
      );

      const rutaRecCobro = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "extraviados/recibo_cobro/"
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

    await st_lost.save();
    await incrementCounter(tag, auxTag);
    res.status(200).json({ ok: true, status: "Extraviado con Exito" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR EXTRAVIADO" });
    }
    if (error.name === "ErrorPdf") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR PDF" });
    }
    return res
      .status(500)
      .json({ ok: false, status: "ERROR AL MANDAR EXTRAVIADO" });
  }
});

router.get("/detalles_extraviado/:id", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const st_lost = await St_LostSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1)
      .populate({ path: "idAsset" });

    return res.status(200).json(st_lost[0]);
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
        "extraviados/acta_investigacion/",
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

router.get( "/ViewReceiPayment/:receiPayment_url", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
    try {
      const ruta = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "extraviados/recibo_cobro/",
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
  const rutaActaInv = path.join(
    __dirname,
    "..",
    "respaldos",
    "/",
    "extraviados/acta_investigacion/"
  );
  img.mv(rutaActaInv + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

router.post("/updateReceiPayment/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status: "Error PDF" });
  }
  const img = req.files.file;
  const rutaRecCobro = path.join(
    __dirname,
    "..",
    "respaldos",
    "/",
    "extraviados/recibo_cobro/"
  );
  img.mv(rutaRecCobro + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

module.exports = router;
