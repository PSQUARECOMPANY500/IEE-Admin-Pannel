const RegisterClientDetails = require("../../Modals/ClientDetailModals/RegisterClientDetailSchema");
const clientRequestCallback = require("../../Modals/ServicesModal/ClinetCallback");

const serviceRequest = require("../../Modals/ServicesModal/ClientServicesRequest");

const RegisterClientAsPhoneNumber = require("../../Modals/ClientDetailModals/RegisterClientWithNumberSchema");
const engineerRating = require("../../Modals/Rating/Rating");

const ReferalSchema = require("../../Modals/ClientDetailModals/ClientReferalSchema");

const { generateToken } = require("../../Middleware/ClientAuthMiddleware");

const assignService = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");
const assignCallback = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const ReportTable = require("../../Modals/ReportModal/ReportModal");
const moment = require("moment");
//--------------------------------------------------------------------------------------------------------------------------------------------------
//function to hadle getReferal By JobOrderNumber (to-do)

module.exports.getAllReferalByJobOrderNumber = async (req, res) => {
  try {
    const { jobOrderNumber } = req.params;

    const clientReferal = await ReferalSchema.find({ jobOrderNumber });

    if (!clientReferal || clientReferal.length === 0) {
      return res
        .status(400)
        .json({ message: "No referal found on this JobOrderNumber" });
    }

    return res.status(200).json({ message: "Referal Found", clientReferal });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle create the Client Referal API

module.exports.referalUser = async (req, res) => {
  try {
    const { jobOrderNumber, Name, Number, City, Hot } = req.body;

    const checkReferal = await RegisterClientDetails.findOne({
      PhoneNumber: Number,
    });
    if (checkReferal) {
      return res
        .status(400)
        .json({ message: "Lift is already installed on this number" });
    }

    const Referal = await ReferalSchema.create({
      jobOrderNumber,
      Name,
      Number,
      City,
      Hot,
    });
    res.status(201).json({
      message: "Referal Created successfully",
      Referal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle Register a client with his { Phone Number }
module.exports.RegisterClientAsPhoneNumber = async (req, res) => {
  try {
    const { PhoneNumber, Password } = req.body;

    const ExistingClient = await RegisterClientAsPhoneNumber.findOne({
      PhoneNumber,
    });

    if (ExistingClient) {
      return res
        .status(400)
        .json({ error: "This Client PhoneNumber already exists" });
    }

    const newClient = await RegisterClientAsPhoneNumber.create({
      PhoneNumber,
      Password,
    });

    res
      .status(201)
      .json({ message: "client register successfully", client: newClient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle Login Client as a { phoneNumber }
module.exports.loginClientwithPhoneNumber = async (req, res) => {
  try {
    const { Number, password } = req.body;

    const client = await RegisterClientAsPhoneNumber.findOne({
      PhoneNumber: Number,
    });
    // console.log("nulaa",client)

    if (!client || client.Password !== password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const clientJonDetail = await RegisterClientDetails.findOne({
      PhoneNumber: client.PhoneNumber,
    });

    const CLientDetailWithPhoneNumber = {
      ...client._doc,
      clientJonDetail,
    };

    const token = generateToken({ Number });
    res.status(200).json({
      message: "You are logged in Successfully",
      CLientDetailWithPhoneNumber,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------

// function to get all the vlient jobOrder number by its PhoneNumber

module.exports.GetAllJobOrderNumberByClientPhoneNumber = async (req, res) => {
  try {
    const { PhoneNumber } = req.params;

    const clientAccount = await RegisterClientDetails.find({ PhoneNumber });

    if (clientAccount.length === 0) {
      return res
        .status(401)
        .json({ message: "This Phone number is not registered" });
    }
    res.status(200).json({
      message: "Client found",
      client: clientAccount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------

// [function to Register Client By SuperAdmin] {superadmin : TODO , in future} ,{ add more details also }
module.exports.RegisterClientsAsJobOrderNumber = async (req, res) => {
  try {
    // Extract user data from the request body
    const {
      JobOrderNumber,
      name,
      Password,
      PhoneNumber,
      Address,
      DateOfHandover,
      ProfileImage,
      ModelType,
    } = req.body;

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
      ProfileImage,
      ModelType,
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
    const { Number, password } = req.body;
    // console.log(JobOrderNumber);

    // firstly check the user is exist or not
    const client = await RegisterClientDetails.findOne({
      JobOrderNumber: Number,
    });
    // console.log('hero',client)

    if (!client || client.Password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ Number });
    res
      .status(200)
      .json({ message: "You are logged in Successfully", client, token });
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
      AssignedEng,
      RepresentativeName,
      RepresentativeNumber,
    } = req.body;

    const newCallback = await clientRequestCallback.create({
      JobOrderNumber,
      callbackId,
      callbackDate,
      callbackTime,
      TypeOfIssue,
      Description,
      AssignedEng,
      RepresentativeName,
      RepresentativeNumber,
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
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to update callbackRequest {amit}

module.exports.updateCallbacks = async (req, res) => {
  try {
    const { callbackId, name, enggJon } = req.body;
    const updatedCallback = await clientRequestCallback.findOneAndUpdate(
      { callbackId },
      { isAssigned: true, AssignedEng: { name, id: enggJon } },
      { new: true }
    );

    if (updatedCallback) {
      res.json({
        message: "Callback updated successfully",
        data: updatedCallback,
      });
    } else {
      res.status(404).json({ error: "Callback not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating callback" });
  }
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function tio update service request {Preet}
module.exports.updateServiceRequest = async (req, res) => {
  try {
    const { RequestId, name, enggJon } = req.body;

    const updateServiceRequest = await serviceRequest.findOneAndUpdate(
      { RequestId },
      { isAssigned: true, AssignedEng: { name, id: enggJon } },
      { new: true }
    );

    if (updateServiceRequest) {
      res.json({
        message: "service Request updated successfully",
        service: updateServiceRequest,
      });
    } else {
      res.status(404).json({ error: "service Request not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating service request" });
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
      // Description,
    } = req.body;

    const newRequest = await serviceRequest.create({
      JobOrderNumber,
      RequestId,
      RequestDate,
      RequestTime,
      TypeOfIssue,
      // Description,
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

//.............................................api to verify token ...........................................................
const jwt = require("jsonwebtoken");

module.exports.verifyClient = (req, res) => {
  let token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - No token provided" });
  }

  // Remove the "Bearer " prefix
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const secretKey = "client-secret-key";
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    res.status(200).json({
      success: true,
      message: "Token verified successfully",
      user: decoded.user,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
      error: error.message,
    });
  }
};

//...............................................................Rating {amit} .............................................................

module.exports.Rating = async (req, res) => {
  try {
    const {
      JobOrderNumber,
      ServiceEnggId,
      ServiceId,
      Rating,
      Description,
      Questions: { Question1, Question2, Question3, Question4, Question5 },
    } = req.body;

    const serviceIdForRating = await engineerRating.findOne({ ServiceId });
    if (serviceIdForRating) {
      return res
        .status(400)
        .json({ message: "Rating is Already Done on This Id" });
    }

    const newRequest = await engineerRating.create({
      JobOrderNumber,
      ServiceEnggId,
      ServiceId,
      Rating,
      Description,
      Questions: {
        Question1,
        Question2,
        Question3,
        Question4,
        Question5,
      },
    });
    res.status(201).json({
      message: "Engineer rated successfully",
      success: true,
      newRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

//controller for handle create Reference by admin

/* module.exports.imediateServiceRequest = async (req, res) => {
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
}; */

//==================================================================
//==================================================================
//function to handle fetch Client Service history past and previos history

module.exports.fetchClientServiceHistory = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const currentDate = new Date().toLocaleDateString("en-GB");

    const callbackHistory = await assignCallback
      .find({ JobOrderNumber, ServiceProcess: "completed" })
      .select(
        "ServiceEnggId JobOrderNumber callbackId Message ServiceProcess Date"
      );

    const serviceRequestHistory = await assignService
      .find({ JobOrderNumber, ServiceProcess: "completed" })
      .select(
        "ServiceEnggId JobOrderNumber RequestId Message ServiceProcess Date"
      );

    const combinedHistory = [...callbackHistory, ...serviceRequestHistory];

    // Fetching engineer names for ServiceEnggId
    const enggIds = combinedHistory.map((entry) => entry.ServiceEnggId);
    const enggNames = await ServiceEnggBasicSchema.find({
      EnggId: { $in: enggIds },
    }).select("EnggId  EnggName");
    const enggNameMap = enggNames.reduce((acc, curr) => {
      acc[curr.EnggId] = curr.EnggName;
      return acc;
    }, {});

    // Fetching report data for each entry in combinedHistory
    const enrichedHistory = await Promise?.all(
      combinedHistory?.map(async (entry) => {
        const id = entry.callbackId || entry.RequestId;
        const paymentDetails = await ReportTable.find({ serviceId: id });
        // console.log('-------------------------------->',paymentDetails[0].paymentDetils);
        return {
          ...entry._doc,
          enggName: enggNameMap[entry.ServiceEnggId],
          paymentDetails:
            paymentDetails && paymentDetails.length > 0
              ? paymentDetails[0].paymentDetils
              : null,
        };
      })
    );

    // console.log('-------------------------------->', enrichedHistory)

    const latestDateEntry = enrichedHistory.filter(
      (entry) => entry.Date === currentDate
    );
    const previousHistory = enrichedHistory.filter(
      (entry) => entry.Date !== currentDate
    );

    const pastHistory = previousHistory.sort(
      (a, b) => new Date(b.Date) - new Date(a.Date)
    );

    res.status(200).json({ previousHistory: latestDateEntry, pastHistory });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error while fetching client service History" });
  }
};

//==================================================================
//==================================================================

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//api to get current schedule service for Client

// convert the format for Am/Pm

const convertTo12HourFormat = (time24) => {
  let [hours, minutes] = time24.split(':');

  hours = parseInt(hours, 10);

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
}


module.exports.getCurrentScheduleService = async (req, res) => {   // to do -> middlaware implemented 
  try {
    const { JobOrderNumber } = req.params;

    const currentDate = new Date().toLocaleDateString("en-GB");

    const service = await serviceRequest.find({
      JobOrderNumber
    });
    const callback = await clientRequestCallback.find({
      JobOrderNumber
    });

    let data = [];

    if (service.length > 0) {
      data = await Promise.all(
        service.map(async (item) => {
          const resp = await assignService.find({
            RequestId: item.RequestId,
          });
          return resp;
        })
      );
    } else if (callback.length > 0) {
      data = await Promise.all(
        callback.map(async (item) => {
          const resp = await assignCallback.find({
            callbackId: item.callbackId,
          });
          return resp;
        })
      );
    } else {
      return res.status(200).json({
        status: "complete",
        message: "Schedule your service",
        time: null,
        date: null,
        liveTracking: false,
        rating: false,
      });
    }

    if (
      data[0].length === 0 &&
      (service[0]?.isAssigned === false || callback[0]?.isAssigned === false)
    ) {
      return res.status(200).json({
        status: "success",
        message: "service Booked",
        time: null,
        date: null,
        liveTracking: false,
        rating: false,
      });
    }

    const rating = await engineerRating.findOne({
      ServiceId: data[0][0].ServiceId || data[0][0].callbackId,
    });
    console.log("rating for testing",rating);


    // console.log("preet saii", currentDate , data[0][0].Date, rating);
    // first case 1:
    if (
      (service[0]?.isAssigned === false || callback[0]?.isAssigned === false) &&
      !rating &&
      data[0][0].ServiceProcess === "InCompleted"
    ) {
      res.status(200).json({
        status: "success",
        message: "service Booked",
        time: null,
        date: null,
        liveTracking: false,
        rating: false,
      });
    } else if (
      (service[0]?.isAssigned === true || callback[0]?.isAssigned === true) &&
      !rating &&
      data[0][0].ServiceProcess === "InCompleted"
    ) {
      //case 2:
      res.status(200).json({
        status: "success",
        message:
          currentDate === data[0][0].Date
            ? `Service Today at ${convertTo12HourFormat((data[0][0].Slot[0]).split('-')[0])}`
            : currentDate > data[0][0].Date ? "Service Expired" : "Service Booked",
        time: currentDate > data[0][0].Date ? "(Awaiting Cancelation)" : convertTo12HourFormat((data[0][0].Slot[0]).split('-')[0]) +"-"+ convertTo12HourFormat((data[0][0].Slot[0]).split('-')[1]),
        date: data[0][0].Date,
        trackingId: data[0][0]?.callbackId || data[0][0]?.ServiceId,
        liveTracking: currentDate === data[0][0].Date ? true : false,
        rating: false,
      });
    } else if (
      (service[0]?.isAssigned === true || callback[0]?.isAssigned === true) && service[0]?.isDead === false,
      !rating &&
      data[0][0].ServiceProcess === "completed"
    ) {
      //case 3
      res.status(200).json({
        status: "success",
        message: "Service Completed",
        time: data[0][0].Slot,
        date: data[0][0].Date,
        liveTracking: false,
        rating: true,
      });
    }  
    else {
      res.status(200).json({
        status: "complete",
        message: "Schedule your service",
        time: null,
        date: null,
        liveTracking: false,
        rating: false,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error while fetching current active client service" });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------




//api to get steps and engg deatil for tracker in client application...

module.exports.getStepsAndEnggDetail = async (req,res) => {
  try {
    const {trackerId}  = req.params;

    const getData = await ReportTable.findOne({ serviceId: trackerId });

    const enggDetails = await ServiceEnggBasicSchema.findOne({EnggId: getData.EnggId});

    let data = [];

    const resp = await assignService.findOne({
      RequestId: trackerId,
    });
    const resp1 = await assignCallback.findOne({
      callbackId: trackerId,

    });

    if(resp && resp != null && resp != undefined) {
      data = resp;
    }else if(resp1 && resp1 != null && resp1 != undefined){
      data = resp1;
    }


console.log(data);

function processSlots(slots) {
  if (slots.length === 1) {
      return [slots[0]];
  } else if (slots.length > 1) {
      const startTime = slots[0].split('-')[0];
      const endTime = slots[slots.length - 1].split('-')[1];
      return [`${startTime}-${endTime}`];
  }
  return '';
}

const calucalteTime = processSlots(data.Slot)
console.log("Calculating", calucalteTime);

    const responsedata = {
      enggname: enggDetails.EnggName,
      enggId: getData.EnggId,
      enggImage: enggDetails.EnggPhoto,
      enggPhone: enggDetails.PhoneNumber,
      slot: convertTo12HourFormat((calucalteTime[0]).split('-')[0]) +"-"+ convertTo12HourFormat((calucalteTime[0]).split('-')[1]),
    }

    res.status(200).json({status:"success", steps: getData.Steps, EnggDetails: responsedata});

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error while fetching current active client service" })
  }
};