const serviceEnggSchema = require("../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");
const { jwtDecode } = require("jwt-decode");

const checkClientDeviceLogins = async (req, res, next) => {
  const DeviceId = req.headers["device-id"];

  let Token = req.header("Authorization");
  // console.log("::::::::::::::::::::: ", Token);

  const token = Token.split(" ")[1];
  // console.log("[[[[[[[[[[[",token)

  const user = jwtDecode(token);

  const EnggData = await serviceEnggSchema.find({ EnggId: user.user.EnggId });

  // console.log("ggggggggggg",EnggData[0].ActiveDevice)
  // console.log("kkkkkkkkkkkkkkkkkk",DeviceId)

  if (EnggData[0].ActiveDevice !== DeviceId) {
    return res.status(200).json({
      status: "deviceerror",
      message: "You have Logged in with Another device",
    });
  }

  next();
};

module.exports = checkClientDeviceLogins;
