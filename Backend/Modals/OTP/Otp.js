const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
    otp: {
        type: String,
        required: true
    },
    ServiceEnggId: {
        type: String,
        required: true,
    },
    JobOrderNumber: {
        type: String,
        required: true,
    }
    // createdAt: {
        // type: Date,
        // default: Date.now,
        // expires: 300, // OTP expires in 5 minutes (300 seconds)
    //   },
});

OtpSchema.index({ email: 1, createdAt: 1 });


const OtpDetails = mongoose.model("OtpDetails", OtpSchema);
module.exports = OtpDetails;
