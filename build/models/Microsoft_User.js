"use strict";

var mongoose = require('mongoose'); //obtener la bd para modelar
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos

var Microsoft_UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: Object,
    "default": {
      type: {
        name: 'user_read'
      }
    }
  }
});

//paso los datos
module.exports = mongoose.model('Microsoft_User', Microsoft_UserSchema);