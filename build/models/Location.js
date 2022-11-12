"use strict";

var mongoose = require('mongoose'); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  }
});

//paso los datos
module.exports = mongoose.model('Location', LocationSchema);