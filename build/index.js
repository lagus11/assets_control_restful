"use strict";

// archivo de express "node.js" Permite crear e inializar el servidor
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var _require = require("./database"),
  mongoose = _require.mongoose;
var app = express(); //ejecuta express obtengo objeto
var cookieParser = require("cookie-parser");
var fileUpload = require("express-fileupload");
var cors = require("cors");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy, crucial
}

// Middlewares
app.use(morgan('dev')); //ver las peticiones servidor
app.use(express.json()); //llega un dato al servidor, comprueba si es json, si lo es, accedemos codigo en servidor
app.use(fileUpload()); //para poder guardar pdf
app.use(cookieParser()); //para leer las cookies
app.use(cors({
  origin: true,
  credentials: true
})); // enable origin cors

//Routes
app.use('/', require("./routes/userRouter.js")); //ruta validar usuario 
app.use('/usuario_autorizado', require("./routes/microsoft_user.js")); //ruta validar usuario microsoft
app.use('/equipos', require("./routes/assets.js")); //ruta de los equipos
app.use('/empresas_activo', require("./routes/asset_companies.js")); //ruta de empresa activo
app.use('/tipo_equipo', require("./routes/equipments_types")); //ruta de tipos de equipo
app.use('/proveedores', require("./routes/suppliers.js")); //ruta de proovedores
app.use('/dashboard', require("./routes/Dashboard.js")); //ruta dashboard
app.use('/ubicaciones', require("./routes/locations.js")); //ruta ubicacion

app.use('/asset_detailsMobile', require("./routes/assetD_mobiles"));
app.use('/asset_detailsDesktop', require("./routes/assetD_desktops"));
app.use('/status_assignation', require("./routes/st_assignations.js"));
app.use('/status_lend', require("./routes/st_lends"));
app.use('/status_repair', require("./routes/st_repairs"));
app.use('/status_damaged', require("./routes/st_damageds"));
app.use('/status_lost', require("./routes/st_losts"));
app.use('/status_stolen', require("./routes/st_stolens"));
app.use('/historial', require("./routes/history_assets"));
//refrescar el token

//static files
app.use(express["static"](path.join(__dirname, '..', '..', 'cliente', 'src', 'public')));

// Inicia el servidor
// servidor escucha puerto 3000, realice accion
/*app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`, this.address().port, app.settings.env);
});*/

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});