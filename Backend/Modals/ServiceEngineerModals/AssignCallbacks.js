const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AssignService = new Schema(
  {
    ServiceEnggId: {
      type: String,
      required: true,
    },
    JobOrderNumber: {
      type: String,
      required: true,
    },
    callbackId: {
      type: String,
      required: true
    },
    AllotAChecklist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checklist",
      required: true,
    },
    Slot: {
      type: [String],
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      default:''
    },
    ServiceProcess: {
      type: String,
      enum: ["onGoing", "completed", "InCompleted","cancelled","dead"],
      default: "InCompleted",
    },
    cancelDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AssignEnggService = mongoose.model("AssignCallbacks", AssignService);

module.exports = AssignEnggService;
