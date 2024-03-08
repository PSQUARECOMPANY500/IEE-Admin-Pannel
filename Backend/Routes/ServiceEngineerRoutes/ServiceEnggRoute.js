const express = require("express");
const router = express.Router();
const multer = require('multer')
const EnggAttendanceServiceRecord = require('../../Modals/ServiceEngineerModals/Attendance')
const { verifyEnggToken } = require("../../Middleware/ServiceEnggAuthMiddleware")

const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");
const adminContoller = require("../../Controllers/AdminController/AdminController");

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

const upload = multer({ storage: storage });

const uploadImg = upload.fields([
  {
    name: 'frontimage',
    maxCount: 1
  },
  {
    name: 'backimage',
    maxCount: 1
  }
]);

const checkInAttendance = async (req, res, next) => {
  const  Id  = req.params.ServiceEnggId;
  //console.log(Id);
  //console.log(req.params.ServiceEnggId);
  if (Id) {
    const date = new Date().toLocaleDateString('en-GB');

    const checksum = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId: Id,
      Date: date,
    });
    
    if (checksum) {
      return res.status(403).json({ message: "Engg already CheckedIN" });
    }
    next();
  } else {
    return res.status(400).json({ message: "ServiceEnggId is required" });
  }
};




const checkOutAttendance = async (req, res, next) => {
  const Id = req.params.ServiceEnggId;
  if (Id) {
    const date = new Date().toLocaleDateString('en-GB');

    const checksum = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId: Id,
      Date: date,
    });
    if (checksum?.Check_Out?.engPhoto) {
      return res.status(403).json({ message: "Engg already CheckedOUT" });
    }
    next();
  }
}

router.get('/getTime', serviceEnggContoller.EnggTime);
router.post('/enggCheckIn/:ServiceEnggId', checkInAttendance, uploadImg, serviceEnggContoller.EnggCheckIn);
router.put('/enggCheckOut/:ServiceEnggId',checkOutAttendance, uploadImg, serviceEnggContoller.EnggCheckOut);
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

router.post("/EnggReportResponse", serviceEnggContoller.EnggReportResponse)
router.get("/EnggReportQuestionFetch", serviceEnggContoller.EnggReportQuestionFetch)
router.get("/fetchEnggAttendance", adminContoller.fetchEnggAttendance)
router.get("/EnggCheckInCheckOutDetals/:ServiceEnggId", serviceEnggContoller.EnggCheckInCheckOutDetals)


module.exports = router;
