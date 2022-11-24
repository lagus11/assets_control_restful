const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const Asset_CompanySchema = new Schema({
    name: { type: String, required: true},
    businessName: { type: String},
    location: { type: String}
});

//paso los datos
module.exports = mongoose.model('Asset_Company', Asset_CompanySchema);