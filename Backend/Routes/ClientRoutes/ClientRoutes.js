const express = require("express");
const router = express.Router();

const {verifyToken} = require('../../Middleware/ClientAuthMiddleware')

const clientController = require("../../Controllers/ClientController/ClientController");

//-------------------------------- all post requests ------------------------------
router.post("/RegisterClients", clientController.RegisterClients);
router.post("/loginClient",clientController.loginClient )


router.post("/requestCallbacks",verifyToken('client'), clientController.RequestCallbacks);
router.post("/imediateServiceRequest", verifyToken('client') , clientController.imediateServiceRequest);

// ------------------------all get Requests ----------------------------------------
router.get("/clientDetail/:JobOrderNumber", verifyToken('client') ,clientController.getClientDetail);
router.get('/clientCallbacks/:JobOrderNumber', verifyToken('client'), clientController.getAllClientCallbacks);
router.get('/clientServices/:JobOrderNumber', verifyToken('client'), clientController.getAllClientServices);

module.exports = router;
