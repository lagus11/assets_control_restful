const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const SupplierSchema = new Schema({
    name: { type: String, required: true},
    address: { type: String, required: true},
    phone_number: { type: Number, required: true},
    email: { type: String, required: true},
    type: { type: String, required: true},
    comment: { type: String}
});

//paso los datos
module.exports = mongoose.model('Supplier', SupplierSchema);