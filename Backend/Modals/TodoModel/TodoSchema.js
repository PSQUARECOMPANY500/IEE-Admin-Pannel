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
   status:{
    type: String
   },
   priority:{
    type: String
   }
})

module.exports= mongoose.model('TodoTask', todoSchema)
