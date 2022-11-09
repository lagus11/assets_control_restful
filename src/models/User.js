const mongoose = require('mongoose'); //obtener la bd para modelar datos
const { Schema } = mongoose; //nos permite hacer esquema de los datos
const bcrypt = require('bcryptjs');// modulo encrptar contraseña

const saltRounds = 10; //veces repite el algoritmo

const UserSchema = new Schema({
    user: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    password: {type: String, required: true},
    role: { type: Object, default:{type: {name:'admin'}}}
});

UserSchema.pre('save', function(next){
    if ( this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword ) => {
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, same) => {
        if(err) {
            callback(err);
        }else {
            callback(err, same);
        }
    });
}

//paso los datos
module.exports = mongoose.model('User', UserSchema);