const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientRegister = new Schema(
  {
    JobOrderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    DateOfHandover: {
      type: String,
    },
    ProfileImage: {
      type: String,
    },
    ModelType: {
      type: String,
    },
    MembershipType: {
      type: String,
      enum: ["warrenty", "gold", "platinum", "silver"],
      default: "silver",
    },
    CallbackCount: {
      type: String,
    },
    Razorpay_customer_ID: {
      type: String,
    },
    MembershipDiscount: {
      type: String
    },
    firebaseToken: {
      type: String
    },
    emailAddress: {
      type: String
    }
  },
  {
    timestamp: true,
  }
);

clientRegister.indexes({ JobOrderNumber: 1, name: 2, PhoneNumber: 3, Address: 4 });

clientRegister.pre("save", function (next) {
  if (!this.Password) {
    // this.EnggId = Math.floor(100000 + Math.random() * 900000).toString();
    this.Password = Math.floor(100000 + Math.random() * 900000).toString();
  }
  next();
});
const clientRegistration = mongoose.model(
  "RegisterClientJONDetails",
  clientRegister
);

module.exports = clientRegistration;
