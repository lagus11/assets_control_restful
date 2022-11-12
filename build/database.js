"use strict";

var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();
//URL de la base de datos
var URI = process.env.CONNECTION_STRING;
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
//url mongo de manera local
mongoose.connect(URI, options).then(function (db) {
  return console.log('DB is connected');
})["catch"](function (err) {
  return console.log(err);
});
module.exports = mongoose;