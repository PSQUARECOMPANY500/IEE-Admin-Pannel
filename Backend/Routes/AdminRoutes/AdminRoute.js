const express = require("express");
const router = express.Router();

const adminContoller = require("../../Controllers/AdminController/AdminController");
const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");

//----------------------------- All post requests ---------------------------------------------

router.post("/assigncallback", adminContoller.assignCallbacks);
router.post("/assignRequest", adminContoller.AssignServiceRequests);

//------------------------------ All get requests -------------------------------------------------

router.get("/Allcallbacks", adminContoller.getAllCallbacks);
router.get("/Allservices", adminContoller.getAllRequests);
router.get("/AllClients", adminContoller.getAllClientsData);
router.get("/AllServiceEngg", adminContoller.getAllServiceEnggData);
router.get("/getClientCalbackDetailWithClientDetail/:callbackId", adminContoller.getCallbackDetailByCallbackId);
router.get("/getCheckList", adminContoller.getAllChecklist)

router.get("/getEnggDetailById/:EnggId",adminContoller.getEnggDetail )
//-------------------------------Handle-CheckList-Routes ------------------------------------------

router.post('/checklist',adminContoller.createCheckList)

module.exports = router;
