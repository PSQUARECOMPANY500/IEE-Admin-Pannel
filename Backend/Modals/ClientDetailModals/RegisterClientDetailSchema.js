const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientRegister = new Schema(
  {
    JobOrderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    DateOfHandover: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const clientRegistration = mongoose.model(
  "RegisterClientDetails",
  clientRegister
);

module.exports = clientRegistration;
