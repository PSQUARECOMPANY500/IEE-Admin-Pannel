const express = require("express");
const router = express.Router();

const { verifyEnggToken } = require("../../Middleware/ServiceEnggAuthMiddleware")

const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");

//-------------------------------------- All Post Requests -------------------------------
router.post("/registerServiceEngg", serviceEnggContoller.RegisterServiceEngg);
router.post("/loginEngg",serviceEnggContoller.loginEngg)


//------------------------------------- All Get Requests -----------------------------------------
router.get("/getAllCallbacks/:ServiceEnggId",verifyEnggToken,serviceEnggContoller.getAssignCallbacks);
router.get("/getAllServices/:ServiceEnggId",verifyEnggToken,serviceEnggContoller.getAssignedServices);
router.get('/getServiceEngg/:EnggId',verifyEnggToken,serviceEnggContoller.getEnggDetail);





module.exports = router;
