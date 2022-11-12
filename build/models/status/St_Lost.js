"use strict";

var mongoose = require("mongoose"); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var St_LostSchema = new Schema({
  idAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    unique: true,
    required: true
  },
  dateLost: {
    type: Date /*, unique: false*/
  },
  investReport_url: {
    type: String
  },
  receiPayment_url: {
    type: String
  },
  employeeNumber: {
    type: String
  },
  fullNameEmployee: {
    type: String
  }
});

//St_LostSchema.index({ idAsset: 1, dateLost: 1 }, { unique: true });

//paso los datos
module.exports = mongoose.model("Status_Lost", St_LostSchema);