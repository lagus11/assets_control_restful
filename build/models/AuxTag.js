"use strict";

var mongoose = require('mongoose'); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var AuxTagsSchema = new Schema({
  counter: {
    type: Number,
    required: true,
    "default": '0'
  }
});

//paso los datos
module.exports = mongoose.model('AuxTags', AuxTagsSchema);