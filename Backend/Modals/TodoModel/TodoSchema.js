/**
 * /---------------------------Rahul Kumar--------------------------------------------------------
 */
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   taskName:{
    type: String
   } ,
   memberId:{
    type: String
   },
   taskDate:{
    type: String
   },
   taskTime:{
      type: String
   },
   status:{
    type: String
   },
   priority:{
    type: String
   },
   adminId:{
      type: String
   }
})

module.exports= mongoose.model('TodoTask', todoSchema)
