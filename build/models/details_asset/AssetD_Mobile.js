"use strict";

var mongoose = require('mongoose'); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var AssetD_MobileSchema = new Schema({
  numberPhone: {
    type: String
  },
  imei: {
    type: String
  },
  company: {
    type: String
  }
});

//paso los datos
module.exports = mongoose.model('AssetD_Mobile', AssetD_MobileSchema);