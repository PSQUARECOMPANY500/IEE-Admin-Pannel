const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const {verifyToken} = require('../../Middleware/ClientAuthMiddleware')

const clientController = require("../../Controllers/ClientController/ClientController");

//-------------------------------- all post requests ------------------------------
router.post("/RegisterClientsAsJON", clientController.RegisterClientsAsJobOrderNumber);
router.post("/RegisterClientAsPhone", clientController.RegisterClientAsPhoneNumber)
router.post("/loginWithPhone",clientController.loginClientwithPhoneNumber);
router.post("/loginClientJON",clientController.loginClientWithJobOrderNumber)


/* router.post("/requestCallbacks",verifyToken('client'), clientController.RequestCallbacks); */
router.put("/updateCallbacks", clientController.updateCallbacks);
router.post("/requestCallbacks", clientController.RequestCallbacks);
router.post("/imediateServiceRequest", verifyToken('client') , clientController.imediateServiceRequest);
router.post("/engineerRating",verifyToken('client'),clientController.Rating)
//router.post("/engineerRating",clientController.Rating)

// ------------------------all get Requests ----------------------------------------
router.get("/clientDetail/:JobOrderNumber", verifyToken('client') ,clientController.getClientDetail);
router.get('/clientCallbacks/:JobOrderNumber', verifyToken('client'), clientController.getAllClientCallbacks);
router.get('/clientServices/:JobOrderNumber', verifyToken('client'), clientController.getAllClientServices);

router.get('/clientAllJONs/:PhoneNumber',verifyToken('client'), clientController.GetAllJobOrderNumberByClientPhoneNumber);
//-------------------------verify--------------------------------------------------
router.get("/verifyclient",clientController.verifyClient);

//-------------------------rating{amit}---------------------------------------------

module.exports = router;
