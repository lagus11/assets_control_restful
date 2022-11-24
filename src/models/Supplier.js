const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const SupplierSchema = new Schema({
    name: { type: String, required: true},
    address: { type: String},
    phone_number: { type: Number},
    email: { type: String},
    type: { type: String},
    comment: { type: String}
});

//paso los datos
module.exports = mongoose.model('Supplier', SupplierSchema);