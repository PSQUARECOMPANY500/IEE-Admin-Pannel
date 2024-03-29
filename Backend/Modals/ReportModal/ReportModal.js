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
        type: String,
      },
      questionResponse: {
        isResolved: {
          type: Boolean,
          default: false,
        },
        isSparePartRequest: {
          type: Boolean,
          default:false
        },
        SparePartDescription: {
          type: String,
          default:""
        },
        Reason: {
          type: String,
          default:""
        },
        sparePartDetail: {
          sparePartsType: {
            type: String,
            default:""
          },
          subsparePartspartid: {
            type: String,
            default:""
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
    default:"cash"
  },
  // to do  ==>  entring payment Detail while razor pay is approving...
  paymentDetils: {
    type: String,
    default:""
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
});

const ReportInfoModel = mongoose.model("Report", ReportInfo);

module.exports = ReportInfoModel;
