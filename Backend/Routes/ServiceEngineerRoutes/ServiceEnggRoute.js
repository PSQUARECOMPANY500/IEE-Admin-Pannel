const express = require("express");
const router = express.Router();
const multer = require('multer')
const EnggAttendanceServiceRecord = require('../../Modals/ServiceEngineerModals/Attendance')
const { verifyEnggToken } = require("../../Middleware/ServiceEnggAuthMiddleware")

const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");

//-------------------------------------- All Post Requests -------------------------------
router.post("/registerServiceEngg", serviceEnggContoller.RegisterServiceEngg);
router.post("/loginEngg", serviceEnggContoller.loginEngg)

//location service
router.post("/createEnggLocation", serviceEnggContoller.createEnggLocation)
router.post("/createEnggLocationOnAttendance", serviceEnggContoller.CreateEnggLocationOnAttendance)

//------------------------------------- All Get Requests -----------------------------------------
router.get("/getAllCallbacks/:ServiceEnggId", verifyEnggToken, serviceEnggContoller.getAssignCallbacks);
router.get("/getAllServices/:ServiceEnggId", verifyEnggToken, serviceEnggContoller.getAssignedServices);
router.get('/getServiceEngg/:EnggId', verifyEnggToken, serviceEnggContoller.getEnggDetail);
router.get('/getEngScheduleData', verifyEnggToken, serviceEnggContoller.getEngScheduleData);


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uplodes');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}.jpeg`);
  },
});

const uploadImg = multer({ storage:storage}).array("photos",2);

router.get('/getTime', serviceEnggContoller.EnggTime);
router.post('/enggCheckIn',  uploadImg ,serviceEnggContoller.EnggCheckIn);
router.put('/enggCheckOut',  uploadImg, serviceEnggContoller.EnggCheckOut);
router.put('/enggOnFirstHalfBreak', serviceEnggContoller.EnggOnFirstHalfBreak);
router.put('/enggOnSecondHalfBreak', serviceEnggContoller.EnggOnSecondHalfBreak);
router.put('/enggOnLunchBreak', serviceEnggContoller.EnggOnLunchBreak);

/* 
router.post('/gnggCheckIn', verifyEnggToken,  serviceEnggContoller.EnggCheckIn);
router.post('/gnggCheckOut', verifyEnggToken,  serviceEnggContoller.EnggCheckOut);
router.post('/gnggOnFirstHalfBreak', verifyEnggToken,  serviceEnggContoller.EnggOnFirstHalfBreak);
router.post('/gnggOnSecondHalfBreak', verifyEnggToken,  serviceEnggContoller.EnggOnSecondHalfBreak);
router.post('/gnggOnLunchBreak', verifyEnggToken,  serviceEnggContoller.EnggOnLunchBreak);
 */

router.post("/enggLeaveServiceRequest", serviceEnggContoller.enggLeaveServiceRequest)
router.get("/enggLeaveRecord", serviceEnggContoller.enggLeaveRecord)
router.post("/generateOtpForClient", serviceEnggContoller.generateOtpForClient)
router.get("/validateOtpForClient", serviceEnggContoller.validateOtpForClient)


module.exports = router;
