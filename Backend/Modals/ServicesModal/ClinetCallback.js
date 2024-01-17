const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Services = new Schema(
  {
    JobOrderNumber: {
      type: String,
      required: true,
    },
    callbackId: {
      type: String,
      required: true,
      unique: true,
    },
    callbackDate: {
      type: String,
      required: true,
    },
    callbackTime: {
      type: String,
      required: true,
    },
    TypeOfIssue: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      default: "Callback",
    },
    isAssigned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const clientRequestImidiateVisit = mongoose.model("CallbackRequests", Services);

module.exports = clientRequestImidiateVisit;
