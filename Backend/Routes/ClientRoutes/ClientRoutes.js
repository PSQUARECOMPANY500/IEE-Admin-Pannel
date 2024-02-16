const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const {verifyToken} = require('../../Middleware/ClientAuthMiddleware')

const clientController = require("../../Controllers/ClientController/ClientController");

//-------------------------------- all post requests ------------------------------------
router.post("/RegisterClientsAsJON", clientController.RegisterClientsAsJobOrderNumber);
router.post("/RegisterClientAsPhone", clientController.RegisterClientAsPhoneNumber)
router.post("/loginWithPhone",clientController.loginClientwithPhoneNumber);
router.post("/loginClientJON",clientController.loginClientWithJobOrderNumber)


/* router.post("/requestCallbacks",verifyToken('client'), clientController.RequestCallbacks); */
router.post("/requestCallbacks", clientController.RequestCallbacks);
/* router.put("/updateCallbacks", verifyToken('client') , clientController.updateCallbacks); */
router.put("/updateCallbacks", clientController.updateCallbacks);

/* router.post("/imediateServiceRequest", verifyToken('client') , clientController.imediateServiceRequest);*/
router.post("/imediateServiceRequest",clientController.imediateServiceRequest);

router.post("/createReferal", verifyToken('client'), clientController.referalUser);

router.post("/createReferal", verifyToken('client'), clientController.referalUser);

//router.post("/engineerRating",clientController.Rating)

// ------------------------all get Requests ----------------------------------------
router.get("/clientDetail/:JobOrderNumber", verifyToken('client'), clientController.getClientDetail);
router.get('/clientCallbacks/:JobOrderNumber', verifyToken('client'), clientController.getAllClientCallbacks);
router.get('/clientServices/:JobOrderNumber', verifyToken('client'), clientController.getAllClientServices);

router.get('/clientAllJONs/:PhoneNumber',verifyToken('client'), clientController.GetAllJobOrderNumberByClientPhoneNumber);
//-------------------------verify-----------------------------------------------------
router.get("/verifyclient",clientController.verifyClient);

//-------------------------rating{amit}--------------------------------------------------



// ------------------------all Put Requests ----------------------------------------------------
router.put("/updateCallbacks", clientController.updateCallbacks);
router.put("/updateServiceRequest", clientController.updateServiceRequest);
router.post("/engineerRating",verifyToken('client'),clientController.Rating)


module.exports = router;