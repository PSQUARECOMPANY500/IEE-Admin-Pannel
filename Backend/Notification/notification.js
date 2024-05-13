const message = require("../Modals/ChatModel/MessageModal");
const Referal = require("../Modals/ClientDetailModals/ClientReferalSchema");
const Notification = require("../Modals/NotificationModal/notificationModal.js");
const engineerRating = require("../Modals/Rating/Rating");
const ReportInfoModel = require("../Modals/ReportModal/ReportModal.js");
const AssignEnggService = require("../Modals/ServiceEngineerModals/AssignCallbacks");
const AssignSecheduleRequest = require("../Modals/ServiceEngineerModals/AssignServiceRequest");
const EnggAttendanceServiceRecord = require("../Modals/ServiceEngineerModals/Attendance");
const EnggLeaveServiceRecord = require("../Modals/ServiceEngineerModals/EnggLeaveSchema");
const serviceRequest = require("../Modals/ServicesModal/ClientServicesRequest");
const CallbackRequests = require("../Modals/ServicesModal/ClinetCallback.js");
const SpearPartsRequested = require("../Modals/SpearParts/SparePartRequestModel");


module.exports.watchNotifications = async (io) => {
    {/* Engg Notification */ }
    EnggLeaveServiceRecord.watch().on('change', data => {
        console.log("EnggLeaveServiceRecord")
        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    CallbackRequests.watch().on('change', data => {
        console.log("CallbackRequests")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    EnggAttendanceServiceRecord.watch().on('change', data => {
        console.log("EnggAttendanceServiceRecord")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    ReportInfoModel.watch().on('change', data => {
        console.log("Report")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    AssignEnggService.watch().on('change', data => {
        console.log("AssignEnggService")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Engg", "Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    AssignSecheduleRequest.watch().on('change', data => {
        console.log("AssignSecheduleRequest")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Engg", "Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    SpearPartsRequested.watch().on('change', data => {
        console.log("SpearPartsRequested")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    serviceRequest.watch().on('change', data => {
        console.log("serviceRequest")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    message.watch().on('change', data => {
        console.log("message")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });

    {/* client Notification */ }
    Referal.watch().on('change', data => {
        console.log("Referal")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    engineerRating.watch().on('change', data => {
        console.log("engineerRating")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Admin", "Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
};


const saveNotification = async (owner, data, io) => {
    try {
        if (owner && data) {
            await Notification.create({
                Owner: owner,
                Data: data
            })
            //io.emit('notification', response)
        }
    }
    catch (err) {
        console.log("error in notification", err)
    }
}