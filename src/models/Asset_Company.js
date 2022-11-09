const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const Asset_CompanySchema = new Schema({
    name: { type: String, required: true},
    businessName: { type: String, required: true},
    location: { type: String, required: true}
});

//paso los datos
module.exports = mongoose.model('Asset_Company', Asset_CompanySchema);