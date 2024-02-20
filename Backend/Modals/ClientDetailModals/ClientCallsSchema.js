const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientCalls = new Schema({
  jobOrderNumber: {
    type: String,
    required: true,
  },
  callType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountOffered: {
    type: String,
    required: true,
  },
  callDate: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const clientCalls = mongoose.model("ClientCall", ClientCalls);
module.exports = clientCalls;
