const mongoose = require("mongoose"); //obtener la bd para modelar
const { Schema } = mongoose; //nos permite hacer esquema de los datos

const St_RepairSchema = new Schema({
  idAsset: { type: Schema.Types.ObjectId, ref: "Asset", unique: false  },
  dateRepair: {type: Date, unique: false },
  invoice_url: { type: String },
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
  ultimateStat: {type: String}
});

St_RepairSchema.index({ idAsset: 1, dateRepair: 1 }, { unique: true })

//paso los datos
module.exports = mongoose.model("Status_Repair", St_RepairSchema);
