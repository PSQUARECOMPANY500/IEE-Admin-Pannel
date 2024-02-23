const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnggLocationSchema = new Schema(
    {
        ServiceEnggId: {
            type: String,
            require: true,
        },
        JobOrderNumber: {
            type: String,
            require: true,
        },
        startingLocation: {
            type: { type: String },
            coordinates: []
        },
        endingLocation: {
            type: { type: String },
            coordinates: []
        },
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        createdDate: {
            type: String,
            default: () => {
                const now = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];
                return now; // Extract date part
            }
        },
        createdTime: {
            type: String,
            default: () => {
                const now = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });
                const [time, indicator] = now.split(' ');
                const [hours] = time.split(':');
                const formattedTime = `${hours} ${indicator}`;
                return formattedTime; // Extract time part
            }
        },
    }
);

const EnggLocationModel = mongoose.model("EnggLocationModel", EnggLocationSchema);
module.exports = EnggLocationModel;
