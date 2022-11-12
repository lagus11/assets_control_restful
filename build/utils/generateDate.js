"use strict";

var generateDate = function generateDate() {
  var date = new Date();
  var day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  var hour = date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
  var newDate = day + "T" + hour;
  return newDate;
};
module.exports = {
  generateDate: generateDate
};