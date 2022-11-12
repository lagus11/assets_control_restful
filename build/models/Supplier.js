"use strict";

var mongoose = require('mongoose'); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var SupplierSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  comment: {
    type: String
  }
});

//paso los datos
module.exports = mongoose.model('Supplier', SupplierSchema);