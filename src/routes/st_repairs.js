const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const St_RepairSchema = require("../models/status/St_Repair");
const St_DamagedSchema = require("../models/status/St_Damaged");
const AssetSchema = require("../models/Asset");
const verifyToken = require("../controllers/verifyToken");
const path = require("path");
const fs = require("fs");
const { generateTime } = require("../utils/generateTime");
const { generateNewTag } = require("../utils/generateNewTag");
const { incrementCounter } = require("../utils/incrementCounter");
const verifyRoles = require("../controllers/verifyRoles");

router.post("/reparar", verifyToken, verifyRoles(["admin", "user_type_equipment"]),async (req, res) => {
  const { idAsset, tag, supplier, dateRepair, ultimateStat } = req.body; //obtengo los datos de la pagina

  try {
    const { newTag, auxTag } = await generateNewTag(tag);
    const { newDate, newDateUrl } = generateTime(dateRepair);

    const invoice_url = newDateUrl + "_" + newTag + ".pdf";
    const st_repair = new St_RepairSchema({
      idAsset: idAsset,
      dateRepair: newDate,
      supplier: supplier,
      invoice_url: invoice_url,
      ultimateStat: ultimateStat,
    });

    if (!!req.files) {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ status: "Error PDF" });
      }
      const invoice = req.files.invoice;
      const rutaFactura = path.join(
        __dirname,
        "..",
        "respaldos",
        "/",
        "reparaciones/factura/"
      );

      invoice.mv(rutaFactura + invoice_url, async (err) => {
        if (err) throw "ErrorPdf";
      });
    }
    await st_repair.save();
    await incrementCounter(tag, auxTag);
    res.status(200).json({ ok: true, status: "Reparación con Exito" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR REPARACIÓN" });
    }
    if (error.name === "ErrorPdf") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR PDF" });
    }
    return res
      .status(500)
      .json({ ok: false, status: "ERROR AL MANDAR REPARACIÓN" });
  }
});

router.get("/detalles_reparacion/:id", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const st_repair = await St_RepairSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1)
      .populate({ path: "idAsset" })
      .populate({path: 'supplier', select: 'name'});

    return res.status(200).json(st_repair[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

router.get("/ViewPdf/:invoice_url", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    const ruta = path.join(
      __dirname,
      "..",
      "respaldos",
      "/",
      "reparaciones/factura/",
      `${req.params.invoice_url}`
    );
    res.status(200).download(ruta, function (err) {
      if (err) {
        return res.status(404).json("Pdf no encontrado");
      }
    });
  } catch (error) {
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

router.post("/updateInvoice/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status: "Error PDF" });
  }
  const img = req.files.file;
  const rutaFactura = path.join(
    __dirname,
    "..",
    "respaldos",
    "/",
    "reparaciones/factura/"
  );
  img.mv(rutaFactura + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

/* A PARTIR DE AQUI USO 2 O MAS COLLECCIONES */
router.get("/returnStatus/:id", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  try {
    const st_repair = await St_RepairSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1);

    if (st_repair[0].ultimateStat !== "STOCK") {
      const st_damaged = await St_DamagedSchema.find({
        idAsset: req.params.id,
      })
        .sort({ _id: -1 })
        .limit(1);

      await AssetSchema.findByIdAndUpdate(
        req.params.id,
        { status: st_damaged[0].ultimateStat },
        { runValidators: true }
      );
    } else {
      await AssetSchema.findByIdAndUpdate(
        req.params.id,
        { status: "STOCK" },
        { runValidators: true }
      );
    }

    return res.status(200).json({ status: "Cambio con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

router.get("/returnHistory/:id", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  try {
    const st_repair = await St_RepairSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1);

    if (st_repair[0].ultimateStat !== "STOCK") {
      const st_damaged = await St_DamagedSchema.find({
        idAsset: req.params.id,
      })
        .sort({ _id: -1 })
        .limit(1);

      return res.status(200).json({ ok: true, status: st_damaged[0] });
    } else {
      return res.status(200).json({ ok: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

module.exports = router;
