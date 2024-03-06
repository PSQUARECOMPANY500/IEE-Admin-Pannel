const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportChecklist = new Schema({
  checklistName: { type: String },
  subcategories: [
    {
      subcategoryName: { type: String },
      questions: [
        {
           questionId: {
            type:String,
           },
           Response: {
            type:Boolean,
           }
        }
      ],
    }
  ],
});

const Report = mongoose.model("ReportChecklist", ReportChecklist);

module.exports = Report;
