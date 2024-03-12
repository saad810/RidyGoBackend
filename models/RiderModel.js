const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },

  carName: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  carRegNo: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Rider = mongoose.model("Rider", riderSchema);
module.exports = Rider;
