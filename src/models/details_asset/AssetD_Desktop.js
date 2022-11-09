const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const AssetD_DesktopSchema = new Schema({
    so: { type: String},
    procesador: { type: String},
    gb: { type: String}
});

//paso los datos
module.exports = mongoose.model('AssetD_Desktop', AssetD_DesktopSchema);