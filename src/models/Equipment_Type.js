const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const Equipment_TypeSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true}
});

//paso los datos
module.exports = mongoose.model('Equipment_Type', Equipment_TypeSchema);