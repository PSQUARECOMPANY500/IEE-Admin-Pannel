const express = require("express");
const router = express.Router();


const ErectionController = require("../../Controllers/ErectionController/ErectionController")

router.get("/getErectionEnggData",ErectionController.getErectionEnggForErectionPannel);



module.exports = router;