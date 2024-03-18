const express = require("express");
const router = express.Router();
// const {verifyToken} = require('../../Middleware/ClientAuthMiddleware')


const adminContoller = require("../../Controllers/AdminController/AdminController");
const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");
const ClientController = require("../../Controllers/ClientController/ClientController");
//----------------------------- All post requests ---------------------------------------------

router.post("/assigncallback", adminContoller.assignCallbacks);
router.post("/assignRequest", adminContoller.AssignServiceRequests);

router.post("/createMembership", adminContoller.createClientMemebership);

router.post("/createServiceAdmin", adminContoller.createServiceAdmin); // crete service admin

router.post("/createServiceAdmin", adminContoller.createServiceAdmin); // crete service admin
router.post(
  "/createFilteringLocations",
  adminContoller.createLocationForFilter
); // crete service admin

//------------------------------ All get requests -------------------------------------------------

router.get("/Allcallbacks", adminContoller.getAllCallbacks);
router.get("/Allservices", adminContoller.getAllRequests);
router.get("/AllClients", adminContoller.getAllClientsData);
router.get("/AllServiceEngg", adminContoller.getAllServiceEnggData);
router.get(
  "/getClientCalbackDetailWithClientDetail/:callbackId",
  adminContoller.getCallbackDetailByCallbackId
);
router.get("/getCheckList", adminContoller.getAllChecklist);

router.get("/getEnggDetailById/:EnggId", adminContoller.getEnggDetail);

router.get(
  "/getAssignCallbackDetail/:callbackId",
  adminContoller.getAssignCallbackByCallbackId
);

router.get(
  "/getRequestDetailByRequestid/:RequestId",
  adminContoller.getRequestDetailByRequestId
);
// router.get(
//   "/getAssignCallbackDetail/:callbackId",
//   adminContoller.getAssignCallbackByCallbackId
// );

router.get(
  "/getAssignRequestDetail/:RequestId",
  adminContoller.getAssignServiceRequestByServiceRequestId
);
router.get("/getBookedDates", adminContoller.getBookedDates);
router.get("/clientDetail/:JobOrderNumber", ClientController.getClientDetail);

router.get("/getAllAssignServices", adminContoller.getAllAssignServiceRequest);

router.get("/getAllReferals", adminContoller.getAllreferals);

router.get("/getAllAssignCallback", adminContoller.getAllAssignCallbacks);

router.get(
  "/getCurrentDateAssignCallback",
  adminContoller.getCurrentDateAssignCallback
);

router.get(
  "/getCurrentDateAssignServiceRequest",
  adminContoller.getCurrentDateAssignServiceRequest
);

router.get("/getAvailbaleEng", adminContoller.getBookedSlotsForParticularEngg);

router.get("/getEnggCrouserData", adminContoller.getEnggCrouserData);
router.get("/getFilteringLocations", adminContoller.getFilteringLocations);

//-------------------------------Handle-CheckList-Routes ------------------------------------------

router.post("/checklist", adminContoller.createCheckList);

//------------------------------------admin Getting all the eng location----------------------------------------
router.get(
  "/getEnggLocationDetail",
  serviceEnggContoller.getEnggLocationDetail
);

router.get("/fetchEnggAttendance", adminContoller.fetchEnggAttendance);

router.put("/approveLeaveByAdmin", adminContoller.approveLeaveByAdmin);

router.post("/filterClient", adminContoller.filterClient);
router.get("/serchingClient", adminContoller.searchClients);
router.get("/clientDetail/:JobOrderNumber", ClientController.getClientDetail);
router.get("/getClientDataForMembership", adminContoller.getClientData);
router.get("/getClientCalls", adminContoller.getClientCalls);
router.get("/getMembershipHistory", adminContoller.getMembershipHistory);
router.get("/getMembershipDetails", adminContoller.getMembershipDetails);
router.get("/getClientId/:JON", adminContoller.getClientDetail);
router.get("/getMembership", adminContoller.getClientMembership);
router.post("/createMembership", adminContoller.createClientMemebership);
router.post("/createCall", adminContoller.createClientCallDetails);
router.post("/createSpearParts", adminContoller.createSpearParts);





router.post("/loginAdmin",adminContoller.loginServiceAdmin);


module.exports = router;
