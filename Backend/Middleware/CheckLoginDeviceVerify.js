const serviceEnggSchema = require("../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");
const { jwtDecode } = require("jwt-decode");

const checkClientDeviceLogins = async (req, res, next) => {
  const DeviceId = req.headers["device-id"];


  const Token =  req.header("Authorization");

  console.log("\\\\\\\\\\\\\\\\",Token)

  const token = Token && Token?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }


  const user = jwtDecode(token);



  const EnggData = await serviceEnggSchema.find({ EnggId: user.user.EnggId });



  if (EnggData[0]?.ActiveDevice !== DeviceId) {
    return res.status(200).json({
      status: "deviceerror",
      message: "You have Logged in with Another device",
    });
  }

  next();
};

module.exports = checkClientDeviceLogins;
