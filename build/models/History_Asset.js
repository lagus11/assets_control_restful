"use strict";

var mongoose = require("mongoose"); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var History_AssetsSchema = new Schema({
  idAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
    unique: true
  },
  EmployeeNumber: {
    type: String,
    required: true
  },
  fullNameEmployee: {
    type: String,
    required: true
  },
  dateDelivery: {
    type: Date,
    require: true
  }
});

//paso los datos
module.exports = mongoose.model("History_Assets", History_AssetsSchema);