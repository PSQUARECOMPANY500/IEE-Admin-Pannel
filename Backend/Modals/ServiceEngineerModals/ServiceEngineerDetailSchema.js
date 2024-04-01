const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnggBasicDetail = new Schema(
  {
    EnggId: {
      type: String,
      required: true,
      unique: true,
    },
    EnggPassword: {
      type: String,
      required: true,
    },
    EnggName: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    EnggAddress: {
      type: String,
      required: true,
    },
    EnggPhoto: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceEnggBasicInfo = mongoose.model(
  "ServiceEnggBasicDetails",
  EnggBasicDetail
);

module.exports = ServiceEnggBasicInfo;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const EnggBasicDetail = new Schema(
//   {
//     EnggId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     EnggPassword: {
//       type: String,
//       required: true,
//     },
//     EnggName: {
//       type: String,
//       required: true,
//     },
//     EnggLastName: {
//       type: String,
//       required: true,
//     },
//     PhoneNumber: {
//       type: Number,
//       required: true,
//       unique: true,
//     },
//     EnggAddress: {
//       type: String,
//       required: true,
//     },
//     EnggPhoto: {
//       type: String,
//       required: true,
//     },
//     DateOfBirth: {
//       type: String,
//       required: true,
//     },
//     Email: {
//       type: String,
//       unique: true,
//     },
//     PinCode: {
//       type: String,
//       required: true,
//     },
//     City: {
//       type: String,
//       required: true,
//     },
//     District: {
//       type: String,
//       required: true,
//     },
//     State: {
//       type: String,
//       required: true,
//     },
//     AddharCardNo: {
//       type: String,
//       required: true,
//     },
//     DrivingLicenseNo: {
//       type: String,
//       required: true,
//     },
//     PanCardNo: {
//       type: String,
//       required: true,
//     },
//     Qualification: {
//       type: String,
//       required: true,
//     },
//     AdditionalCourse: {
//       type: String,
//       required: true,
//     },
//     AccountHolderName: {
//       type: String,
//       required: true,
//     },
//     BranchName: {
//       type: String,
//       required: true,
//     },
//     AccountNumber: {
//       type: String,
//       required: true,
//     },
//     IFSCcode: {
//       type: String,
//       required: true,
//     },
//     AddharPhoto: {
//       type: String,
//       required: true,
//     },
//     DrivingLicensePhoto: {
//       type: String,
//       required: true,
//     },
//     PancardPhoto: {
//       type: String,
//       required: truew,
//     },
//     QualificationPhoto: {
//       type: String,
//       required: true,
//     },
//     AdditionalCoursePhoto: {
//       type: String,
//       required: true,
//     },
//     DurationOfJob: {
//       type: String,
//     },
//     CompanyName: {
//       type: String,
//     },
//     JobTitle: {
//       type: String,
//     },
//     ManagerName: {
//       type: String,
//     },
//     ManagerNo: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const ServiceEnggBasicInfo = mongoose.model(
//   "ServiceEnggBasicDetails",
//   EnggBasicDetail
// );

// module.exports = ServiceEnggBasicInfo;
