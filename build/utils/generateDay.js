"use strict";

var generateDay = function generateDay() {
  var date = new Date();
  var day = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  return day;
};
module.exports = {
  generateDay: generateDay
};