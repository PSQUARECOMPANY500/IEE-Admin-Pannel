const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientRegisterWithNumber = new Schema(
  {
    PhoneNumber: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// Generate a random 6-digit number as EnggId
clientRegisterWithNumber.pre("save", function (next) {
  if (!this.Password) {
    // this.EnggId = Math.floor(100000 + Math.random() * 900000).toString();
    this.Password = Math.floor(100000 + Math.random() * 900000).toString();

  }
  next();
});


const RegisterWithNumber = mongoose.model(
  "RegisterWithNumbers",
  clientRegisterWithNumber
);

module.exports = RegisterWithNumber;

