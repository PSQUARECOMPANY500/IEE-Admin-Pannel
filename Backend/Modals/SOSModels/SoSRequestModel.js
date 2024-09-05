const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid'); // Import uuid library
const Schema = mongoose.Schema;


const SoSRequest = new Schema(
    {
        jon: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        RequestId: {
            type: String,
            default: uuidv4,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        date: {
            type: String
        },
        time: {
            type: String
        },
        address: {
            type: String
        },
        membership: {
            type: String
        },
        SoSCallCount: {
            type: Number
        },
        status: {
            type: String,
            default: null
        },
        isDead: {
            type: Boolean,
            default: false
        },
        assignEngineerDetails: {
            EnggId: {
                type: String,
                default: ""
            },
            EnggName: {
                type: String,
                default: ""
            }
        }
    },
    {
        timestamps: true,
    }
);

const SoSRequests = mongoose.model("SoSRequests", SoSRequest);

module.exports = SoSRequests;
