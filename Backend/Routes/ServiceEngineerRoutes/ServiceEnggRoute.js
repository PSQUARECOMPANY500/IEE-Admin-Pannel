const express = require("express");
const router = express.Router();
const multer = require('multer')
const EnggAttendanceServiceRecord = require('../../Modals/ServiceEngineerModals/Attendance')
const { verifyEnggToken } = require("../../Middleware/ServiceEnggAuthMiddleware")

const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");
const adminContoller = require("../../Controllers/AdminController/AdminController");


const uploaded = require('../../Multer/EnggAttachmentUpload')


//-------------------------------------- All Post Requests -------------------------------
router.post("/registerServiceEngg",uploaded.fields([{
    name: 'enggAttachments',
    maxCount: 5
  }
]),
 serviceEnggContoller.RegisterServiceEngg);





router.post("/loginEngg", serviceEnggContoller.loginEngg)

//location service
router.post("/createEnggLocation", serviceEnggContoller.createEnggLocation)
router.post("/createEnggLocationOnAttendance", serviceEnggContoller.CreateEnggLocationOnAttendance)

//------------------------------------- All Get Requests -----------------------------------------
// router.get("/getAllCallbacks/:ServiceEnggId", verifyEnggToken, serviceEnggContoller.getAssignCallbacks);
// router.get("/getAllServices/:ServiceEnggId", verifyEnggToken, serviceEnggContoller.getAssignedServices);
// router.get('/getServiceEngg/:EnggId', verifyEnggToken, serviceEnggContoller.getEnggDetail);  
// router.get('/getEngScheduleData', verifyEnggTokrven, seiceEnggContoller.getEngScheduleData);

//comment the below section and uuncomment the upper section (below section is only for the ease for pankaj sir)
router.get("/getAllCallbacks/:ServiceEnggId", serviceEnggContoller.getAssignCallbacks);
router.get("/getAllServices/:ServiceEnggId", serviceEnggContoller.getAssignedServices);
router.get('/getServiceEngg/:EnggId', serviceEnggContoller.getEnggDetail);
router.get('/getEngScheduleData/:ServiceEnggId', serviceEnggContoller.getEngScheduleData);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uplodes/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}.jpeg`);
  },
});
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uplodes/leaveAttachment');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    const fileName = `leaveAttachment-${Date.now()}.${parts}`
    cb(null, fileName);
  },
});
const upload2 = multer({ storage: storage2 });

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
    const date = new Date().toLocaleDateString("en-GB");

    const checksum = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId: Id,
      Date: date,
    });
    // Checking if engg directly checked out without checking in -- Pankaj_Saini
    if (!checksum?.Check_In?.time) {
      return res
        .status(403)
        .json({ status: "Error", message: "Engg not CheckedIN" });
    }
    if (checksum?.Check_Out?.time) {
      return res.status(403).json({ message: "Engg already CheckedOUT" });
    }
    next();
  }
};


const checkInorOutAttendance = async (req, res, next) => {
  const { ServiceEnggId } = req.body;
  if (ServiceEnggId) {
    const date = new Date().toLocaleDateString("en-GB");
    const checkIn = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId: ServiceEnggId,
      Date: date,
    });
    if (!checkIn?.Check_In?.time) {
      return res.status(403).json({
        status: "Error",
        message: "You can take break after CheckIn only",
      });
    }
    if (checkIn?.Check_In?.time && checkIn?.Check_Out?.time) {
      return res
        .status(403)
        .json({ message: "Break is not applicable after CheckedOut" });
    }
    if (checkIn?.Check_In?.time && !checkIn?.Check_Out?.time) {
      next();
    }
  }
};

router.get('/getTime', serviceEnggContoller.EnggTime);
router.post('/enggCheckIn/:ServiceEnggId', checkInAttendance, uploadImg, serviceEnggContoller.EnggCheckIn);
router.put('/enggCheckOut/:ServiceEnggId', checkOutAttendance, uploadImg, serviceEnggContoller.EnggCheckOut);
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

router.get("/enggLeaveRecord", serviceEnggContoller.enggLeaveRecord)
router.post("/generateOtpForClient", serviceEnggContoller.generateOtpForClient)
router.post("/validateOtpForClient", serviceEnggContoller.validateOtpForClient)

router.post("/EnggReportResponse", serviceEnggContoller.EnggReportResponse)
router.get("/EnggReportQuestionFetch", serviceEnggContoller.EnggReportQuestionFetch)
router.get("/fetchEnggAttendance/:ServiceEnggId/:selectedDate", adminContoller.fetchEnggAttendance)
router.get("/EnggCheckInCheckOutDetals/:ServiceEnggId", serviceEnggContoller.EnggCheckInCheckOutDetals)

// by armaan 29/03/2024


// router.post("/pankaj", upload2.fields([{
//   name: 'document',
//   maxCount: 1
// }
// ]), serviceEnggContoller.enggLeaveServiceRequest);

router.post("/pankaj",upload2.fields([
  {
    name: 'document',
    maxCount: 1
  }]), serviceEnggContoller.enggLeaveServiceRequest);
// router.post("/pankaj", serviceEnggContoller.testingApi);


router.get("/getEngineerLeveCount", serviceEnggContoller.getEngineerLeveCount)


router.get("/getEngineerLeaves", serviceEnggContoller.getEngineerLeaves)
// --- by preet 15/03/2024 ---
router.get("/getAssignCalbackDetailForEnggApp/:callbackId", serviceEnggContoller.AssignCallbackDataForEnggAppByCallbackId);
router.get("/getAssignServiceRequestDetailForEnggApp/:RequestId", serviceEnggContoller.AssignServiceRequestDataForEnggAppByServiceId);

// --- by preet 18/03/2024 ---
router.get("/getAssignedChecklist/:checklistId", serviceEnggContoller.getChecklistByIdAndServiceType);

//-----by preet 21/03/2024 ---

router.get("/getSparePart", serviceEnggContoller.getAllSparePartdetails);

//----by preet 22/03/2024 ---

router.post("/generateReport", serviceEnggContoller.GenerateReportByEngg);

//----by preet 28/03/2024 ---
router.get("/fetchFinalReport/:serviceId",serviceEnggContoller.getFinalReportDetails);



// --by amit 29/03/2024 ------------
router.get("/enggHistory/:ServiceEnggId",adminContoller.assignedEnggDetails)




// --by Preet 31/03/2024 ------------
router.get("/getEnggIdForReport/:EnggId", serviceEnggContoller.getServiceIdOfLatestReportByServiceEngg);


// --by Preet 31/03/2024 ------------
//route to handle update paymanet details and update spare part request also.
router.post("/upadatePaymentDetails", serviceEnggContoller.UpdatePaymentDetilsAndSparePartRequested)



//=================================================================================
//=================================================================================
// Api to get information of the breaks -- dhan dhan shri pankaj preet ji maharaj
// 31/03/2024
router.get(
  "/getfirsthalftime/:ServiceEnggId",
  serviceEnggContoller.EnggFirsthalfinfo
);

router.get(
  "/getsecondhalftime/:ServiceEnggId",
  serviceEnggContoller.EnggSecondhalfinfo
);

router.get(
  "/getLunchBreaktime/:ServiceEnggId",
  serviceEnggContoller.EnggLunchBreakinfo
);

router.put(
  "/enggOnFirstHalfBreak",
  checkInorOutAttendance,
  serviceEnggContoller.EnggOnFirstHalfBreak
);

router.put(
  "/enggOnSecondHalfBreak",
  checkInorOutAttendance,
  serviceEnggContoller.EnggOnSecondHalfBreak
);

router.put(
  "/enggOnLunchBreak",
  checkInorOutAttendance,
  serviceEnggContoller.EnggOnLunchBreak
);

//=================================================================================//=================================================================================










module.exports = router;
