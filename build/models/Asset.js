"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var mongoose = require("mongoose"); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos
//const uniqueValidator = require('mongoose-unique-validator'); <- se ocupa borrar toda la bd

var AssetSchema = new Schema({
  tag: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serial_number: {
    type: String,
    required: true
  },
  asset_code: {
    type: String
  },
  asset_type: {
    type: String,
    required: true
  },
  equipment_type: {
    type: Schema.Types.ObjectId,
    ref: "Equipment_Type"
  },
  status: _defineProperty({
    type: String,
    index: true,
    "enum": ["STOCK", "ASIGNADO", "PRESTAMO", "REPARACIÓN", "EXTRAVIADO", "DAÑADO", "ROBADO", "BAJA"],
    "default": "STOCK",
    required: "Por favor especifique solo un estatus"
  }, "default", 'STOCK'),
  invoice: {
    type: String
  },
  //supplier: { type: String, required: true},
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "Supplier"
  },
  asset_company: {
    type: Schema.Types.ObjectId,
    ref: "Asset_Company"
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location"
  },
  datePurchase: {
    type: Date
  },
  dateRegistration: {
    type: Date,
    required: true
  },
  dateDrop: {
    type: Date
  },
  observation: {
    type: String
  },
  mobileDetail: {
    type: Schema.Types.ObjectId,
    ref: "AssetD_Mobile"
  },
  desktopDetail: {
    type: Schema.Types.ObjectId,
    ref: "AssetD_Desktop"
  }
});

//AssetSchema.plugin(uniqueValidator);
//paso los datos
module.exports = mongoose.model("Asset", AssetSchema);