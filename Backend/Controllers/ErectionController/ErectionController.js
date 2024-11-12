const  ServiceEnggBasicDetails = require('../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema')




module.exports.getErectionEnggForErectionPannel = async (req, res) => {
  try {
    const ErrectionEngg = await ServiceEnggBasicDetails.find({EnggRole:'erectionengineer'})
    if (!ErrectionEngg) {
      return res.status(404).json({ message: "No erection engineers found" });
    }
    res.status(200).json(ErrectionEngg);
  } catch (error) {
    console.log("error while fetching erection Enng", error);
    res.status(500).json({ message: "Error while fetching" });
  }
};
