const message = require("../Modals/ChatModel/MessageModal");
const Referal = require("../Modals/ClientDetailModals/ClientReferalSchema");
const engineerRating = require("../Modals/Rating/Rating");
const Report = require("../Modals/Report/ReportSchema");
const AssignEnggService = require("../Modals/ServiceEngineerModals/AssignCallbacks");
const AssignSecheduleRequest = require("../Modals/ServiceEngineerModals/AssignServiceRequest");
const EnggAttendanceServiceRecord = require("../Modals/ServiceEngineerModals/Attendance");
const EnggLeaveServiceRecord = require("../Modals/ServiceEngineerModals/EnggLeaveSchema");
const serviceRequest = require("../Modals/ServicesModal/ClientServicesRequest");
const clientRequestImidiateVisit = require("../Modals/ServicesModal/ClinetCallback.js");
const CallbackRequests = require("../Modals/ServicesModal/ClinetCallback.js");
const SpearPartsRequested = require("../Modals/SpearParts/SparePartRequestModel");

module.exports.watchNotifications = async () => {
    {/* Engg Notification */}
    EnggLeaveServiceRecord.watch().on('change', data => console.log(data.fullDocument));
    CallbackRequests.watch().on('change', data => console.log(data.fullDocument));
    EnggAttendanceServiceRecord.watch().on('change', data => console.log(data.fullDocument));
    Report.watch().on('change', data => console.log(data.fullDocument));
    AssignEnggService.watch().on('change', data => console.log(data.fullDocument));
    AssignSecheduleRequest.watch().on('change', data => console.log(data.fullDocument));
    SpearPartsRequested.watch().on('change', data => console.log(data.fullDocument));
    serviceRequest.watch().on('change', data => console.log(data.fullDocument));
    clientRequestImidiateVisit.watch().on('change', data => console.log(data.fullDocument));
    message.watch().on('change', data => console.log(data.fullDocument));

    {/* client Notification */}
    Referal.watch().on('change', data => console.log(data));
    engineerRating.watch().on('change', data => console.log(data));
};