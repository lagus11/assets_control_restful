"use strict";

var jwt = require("jsonwebtoken");
var jwt_decode = require('jwt-decode');
function validateTokenMicrosoft(req, res, next) {
  var token = req.body.token; //obtengo token del body
  // clave publica del token de azure microsoft "ocupa buscarse en cada cuenta"
  var publicKey = "-----BEGIN CERTIFICATE-----\r\nMIIDYDCCAkigAwIBAgIJAN2X7t+ckntxMA0GCSqGSIb3DQEBCwUAMCkxJzAlBgNVBAMTHkxpdmUgSUQgU1RTIFNpZ25pbmcgUHVibGljIEtleTAeFw0yMTAzMjkyMzM4MzNaFw0yNjAzMjgyMzM4MzNaMCkxJzAlBgNVBAMTHkxpdmUgSUQgU1RTIFNpZ25pbmcgUHVibGljIEtleTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANmu9EsIKiIfFPkoY/1SSRgYXhFZNheMoJjAkbSlAG9YzD+kdY+THOcWqoYM5Vo3JCSNZceK4WtaDS63YPLSQcXZvFfMWaIQjmpyedrgMKHOhRU2N1US2lGUid8wl37icMuCrxRyVALi4S49IVXqvstdApkSdfzD07jUSS3W5UlnF8lmCIpCEYIEFktODPkI0e+e9Zl/i7v3g7PMSVa5zRTFRkZhan9xBQ+ECzY1vSSY9Jv6a507+NVfxPAAOzEGddoqd7uWnjgEKho1cs3R8b1fZWsbWul1mjPEEkyLv2Wr9fmg2BMaffZwj+B8NPzqJubyuTfPAwfFTNJqLkIvGvECAwEAAaOBijCBhzAdBgNVHQ4EFgQU57BsETnF8TctGU87R4N9YxmNWoIwWQYDVR0jBFIwUIAU57BsETnF8TctGU87R4N9YxmNWoKhLaQrMCkxJzAlBgNVBAMTHkxpdmUgSUQgU1RTIFNpZ25pbmcgUHVibGljIEtleYIJAN2X7t+ckntxMAsGA1UdDwQEAwIBxjANBgkqhkiG9w0BAQsFAAOCAQEAcsk+LGlTzSQdnh3mtCBMNCGZCiTYvFcqenwjDf1/c4U+Yi7fxYmAXm7wVLX+GVMxpLPpzMuVOXztGoPMUgWH59CFWhsMvZbIUKsd8xbEKmls1ZIgxRYdagcWTGeBET6XIoF6Ba57BhRCxFPslhIpg27/HnfHtTdGfjRpafNbBYvC/9PL/s2E9U4AklpUn2W19UiJLRFgXGPjYPLW0j1Od0qzHHJ84saclVwvuOrpp75Y+0Du5Z2OrjNF1W4dEWZMJmmOe73ejAnoiWJI25kQpkd4ooNasw3HIZEJZ6cKctmPJLdvx0tJ8bde4DivtWOeFIwcAkokH2jlHmAOipNETw==\r\n-----END CERTIFICATE-----";
  if (token) {
    token = token.split(" ")[1]; //separo el token bearer
    //verifico que el token sea de azure
    jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    }, function (err, usuario) {
      if (err) {
        console.log(err);
        return res.status(404).json({
          status: "TokenMicrosoft is not valid"
        });
      }
      var email = jwt_decode(token).preferred_username; //obtengo correo del payload
      req.email = email; //paso al req el correo para usarlo en busqueda en bd
      next();
    });
  } else {
    res.status(401).json({
      status: "You are not authenticated"
    });
  }
}
module.exports = validateTokenMicrosoft;