const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
  otp: {
    type: Number,
    required: true,
  },
  ServiceEnggId: {
    type: String,
    required: true,
  },
  JobOrderNumber: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  expiresAt: {
    type: Number,
  },
});

OtpSchema.index({ email: 1, createdAt: 1 });

const OtpDetails = mongoose.model("OtpDetails", OtpSchema);
module.exports = OtpDetails;
