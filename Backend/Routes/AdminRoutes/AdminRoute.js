const express = require("express");
const router = express.Router();

const adminContoller = require("../../Controllers/AdminController/AdminController");
const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");
const ClientController = require("../../Controllers/ClientController/ClientController")
//----------------------------- All post requests ---------------------------------------------

router.post("/assigncallback", adminContoller.assignCallbacks);
router.post("/assignRequest", adminContoller.AssignServiceRequests);

router.post("/createMembership", adminContoller.createClientMemebership);

router.post('/createServiceAdmin', adminContoller.createServiceAdmin )  // crete service admin

//------------------------------ All get requests -------------------------------------------------
router.get("/getMembership", adminContoller.getClientMemebership);

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

router.get("/getAssignCallbackDetail/:callbackId", adminContoller.getAssignCallbackByCallbackId)

router.get('/getRequestDetailByRequestid/:RequestId',adminContoller.getRequestDetailByRequestId)
router.get(
  "/getAssignCallbackDetail/:callbackId",
  adminContoller.getAssignCallbackByCallbackId
);

router.get('/getAssignRequestDetail/:RequestId', adminContoller.getAssignServiceRequestByServiceRequestId)
router.get("/getBookedDates", adminContoller.getBookedDates)
router.get("/clientDetail/:JobOrderNumber",ClientController.getClientDetail);

router.get('/getAllAssignServices', adminContoller.getAllAssignServiceRequest);

router.get('/getAllReferals',adminContoller.getAllreferals)

router.get('/getAllAssignCallback', adminContoller.getAllAssignCallbacks);

router.get('/getCurrentDateAssignCallback', adminContoller.getCurrentDateAssignCallback);

router.get('/getCurrentDateAssignServiceRequest', adminContoller.getCurrentDateAssignServiceRequest);


router.get('/getAvailbaleEng', adminContoller.getBookedSlotsForParticularEngg);

router.get('/getEnggCrouserData', adminContoller.getEnggCrouserData);

//-------------------------------Handle-CheckList-Routes ------------------------------------------

router.post("/checklist", adminContoller.createCheckList);

//------------------------------------admin Getting all the eng location----------------------------------------
router.get("/getEnggLocationDetail",serviceEnggContoller.getEnggLocationDetail) 

router.get("/fetchEnggAttendance",adminContoller.fetchEnggAttendance)

router.put("/approveLeaveByAdmin",adminContoller.approveLeaveByAdmin)

module.exports = router;
