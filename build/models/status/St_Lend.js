"use strict";

var mongoose = require("mongoose"); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var St_LendSchema = new Schema({
  employeeNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  immBoss: {
    type: String
  },
  dateLendInit: {
    type: Date,
    unique: false,
    required: true
  },
  dateLendFinish: {
    type: Date,
    required: true
  },
  urlPdf: {
    type: String
  },
  idAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    unique: false
  }
});
St_LendSchema.index({
  idAsset: 1,
  dateLendInit: 1
}, {
  unique: true
});

//paso los datos
module.exports = mongoose.model("Status_Lend", St_LendSchema);