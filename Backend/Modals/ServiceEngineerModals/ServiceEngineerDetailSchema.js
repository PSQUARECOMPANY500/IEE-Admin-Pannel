const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnggBasicDetail = new Schema(
  {
    EnggId: {
      type: String,
      required: true,
      unique: true,
    },
    EnggPassword: {
      type: String,
      required: true,
    },
    EnggName: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    EnggAddress: {
      type: String,
      required: true,
    },
    EnggPhoto: {
      type: String,
      unique: true,
    },
    AverageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceEnggBasicInfo = mongoose.model(
  "ServiceEnggBasicDetails",
  EnggBasicDetail
);

module.exports = ServiceEnggBasicInfo;
