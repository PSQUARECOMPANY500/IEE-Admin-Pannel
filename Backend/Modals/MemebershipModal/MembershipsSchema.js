const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memebership = new Schema(
  {
    JobOrderNumber: {
      type: String,
      required: true,
    },
    MemebershipType: {
      type: String,
      enum: ["warrenty", "gold", "platinum", "silver"],
      required: true,
    },
    StartDate: {
      type: String,
      required: true,
    },
    Duration: {
      type: String,
      required: true,
    },
    Discount: {
      type: String,
      required: true,
    },
    PricePaid: {
      type: String,
      required: true,
    },
    isRenewed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isExpired: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDisable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AssignMemeberships = mongoose.model("Memeberships", memebership);

module.exports = AssignMemeberships;
