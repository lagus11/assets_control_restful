const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const AuxTagsSchema = new Schema({
    counter: { type: Number, required: true, default: '0'},
});

//paso los datos
module.exports = mongoose.model('AuxTags', AuxTagsSchema);