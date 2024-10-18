const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationModel = new Schema({
    Date: {
        type: String,
        unique: true,
    },
    Owner: [String],
    Data: {
        type: String,
        unique:true
    }
})

const Notification = mongoose.model('NotificationModel', NotificationModel);

module.exports = Notification;