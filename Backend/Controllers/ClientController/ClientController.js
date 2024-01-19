const RegisterClientDetails = require("../../Modals/ClientDetailModals/RegisterClientDetailSchema");
const clientRequestCallback = require("../../Modals/ServicesModal/ClinetCallback");

const serviceRequest = require("../../Modals/ServicesModal/ClientServicesRequest");

const RegisterClientAsPhoneNumber = require("../../Modals/ClientDetailModals/RegisterClientWithNumberSchema")

const { generateToken } = require("../../Middleware/ClientAuthMiddleware");

//------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle Register a client with his { Phone Number }
module.exports.RegisterClientAsPhoneNumber = async (req,res) =>{
  try {
    const {PhoneNumber ,Password} = req.body;

    const ExistingClient = await RegisterClientAsPhoneNumber.findOne({PhoneNumber});

    if(ExistingClient){
      return res.status(400).json({ error: "This Client PhoneNumber already exists" });
    } 

    const newClient = await RegisterClientAsPhoneNumber.create({
      PhoneNumber,
      Password
    });

    res.status(201).json({message:"client register successfully", client: newClient})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle Login Client as a { phoneNumber }
module.exports.loginClientwithPhoneNumber = async (req,res) =>{
  try {
    const {PhoneNumber ,Password} = req.body;

    const client = await RegisterClientAsPhoneNumber.findOne({PhoneNumber});

    if(!client || client.Password !== Password){
      return res.status(401).json({message:"Invalid Credentials"})
    }

    const token = generateToken({ PhoneNumber });
    res.status(200).json({ message:'You are logged in Successfully',client, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------

// function to get all the vlient jobOrder number by its PhoneNumber

module.exports.GetAllJobOrderNumberByClientPhoneNumber = async (req,res) =>{
  try {
    const { PhoneNumber } = req.params;

    const clientAccount = await RegisterClientDetails.find({PhoneNumber});

    if (clientAccount.length === 0) {
      return res.status(401).json({ message: "This Phone number is not registered" });
    }
    res.status(200).json({
      message: "Client found",
      client: clientAccount,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------


// [function to Register Client By SuperAdmin] {superadmin : TODO , in future} ,{ add more details also }
module.exports.RegisterClientsAsJobOrderNumber = async (req, res) => {
  try {
    // Extract user data from the request body
    const { JobOrderNumber,name, Password, PhoneNumber, Address, DateOfHandover,ProfieImage,ModelType } =
      req.body;

    const ExistingClient = await RegisterClientDetails.findOne({
      JobOrderNumber,
    });
    if (ExistingClient) {
      return res.status(400).json({ error: "This Client JON already exists" });
    }

    // Create a new instance of the model with the user data
    const newClient = await RegisterClientDetails.create({
      JobOrderNumber,
      name,
      Password,
      PhoneNumber,
      Address,
      DateOfHandover,
      ProfieImage,
      ModelType
    });

    // save user to the data base
    // const savedClient = await newClient.save();

    // Respond with the saved user data
    res
      .status(201)
      .json({ message: "Client Register Succesfully", user: newClient });
  } catch (error) {
    // Check for duplicate key error (unique constraint violation)
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle login client with Job Order Number
module.exports.loginClientWithJobOrderNumber = async (req, res) => {
  try {
    const { JobOrderNumber, password } = req.body;
    // console.log(JobOrderNumber);

    // firstly check the user is exist or not
    const client = await RegisterClientDetails.findOne({ JobOrderNumber });

    if (!client || client.Password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ JobOrderNumber });
    res.status(200).json({ message:'You are logged in Successfully',client, token });
  } catch (error) {
    console.error("Error logging in client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle the client request for Imdiate visit

module.exports.RequestCallbacks = async (req, res) => {
  try {
    const {
      JobOrderNumber,
      callbackId,
      callbackDate,
      callbackTime,
      TypeOfIssue,
      Description,
    } = req.body;

    const newCallback = await clientRequestCallback.create({
      JobOrderNumber,
      callbackId,
      callbackDate,
      callbackTime,
      TypeOfIssue,
      Description,
    });
    res.status(201).json({
      message: "Client raised ticket for a callback successfully",
      Requests: newCallback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error for creating callback" });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle the client service request for Imdiate visit

module.exports.imediateServiceRequest = async (req, res) => {
  try {
    const {
      JobOrderNumber,
      RequestId,
      RequestDate,
      RequestTime,
      TypeOfIssue,
      Description,
    } = req.body;

    const newRequest = await serviceRequest.create({
      JobOrderNumber,
      RequestId,
      RequestDate,
      RequestTime,
      TypeOfIssue,
      Description,
    });
    res.status(201).json({
      message: "Client raised imidiate Request ticket successfully",
      imidiateRequest: newRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error for creating service Request" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------

// Function to handle (get all the client data corresponding to ID)

module.exports.getClientDetail = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const client = await RegisterClientDetails.findOne({ JobOrderNumber });

    if (!client) {
      return res.status(404).json({
        message: "No Client found for the Job OrderNumber",
      });
    }
    res.status(200).json({
      message: "Client found",
      client: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle to see all the  ( Callbacks ) of the client

module.exports.getAllClientCallbacks = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const clientCallback = await clientRequestCallback.find({ JobOrderNumber });

    if (!clientCallback || clientCallback.length === 0) {
      return res.status(404).json({
        message: "No Callback services found for the specified client",
      });
    }
    res.status(200).json({
      message: "Raised callbacks by Specific client retrieved successfully",
      clientCallback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle to see all the ( Imidiate Service Request ) of the client

module.exports.getAllClientServices = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const clientService = await serviceRequest.find({ JobOrderNumber });

    if (!clientService || clientService.length === 0) {
      return res.status(404).json({
        message: "No services found for the specified client",
      });
    }

    res.status(200).json({
      message: "Raised Service by Specific client retrieved successfully",
      clientService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
