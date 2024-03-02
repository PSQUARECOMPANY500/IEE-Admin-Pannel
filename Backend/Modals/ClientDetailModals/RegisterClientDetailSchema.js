const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientRegister = new Schema(
  {
    JobOrderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
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
    ProfileImage: {
      type: String,
      required: true,
    },
    ModelType: {
      type: String,
      required: true,
    },
    MembershipType: {
      type: String,
      enum: ["warrenty", "gold", "platinum", "silver"],
    },
    CallbackCount: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const clientRegistration = mongoose.model(
  "RegisterClientJONDetails",
  clientRegister
);

module.exports = clientRegistration;
