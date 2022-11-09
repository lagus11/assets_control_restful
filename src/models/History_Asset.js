const mongoose = require("mongoose"); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const History_AssetsSchema = new Schema({
  idAsset: {
    type: Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
    unique: true,
  },
  EmployeeNumber: { type: String, required: true },
  fullNameEmployee: { type: String, required: true },
  dateDelivery: { type: Date, require: true },
});

//paso los datos
module.exports = mongoose.model("History_Assets", History_AssetsSchema);
