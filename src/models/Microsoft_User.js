const mongoose = require('mongoose'); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const Microsoft_UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    role: { type: Object, default:{type: {name:'user_read'}}}
});

//paso los datos
module.exports = mongoose.model('Microsoft_User', Microsoft_UserSchema);