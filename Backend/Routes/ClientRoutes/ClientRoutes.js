const express = require("express");
const router = express.Router();


const multer = require("multer")
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');  

const s3 = require('../../Multer/EnggAttachmentUpload');


const jwt = require('jsonwebtoken');

const { verifyToken } = require('../../Middleware/ClientAuthMiddleware')    //TODO: apply token when admin login functionality is available
const checkClientServiceExist = require("../../Middleware/CheckClientPreviousService")

const clientController = require("../../Controllers/ClientController/ClientController");


//-------------------------------- all post requests ------------------------------------
router.post("/RegisterClientsAsJON", clientController.RegisterClientsAsJobOrderNumber);
router.post("/RegisterClientAsPhone", clientController.RegisterClientAsPhoneNumber)
router.post("/loginWithPhone", clientController.loginClientwithPhoneNumber);
router.post("/loginClientJON", clientController.loginClientWithJobOrderNumber)

//client raised callback and service request --------------------------------
router.post("/requestCallbacks", checkClientServiceExist, clientController.RequestCallbacks);
router.post("/imediateServiceRequest", checkClientServiceExist, clientController.imediateServiceRequest);



router.put("/updateCallbacks", clientController.updateCallbacks);


router.post("/createReferal", verifyToken('client'), clientController.referalUser);
router.get("/getClientReferalByJobOrderNumber/:jobOrderNumber", verifyToken('client'), clientController.getAllReferalByJobOrderNumber);

router.post("/engineerRating", clientController.Rating)

// ------------------------all get Requests ----------------------------------------
router.get("/clientDetail/:JobOrderNumber", verifyToken('client'), clientController.getClientDetail);
router.get('/clientCallbacks/:JobOrderNumber', verifyToken('client'), clientController.getAllClientCallbacks);
router.get('/clientServices/:JobOrderNumber', verifyToken('client'), clientController.getAllClientServices);

router.get('/clientAllJONs/:PhoneNumber', verifyToken('client'), clientController.GetAllJobOrderNumberByClientPhoneNumber);
//-------------------------verify-----------------------------------------------------
router.get("/verifyclient", clientController.verifyClient);

//-------------------------rating{amit}--------------------------------------------------

// ----------- 17/04/2024 Preet -------------------------------
router.get("/fetchClientServiceHistory/:JobOrderNumber", clientController.fetchClientServiceHistory)



// ------------------------all Put Requests ----------------------------------------------------

router.put("/updateServiceRequest", clientController.updateServiceRequest);



// ------------------------20/05/2024 by preet --------------------------------
router.get("/getClientCurentActiveService/:JobOrderNumber", clientController.getCurrentScheduleService);

router.get("/gettrackerdetails/:trackerId", clientController.getStepsAndEnggDetail);

//---------------------------- embeded by preet 24/05/2024---------------------------------------------------------------
router.post(
  "/clientPayment",
  clientController.clientPayment
);


router.get("/getMembershipData", clientController.getMembershipFeatuesDetails)
router.get("/getMembershipDiscount/:JobOrderNumber", clientController.getMembershipDiscount)


router.get("/checkpaymentstatusandmakeinvoice/:JobOrderNumber", clientController.checkPaymentStatusAndMakeInvoice)


router.post('/registerFirebaseToken', clientController.firebaseTokenForPushNotificationPurpose);


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/ClientProfiles/");
//   },
//   filename: (req, file, cb) => {
//     console.log("file", file)
//     const parts = file.mimetype.split("/")[1];
//     const fileName = file.originalname.split(".")[0];
//     cb(null, `${fileName}-${Date.now()}.${parts}`);
//   },
// });

const storage = multerS3({
  s3: s3,
  bucket: 'ieelifts.in',
  metadata:(req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1]; // Get file extension
    cb(null, `public/ClientProfiles/${file.originalname}-${Date.now()}.${parts}`); // Define file name in S3
  },
})

const upload = multer({ storage: storage });






router.put(
  "/updateClientProfile",
  upload.any(),
  clientController.updateClientProfile
);



router.delete(
  "/removeClientFirebaseToken",
  clientController.removeClientFirebaseToken
);


router.post('/EnginnerCancellPreviousServiceOrCallbackRequest', clientController.EnginnerCancellPreviousServiceOrCallbackRequest)

router.get('/getCallbackOrServiceCancelledRequests', clientController.getCallbackOrServiceCancelledRequests)

router.post('/resumePreviousService', clientController.resumePreviousService)

// SOS requests routes
router.post('/sosRequest', clientController.sosRequest)

module.exports = router;
