const express = require("express");
const router = express.Router();

const adminContoller = require("../../Controllers/AdminController/AdminController");
const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");

//----------------------------- All post requests ---------------------------------------------

router.post("/assigncallback", adminContoller.assignCallbacks);
router.post("/assignRequest", adminContoller.AssignServiceRequests);

router.post("/createMembership", adminContoller.createClientMemebership);

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
//-------------------------------Handle-CheckList-Routes ------------------------------------------

router.post("/checklist", adminContoller.createCheckList);

module.exports = router;
