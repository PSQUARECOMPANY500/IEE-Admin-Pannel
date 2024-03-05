const express = require("express");
const router = express.Router();
const multer  = require('multer')
const EnggAttendanceServiceRecord  = require('../../Modals/ServiceEngineerModals/Attendance')
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
router.get('/getEngScheduleData', verifyEnggToken,  serviceEnggContoller.getEngScheduleData);



const timestamp = new Date().getTime();
const filename = `picture_${timestamp}.jpg`;

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// // Define a route for uploading images
// app.post('/upload', upload.single('image'), async (req, res) => {
//   const newImage = new Image({
//     data: req.file.buffer,
//     contentType: req.file.mimetype,
//   });
//   await newImage.save();
//   res.send('Image uploaded successfully');
// });


// const storage = multer.diskStorage({
  
  //   destination: (req, file, cb) => {
  //     cb(null, "public/documents");
  //   },
  //   filename: function (req, file, cb) {
  //       cb(null, file.fieldname + '-' + Date.now())
  //     }
  // });
  // const upload = multer({ storage: storage });

//engg route on check-in check-out firsthalfbreak SecondHalfBreak LunchBreak
router.post('/enggCheckIn', upload.single('image'), async (req, res) => {
  const time = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: '2-digit',
    hour12: false 
  });      
  const newImage = new EnggAttendanceServiceRecord({
    image: req.file.buffer,
    Check_In: {
      engPhoto: req.file.filename,
      time: time,
    }  
  });
  await newImage.save();
  res.send('Image uploaded successfully');
});






router.put('/enggCheckOut', serviceEnggContoller.EnggCheckOut);
router.put('/enggOnFirstHalfBreak', serviceEnggContoller.EnggOnFirstHalfBreak);
router.put('/enggOnSecondHalfBreak',serviceEnggContoller.EnggOnSecondHalfBreak);
router.put('/enggOnLunchBreak', serviceEnggContoller.EnggOnLunchBreak);

/* 
router.post('/gnggCheckIn', verifyEnggToken,  serviceEnggContoller.EnggCheckIn);
router.post('/gnggCheckOut', verifyEnggToken,  serviceEnggContoller.EnggCheckOut);
router.post('/gnggOnFirstHalfBreak', verifyEnggToken,  serviceEnggContoller.EnggOnFirstHalfBreak);
router.post('/gnggOnSecondHalfBreak', verifyEnggToken,  serviceEnggContoller.EnggOnSecondHalfBreak);
router.post('/gnggOnLunchBreak', verifyEnggToken,  serviceEnggContoller.EnggOnLunchBreak);
 */

router.post("/enggLeaveServiceRequest",serviceEnggContoller.enggLeaveServiceRequest)
router.get("/enggLeaveRecord",serviceEnggContoller.enggLeaveRecord)
router.post("/generateOtpForClient",serviceEnggContoller.generateOtpForClient)
router.get("/validateOtpForClient",serviceEnggContoller.validateOtpForClient)


module.exports = router;
