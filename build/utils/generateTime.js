"use strict";

var generateTime = function generateTime(day) {
  var date = new Date();
  var newDay = day.split("-");
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var newDate = new Date(newDay[0], newDay[1], newDay[2], hour, minute, second);
  var newDateUrl = day + "T" + hour + "-" + minute + "-" + second;
  return {
    newDate: newDate,
    newDateUrl: newDateUrl
  };
};
module.exports = {
  generateTime: generateTime
};