const message = require("../Modals/ChatModel/MessageModal");
const Referal = require("../Modals/ClientDetailModals/ClientReferalSchema");
const engineerRating = require("../Modals/Rating/Rating");
const Report = require("../Modals/Report/ReportSchema");
const AssignEnggService = require("../Modals/ServiceEngineerModals/AssignCallbacks");
const AssignSecheduleRequest = require("../Modals/ServiceEngineerModals/AssignServiceRequest");
const EnggAttendanceServiceRecord = require("../Modals/ServiceEngineerModals/Attendance");
const EnggLeaveServiceRecord = require("../Modals/ServiceEngineerModals/EnggLeaveSchema");
const serviceRequest = require("../Modals/ServicesModal/ClientServicesRequest");
const CallbackRequests = require("../Modals/ServicesModal/ClinetCallback.js");
const SpearPartsRequested = require("../Modals/SpearParts/SparePartRequestModel");

module.exports.watchNotifications = async (io) => {
  {
    /* Engg Notification */
  }
  EnggLeaveServiceRecord.watch().on("change", (data) => console.log(data));
  CallbackRequests.watch().on("change", (data) => console.log(JSON.stringify({time:data.wallTime,data:data.fullDocument})));
  EnggAttendanceServiceRecord.watch().on("change", (data) => console.log(data));
  Report.watch().on("change", (data) => console.log(data));
  AssignEnggService.watch().on("change", (data) => console.log(data));
  AssignSecheduleRequest.watch().on("change", (data) => console.log(data));
  SpearPartsRequested.watch().on("change", (data) => console.log(data));
  serviceRequest.watch().on("change", (data) => console.log(data));
  message.watch().on("change", (data) => console.log(data));

  {
    /* client Notification */
  }
  Referal.watch().on("change", (data) => console.log(data));
  engineerRating.watch().on("change", (data) => console.log(data));
};
