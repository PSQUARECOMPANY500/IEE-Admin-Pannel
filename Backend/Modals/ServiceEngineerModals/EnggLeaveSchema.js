const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnggLeaveRecord = new Schema({
    IsApproved: {
        type: String,
        enum: [false, "Approved", "Rejected"],
        default: false,
    },
    Date: {
        type: String,
        default: () => {
            const now = new Date().toLocaleDateString('en-GB');
            return now;
        }
    },
    ServiceEnggId: {
        type: String,
        required: true,
    },
    TotalLeave: {
        type: Number,
        default: "12"
    },
    UsedLeave: { //this is increamented by 1 on approval of the admin
        type: Number,
        default: "0"
    },
    TypeOfLeave: {
        type: String,
        required: true,
    },
    Duration: {
        From: {
            type: String,
            required: true
        },
        To: {
            type: String,
            required: true
        }
    },
    Leave_Reason: {
        type: String,
    },
    Document: {
        type: String,
    }
});
const EnggLeaveServiceRecord = mongoose.model("EnggLeaveRecord", EnggLeaveRecord);
module.exports = EnggLeaveServiceRecord;