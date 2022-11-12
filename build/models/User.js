"use strict";

var mongoose = require('mongoose'); //obtener la bd para modelar datos
var Schema = mongoose.Schema; //nos permite hacer esquema de los datos
var bcrypt = require('bcryptjs'); // modulo encrptar contraseña

var saltRounds = 10; //veces repite el algoritmo

var UserSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Object,
    "default": {
      type: {
        name: 'admin'
      }
    }
  }
});
UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    var document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});
UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

//paso los datos
module.exports = mongoose.model('User', UserSchema);