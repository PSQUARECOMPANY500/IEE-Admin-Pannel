const express = require("express");
const router = express.Router();

const {verifyToken} = require('../../Middleware/ClientAuthMiddleware')

const clientController = require("../../Controllers/ClientController/ClientController");

//-------------------------------- all post requests ------------------------------
router.post("/RegisterClientsAsJON", clientController.RegisterClientsAsJobOrderNumber);
router.post("/RegisterClientAsPhone", clientController.RegisterClientAsPhoneNumber)
router.post("/loginWithPhone",clientController.loginClientwithPhoneNumber);
router.post("/loginClientJON",clientController.loginClientWithJobOrderNumber)


router.post("/requestCallbacks",verifyToken('client'), clientController.RequestCallbacks);
router.post("/imediateServiceRequest", verifyToken('client') , clientController.imediateServiceRequest);

// ------------------------all get Requests ----------------------------------------
router.get("/clientDetail/:JobOrderNumber", verifyToken('client') ,clientController.getClientDetail);
router.get('/clientCallbacks/:JobOrderNumber', verifyToken('client'), clientController.getAllClientCallbacks);
router.get('/clientServices/:JobOrderNumber', verifyToken('client'), clientController.getAllClientServices);

router.get('/clientAllJONs/:PhoneNumber',verifyToken('client'), clientController.GetAllJobOrderNumberByClientPhoneNumber);



module.exports = router;
