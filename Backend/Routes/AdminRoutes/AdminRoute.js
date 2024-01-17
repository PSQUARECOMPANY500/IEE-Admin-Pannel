const express = require("express");
const router = express.Router();

const adminContoller = require("../../Controllers/AdminController/AdminController");

//----------------------------- All post requests ---------------------------------------------

router.post("/assigncallback", adminContoller.assignCallbacks);
router.post("/assignRequest", adminContoller.AssignServiceRequests);

//------------------------------ All get requests -------------------------------------------------

router.get("/Allcallbacks", adminContoller.getAllCallbacks);
router.get("/Allservices", adminContoller.getAllRequests);
router.get("/AllClients", adminContoller.getAllClientsData);
router.get("/AllServiceEngg", adminContoller.getAllServiceEnggData);

//-------------------------------Handle-CheckList-Routes ------------------------------------------

router.post('/checklist',adminContoller.createCheckList)

module.exports = router;
