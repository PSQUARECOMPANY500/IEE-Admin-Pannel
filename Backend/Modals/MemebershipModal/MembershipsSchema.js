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
      type: Date,
      required: true,
    },
    EndDate: {
      type: Date,
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
    callbacksCount: {
      type: Number,
    },
    serviecsCount: {
      type: Number,
    },
    sparePartsSoldCount: {
      type: Number,
    },
    SOScallsCount: {
      type: Number,
    },
    revenue: {
      type: Number,
    },
    isRenewed: {
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

const AssignMemeberships = mongoose.model("Memberships", memebership);

module.exports = AssignMemeberships;
