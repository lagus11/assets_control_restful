"use strict";

var mongoose = require("mongoose"); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var St_DamagedSchema = new Schema({
  idAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    unique: false
  },
  investReport_url: {
    type: String
  },
  receiPayment_url: {
    type: String
  },
  dateDamaged: {
    type: Date,
    unique: false
  },
  employeeNumber: {
    type: String
  },
  fullNameEmployee: {
    type: String
  },
  ultimateStat: {
    type: String
  }
});
St_DamagedSchema.index({
  idAsset: 1,
  dateDamaged: 1
}, {
  unique: true
});

//paso los datos
module.exports = mongoose.model("Status_Damaged", St_DamagedSchema);