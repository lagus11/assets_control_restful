const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const AssetD_MobileSchema = new Schema({
    numberPhone: { type: String},
    imei: { type: String},
    company: { type: String}
});

//paso los datos
module.exports = mongoose.model('AssetD_Mobile', AssetD_MobileSchema);