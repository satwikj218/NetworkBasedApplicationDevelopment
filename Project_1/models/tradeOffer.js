const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  name: { type: String, required: [true, "Item Name cannot be empty"] },
  category: { type: String, required: [true, "Item Category cannot be empty"] },
  offeredBy: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String },
});


const offerItem = mongoose.model("offer", offerSchema);

module.exports = offerItem;
