const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const LocationSchema = new Schema({
    name: { type: String, required: true, unique: true},
    type: { type: String, required: true}
});

//paso los datos
module.exports = mongoose.model('Location', LocationSchema);