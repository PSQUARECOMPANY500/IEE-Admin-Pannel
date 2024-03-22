const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportInfo = new Schema({
  serviceId: {
    type: String,
    required: true,
  },

  questionsDetails: [
    {
      subCategoriesId: {
        type: String,
      },
      questionId: {
        Type: String,
      },
      questionResponse: {
        isResolved: {
          type: Boolean,
          default: false,
        },
        isSparePartRequest: {
          type: Boolean,
        },
        sparePartDetail: {
          typeId: {
            type: String,
          },
          subTypeId: {
            type: String,
          },
        },
      },
    },
  ],
  subCategoriesphotos: [
    {
      subCategoriesPhotosId: { type: String },
      photo: [],
    },
  ],
  paymentMode: {
    type: String,
    enum: ["online", "cash"],
  },
  // to do  ==>  entring payment Detail while razor pay is approving...
  paymentDetils: {
    type: String,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
});

const ReportInfoModel = mongoose.model("Report", ReportInfo);

module.exports = ReportInfoModel;
