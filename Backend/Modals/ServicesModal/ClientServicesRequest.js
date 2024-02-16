const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Services = new Schema(
  {
    JobOrderNumber: {
      type: String,
      required: true,
    },
    RequestId: {
      type: String,
      required: true,
      unique: true,
    },
    RequestDate: {
      type: String,
      required: true,
    },
    RequestTime: {
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
      default: "ImediateVisit",
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

const serviceRequest = mongoose.model("ServicesRequests", Services);

module.exports = serviceRequest;
