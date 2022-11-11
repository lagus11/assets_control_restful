const express = require("express");
const router = express.Router(); //objeto poder ingresar rutas
const St_LendSchema = require("../models/status/St_Lend");

const verifyToken = require("../controllers/verifyToken");
const path = require("path");
const fs = require("fs");
const { generateTime } = require("../utils/generateTime");
const { generateNewTag } = require("../utils/generateNewTag");
const { incrementCounter } = require("../utils/incrementCounter");
const verifyRoles = require("../controllers/verifyRoles");

router.post("/prestar", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  const {
    idAsset,
    tag,
    employeeNumber,
    name,
    lastname,
    area,
    immBoss,
    dateLendInit,
    dateLendFinish,
  } = req.body; //obtengo los datos de la pagina

  try {
    const { newTag, auxTag } = await generateNewTag(tag);
    const { newDate, newDateUrl } = generateTime(dateLendInit);
    const urlPdf = newDateUrl + "_" + newTag + ".pdf";

    const st_lend = new St_LendSchema({
      idAsset: idAsset,
      employeeNumber: employeeNumber,
      name: name,
      lastname: lastname,
      area: area,
      immBoss: immBoss,
      dateLendInit: newDate,
      dateLendFinish: dateLendFinish,
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
        "prestamos/resguardo/"
      );

      pdf.mv(ruta + urlPdf, async (err) => {
        //if (err) throw "ErrorPdf";
      });
    }
    await st_lend.save();
    await incrementCounter(tag, auxTag);
    res.status(200).json({ ok: true, status: "Prestamo con Exito" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR PRESTAMO" });
    }
    if (error.name === "ErrorPdf") {
      return res
        .status(400)
        .json({ ok: false, status: "ERROR AL REGISTRAR PDF" });
    }
    return res.status(500).json({ ok: false, status: "ERROR AL PRESTAR" });
  }
});

router.get("/detalles_prestamo/:id", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]),async (req, res) => {
  try {
    const st_lend = await St_LendSchema.find({
      idAsset: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1)
      .populate({ path: "idAsset" });

    console.log(st_lend);
    return res.status(200).json(st_lend[0]);
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
      "prestamos/resguardo/",
      `${req.params.urlPdf}`
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

router.post("/updatePdf/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status: "Error PDF" });
  }
  const img = req.files.file;
  const ruta = path.join(
    __dirname,
    "..",
    "respaldos",
    "/",
    "prestamos/resguardo/"
  );
  img.mv(ruta + img.name, async (err) => {
    if (err) throw "ErrorPdf";
  });

  return res.status(200).json({ status: "PDF Actualizado" });
});

router.get("/expireLend/", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), async (req, res) => {
  try {
    let currentDate = new Date().getTime(); //obtengo la fecha del sistema
    const dayRestar = 5;
    let day = 1000 * 60 * 60 * 24 * dayRestar;

    let resultDate = currentDate + day;

    let newEquipment_type = {};
    if(!!req.user_type_equipments){
        newEquipment_type = {
        equipment_type: {$in: req.user_type_equipments}
      }
     }

    const st_lendsExp = await St_LendSchema.find({
      $and: [
        {
          dateLendFinish: {
            $gte: currentDate,
          },
        },
        {
          dateLendFinish: {
            $lte: resultDate,
          },
        },
      ],
    }).populate({
      path: "idAsset",
      select: "tag status",
      match: { $and: [{status: { $eq: "PRESTAMO" }}, newEquipment_type]},
    });

    const st_lend_expireds = await St_LendSchema.find({
      dateLendFinish: {
        $lte: currentDate,
      },
    }).populate({
      path: "idAsset",
      select: "tag status",
      match: { $and: [{status: { $eq: "PRESTAMO" }}, newEquipment_type]},
    });

    const st_lendsExpNew = st_lendsExp.filter(
      (st_lendExp) => st_lendExp.idAsset !== null
    );
    const st_lend_expiredNew = st_lend_expireds.filter(
      (st_lend_expired) => st_lend_expired.idAsset !== null
    );

    const st_lends = {
      inTime: st_lendsExpNew,
      expired: st_lend_expiredNew,
    };

    return res.status(200).json(st_lends);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "ERROR ALGO SALIO MAL" });
  }
});

module.exports = router;
