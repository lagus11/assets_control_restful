"use strict";

var jwt = require("jsonwebtoken");
var generateToken = function generateToken(user) {
  try {
    //genero el token con la uid en payload
    var token = jwt.sign({
      user: user
    }, process.env.secretToken, {
      expiresIn: "10h" // 60 * 30 // 60s por 30 = 30 min
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};
var generateRefreshToken = function generateRefreshToken(user, res) {
  var expiresIn = 60 * 60; //1h
  try {
    var refreshToken = jwt.sign({
      user: user
    }, process.env.secretRefreshToken, {
      expiresIn: expiresIn
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + expiresIn * 1000)
    });
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  generateToken: generateToken,
  generateRefreshToken: generateRefreshToken
};