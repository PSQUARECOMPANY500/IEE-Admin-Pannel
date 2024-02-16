const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const callbackAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const serviceAssigtoEngg = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const { generateEnggToken } = require('../../Middleware/ServiceEnggAuthMiddleware')

// ---------------------------------------------------------------------------------------------------------------------
// [function to Register service Engg By SuperAdmin] {superadmin : TODO , in future}
module.exports.RegisterServiceEngg = async (req, res) => {
  try {
    // Extract user data from the request body
    const {
      EnggId,
      EnggPassword,
      EnggName,
      PhoneNumber,
      EnggAddress,
      EnggPhoto
    } = req.body;

    const ExistingServiceEngg = await ServiceEnggBasicSchema.findOne({
      EnggId,
    });
    if (ExistingServiceEngg) {
      return res
        .status(400)
        .json({ error: "This Service Engineer ID already exists" });
    }

    // Create a new instance of the model with the user data
    const newUser = await ServiceEnggBasicSchema.create({
      EnggId,
      EnggPassword,
      EnggName,
      PhoneNumber,
      EnggAddress,
      EnggPhoto,
    });
    // Respond with the saved user data
    res.status(201).json({ message: "service Engg Register Succesfully", user: newUser });
  } catch (error) {
    // Check for duplicate key error (unique constraint violation)
    //console.log(error)
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate key error" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

//-------------------------------------------------------------------------------------------------------------------------------
//function to handle serviceEngg Login
module.exports.loginEngg =  async (req,res) => {
  try {
    const { EnggId , password } = req.body;

    //firstly check the Engg is exist or not
    const Engg = await ServiceEnggBasicSchema.findOne({EnggId});

    if(!Engg || Engg.EnggPassword !== password){
      return res.status(401).json({message : 'Invalid Credentials'});
    }

    const token = generateEnggToken({EnggId});
    res.json({Engg,token})


  } catch (error) {
    console.error("Error logging in service Engg:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//--------------------------------------------------------------------------------------------------------------------------------

// get all the callback Assign to Specific ServiceEngg

module.exports.getAssignCallbacks = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;

    const AssignedCallback = await callbackAssigntoEngg.find({ ServiceEnggId });

    if (!AssignedCallback || AssignedCallback.length === 0) {
      return res.status(404).json({
        message:
          "No Callback services found for the specified Service Engineer ID",
      });
    }

    res.status(200).json({
      message: "Assigned callbacks by Specific Engg retrieved successfully",
      AssignedCallback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------
//get all service assigned by service Engg

module.exports.getAssignedServices = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;

    const assignedServices = await serviceAssigtoEngg.find({ ServiceEnggId });

    if (!assignedServices || assignedServices.length === 0 ) {
      return res.status(404).json({
        message: "No services Engg found for the specified Service Engineer ID",
      });
    }

    res.status(200).json({
      message: "Assigned services by Specific Engg retrieved successfully",
      assignedServices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//-------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle (all the Engg detail as per engg Id)

module.exports.getEnggDetail = async (req,res) =>{
  try {
    const { EnggId } = req.params;

    const enggDetail = await ServiceEnggBasicSchema.findOne({EnggId});

    
    if (!enggDetail) {
      return res.status(404).json({
        message: "No services Engg found for the specified Service Engineer ID",
      });
    }

    res.status(200).json({
      message: "servicesc Engg retrieved by his/her ID successfully",
      enggDetail,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------