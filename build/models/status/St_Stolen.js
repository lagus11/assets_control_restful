"use strict";

var mongoose = require("mongoose"); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var St_StolenSchema = new Schema({
  idAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    unique: true,
    required: true
  },
  dateStolen: {
    type: Date
  },
  investReport_url: {
    type: String
  },
  actPublMinistry_url: {
    type: String
  },
  employeeNumber: {
    type: String
  },
  fullNameEmployee: {
    type: String
  }
});

//St_StolenSchema.index({ idAsset: 1, dateStolen: 1 }, { unique: true })

//paso los datos
module.exports = mongoose.model("Status_Stolen", St_StolenSchema);