"use strict";

var mongoose = require('mongoose'); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var AssetD_DesktopSchema = new Schema({
  so: {
    type: String
  },
  procesador: {
    type: String
  },
  gb: {
    type: String
  }
});

//paso los datos
module.exports = mongoose.model('AssetD_Desktop', AssetD_DesktopSchema);