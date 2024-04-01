const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SparePartsRequestSchema = new Schema({
  EnggId: {
    type: String,
    required: true,
  },
  sparePartId: {
    type: String,
    // required: true,
  },
  quantity: {
    type: String,
  },
  Type: {
    type: String,
    // required: true,
  },
  Description: {
    type: String,
  },
  RequestType: {
    type: String,
    // required: true,
  },
  sparePartName: {
    type: String,
    // required: true,
  },

  SubSparePartName: {
    type: String,
    // required: true,
  },
  Date: {
    type: String,
    required: true,
  },
});

const SpearPartsRequested = mongoose.model(
  "RequestSpareRequest",
  SparePartsRequestSchema
);

module.exports = SpearPartsRequested;
