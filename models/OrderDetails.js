const mongoose = require("mongoose");
const User = require("./UserModel");
const RideOrder = require("./RiderOrder");
const Rider = require("./RiderModel");
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider",
    required: true,
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RideOrder",
    required: true,
  },
  status:{
    type:String,
    required:true,
    default:"pending"

  }
});

const OrderDetails = mongoose.model("Order", OrderSchema);

module.exports = OrderDetails;
