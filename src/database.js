const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
dotenv.config()
//URL de la base de datos
const URI = process.env.CONNECTION_STRING;


const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};
//url mongo de manera local
mongoose.connect(URI, options)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;
