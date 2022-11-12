"use strict";

var mongoose = require("mongoose"); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var St_AssignationSchema = new Schema({
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
  urlPdf: {
    type: String
  },
  idAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    unique: false
  },
  dateAssignation: {
    type: Date,
    unique: false,
    required: true
  }
});
St_AssignationSchema.index({
  idAsset: 1,
  dateAssignation: 1
}, {
  unique: true
});

//paso los datos
module.exports = mongoose.model("Status_Assignation", St_AssignationSchema);