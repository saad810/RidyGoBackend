const mongoose = require("mongoose");
const User = require("./UserModel");
const RideOrderModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  RideType: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
    default: 0,
  },
  DestinationLongitude: {
    type: Number,
    required: true,
  },
  DestinationLatitude: {
    type: Number,
    required: true,
  },
  PickupLongitude: {
    type: Number,
    required: true,
  },
  PickupLatitude: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Remarks:{
    type:String,
    required:true,
    default:"No Remarks"
  }
});
module.exports = mongoose.model("RideOrder", RideOrderModel);
// Path: server/models/UserModel.js
