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

const memberShipDetails = require("../../Modals/MemebershipModal/MembershipsSchema");

const ReportTable = require("../../Modals/ReportModal/ReportModal");

const createMemberShipOnTables = require("../../Modals/MemebershipModal/MembershipDataSchema");

const SoSRequestsTable = require("../../Modals/SOSModels/SoSRequestModel");

const Razorpay = require("razorpay");

const fs = require("fs");
const path = require("path");

const htmlpdf = require("html-pdf");
var pdf = require("pdf-creator-node");
const { JSDOM } = require("jsdom");

const { jsPDF } = require("jspdf");

const pdfFormat = require("../../public/MembershipInvoice/membershipInvoiceTemplate");

const RegisteredElevatorForm = require("../../Modals/ClientDetailModals/ClientFormSchema");

//--------------------------------------------------------------------------------------------------------------------------------------------------
//function to hadle getReferal By JobOrderNumber (to-do)

module.exports.getAllReferalByJobOrderNumber = async (req, res) => {
  try {
    const { jobOrderNumber } = req.params;

    const clientReferal = await ReferalSchema.find({ jobOrderNumber });

    if (!clientReferal || clientReferal.length === 0) {
      return res
        .status(202)
        .json({
          message: "No referal found on this JobOrderNumber",
          status: "error",
        });
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
    let result = Number.replace(/\s+/g, "");
    const checkClient = await RegisterClientDetails.findOne({
      PhoneNumber: result,
    });

    const checkReferal = await ReferalSchema.findOne({
      Number: result,
    });
    if (checkClient) {
      return res
        .status(200)
        .json({ message: "Lift is already installed on this number" });
    }

    if (checkReferal) {
      return res
        .status(200)
        .json({ message: "Referal for this number already exists" });
    }

    const Referal = await ReferalSchema.create({
      jobOrderNumber,
      Name,
      Number: result,
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
    console.log("nulaa", client)

    if (!client || client.Password !== password) {
      return res.status(200).json({ message: "Invalid Credentials" });
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
      return res
        .status(200)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const token = generateToken({ Number });
    res.status(200).json({
      status: "success",
      message: "You are logged in Successfully",
      client,
      token,
    });
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
      SOSRequestId,
      SoSRequestStatus
    } = req.body;

    if (SOSRequestId && SoSRequestStatus) {
      await SoSRequestsTable.findByIdAndUpdate({ _id: SOSRequestId }, {
        status: "falseAlarm", isDead: true
      })
    }

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

    // console.log("888888888888", newCallback)

    res.status(201).json({
      message: "Immediate Visit Request Raised Successfully",
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

    console.log(
      "---------------------------------------------899999999999999999999",
      req.body
    );

    const newRequest = await serviceRequest.create({
      JobOrderNumber,
      RequestId,
      RequestDate,
      RequestTime,
      TypeOfIssue,
      // Description,
    });
    res.status(201).json({
      message: "Service Request Raised Successfully",
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

    const callbacks = await assignCallback.find({
      JobOrderNumber: JobOrderNumber,
      ServiceProcess: "completed",
    });

    const client = await RegisterClientDetails.findOne({ JobOrderNumber });

    if (!client) {
      return res.status(404).json({
        message: "No Client found for the Job OrderNumber",
      });
    }
    res.status(200).json({
      message: "Client found",
      client: client,
      callbacks,
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
const {
  createMemberShipOnTable,
} = require("../AdminController/AdminController");
const SoSRequests = require("../../Modals/SOSModels/SoSRequestModel");

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

    // console.log(`Rating`, req.body);

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
        "ServiceEnggId JobOrderNumber callbackId TypeOfIssue ServiceProcess Date"
      );

    const serviceRequestHistory = await assignService
      .find({ JobOrderNumber, ServiceProcess: "completed" })
      .select(
        "ServiceEnggId JobOrderNumber RequestId TypeOfIssue ServiceProcess Date"
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
        // console.log("entry.TypeOfIssue", entry.TypeOfIssue)
        return {
          ...entry._doc,
          Message: entry.TypeOfIssue + " issue was resolved",
          enggName: enggNameMap[entry.ServiceEnggId],
          paymentDetails:
            paymentDetails && paymentDetails.length > 0
              ? paymentDetails[0].paymentDetils
              : null,
          PaymentPrice:
            paymentDetails && paymentDetails.length > 0
              ? paymentDetails[0].TotalAmount
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



// module.exports.getCurrentScheduleService = async (req, res) => {
// to do -> middlaware implemented
// try {
//   const { JobOrderNumber } = req.params;

//   const currentDate = new Date().toLocaleDateString("en-GB");

//   const service = await serviceRequest.find({
//     JobOrderNumber,
//   });
//   const callback = await clientRequestCallback.find({
//     JobOrderNumber,
//   });

// console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{",service)
// console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",callback)

// const combineData = [...service , ...callback]
// console.log("*******************************", combineData)

// const filterData = combineData.filter((item) => !item.isDead)
// console.log("...............................", filterData)

// console.log("))))))))))))))",service);
// console.log("((((((((((((((((((",callback);

// let data = [];
// if (service.length > 0) {
//   data = await Promise.all(
//     service.map(async (item) => {
//       const resp = await assignService.find({
//         RequestId: item.RequestId,
//       });

//       return resp;

//     })
//   );
// } else if (callback.length > 0) {
//   data = await Promise.all(
//     callback.map(async (item) => {
//       const resp = await assignCallback.find({
//         callbackId: item.callbackId,
//       });
//       return resp;

//     })
//   );
// } else {
//   return res.status(200).json({
//     status: "complete",
//     message: "Schedule Your Service Preet",
//     time: null,
//     date: null,
//     liveTracking: false,
//     rating: false,
//   });
// }

// if ( data[0].length === 0 && (service[0]?.isAssigned === false || callback[0]?.isAssigned === false) && filterData.length) {
//   return res.status(200).json({
//     status: "success",
//     message: "service Booked",
//     time: null,
//     date: null,
//     liveTracking: false,
//     rating: false,
//   });
// }

// const rating = await engineerRating.findOne({
//   ServiceId: data[0][0].RequestId || data[0][0].callbackId,
// });
// // first case 1:
// if (
//   (service[0]?.isAssigned === false || callback[0]?.isAssigned === false) &&
// !rating &&
//   filterData.length > 0 &&
//   data[0][0].ServiceProcess === "InCompleted"
// ) {
//   res.status(200).json({
//     status: "success",
//     message: "service Booked",
//     time: null,
//     date: null,
//     liveTracking: false,
//     rating: false,
//   });
// }
// else if (
//   (service[0]?.isAssigned === true || callback[0]?.isAssigned === true) && (service[0]?.isDead === false || callback[0]?.isDead === false ) && !rating || filterData.length > 0 && data[0][0].ServiceProcess === "InCompleted" ) {
//case 2:
//   res.status(200).json({
//     status: "success",
//     message:
//       currentDate === data[0][0].Date
//         ? `Service Today at ${convertTo12HourFormat(
//           data[0][0].Slot[0].split("-")[0]
//         )}`
//         : currentDate > data[0][0].Date
//           ? "Service Expired"
//           : "Service Booked",
//     time:
//       currentDate > data[0][0].Date
//         ? "(Awaiting Cancelation)"
//         : convertTo12HourFormat(data[0][0].Slot[0].split("-")[0]) +
//         "-" +
//         convertTo12HourFormat(data[0][0].Slot[0].split("-")[1]),
//     date: data[0][0].Date,
//     trackingId: data[0][0]?.callbackId || data[0][0]?.RequestId,
//     liveTracking: currentDate === data[0][0].Date ? true : false,
//     rating: false,
//   });
// } else if (
//   ((service[0]?.isAssigned === true || callback[0]?.isAssigned === true) && (service[0]?.isDead === true || callback[0]?.isDead === true ), filterData.length === 0 && data[0][0].ServiceProcess === "completed" )
// ) {

// console.log("this is or data --------", data)

//case 3
//       res.status(200).json({
//         status: "success",
//         message: "Service Completed s",
//         time: data[0][0].Slot,
//         date: data[0][0].Date,
//         liveTracking: false,
//         rating: true, // add Enggid and ServiceId  ----------------------------------------------------------
//         enggId: data[0][0]?.ServiceEnggId,
//         trackingId: data[0][0]?.RequestId || data[0][0]?.callbackId,
//       });
//     } else {
//       return res.status(200).json({
//         status: "complete",
//         message: "Schedule your service POO",
//         time: null,
//         date: null,
//         liveTracking: false,
//         rating: false,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ error: "Error while fetching current active client service" });
//   }
// };

// *********************************** rebuild API for tracking location  ********************************************************

const convertTo12HourFormat = (time24) => {
  let [hours, minutes] = time24.split(":");
  hours = parseInt(hours, 10);
  const ampm = time24.split(":")[0] >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
};


const convertTo12HourFormatScheduleService = (time24) => {
  let [hours, minutes] = time24.split(":");
  hours = parseInt(hours, 10);
  const caluclatedHour = parseInt(time24.split(":")[0])
  let ampm;
  if (caluclatedHour >= 9 && caluclatedHour <= 12) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }





  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
}


module.exports.getCurrentScheduleService = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const currentDate = new Date().toLocaleDateString("en-GB");

    const service = await serviceRequest.find({
      JobOrderNumber,
      isDead: false,
    });
    const callback = await clientRequestCallback.find({
      JobOrderNumber,
      isDead: false,
    });

    const combineData = [...service, ...callback];

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
    }

    const lastcallback = await assignCallback
      .findOne({ JobOrderNumber, ServiceProcess: "completed" })
      .sort({ _id: -1 });
    const lastService = await assignService
      .findOne({ JobOrderNumber, ServiceProcess: "completed" })
      .sort({ _id: -1 });

    // If both are present, return the one with the most recent 'createdAt' date
    // Determine the most recent service or callback
    let latestRecord;
    if (lastcallback && lastService) {
      latestRecord =
        lastcallback.createdAt > lastService.createdAt
          ? lastcallback
          : lastService;
    } else if (lastcallback) {
      latestRecord = lastcallback;
    } else if (lastService) {
      latestRecord = lastService;
    }

    const ratingAvailable = await engineerRating.findOne({
      ServiceId: latestRecord && (latestRecord.callbackId || latestRecord.RequestId),
    });


    // Handle case if no records are found
    if (!latestRecord && combineData.length === 0) {
      return res.status(200).json({
        status: "complete",
        message: "Schedule Your Service",
        time: null,
        date: null,
        liveTracking: false,
        rating: false,
      });
    }

    if (!ratingAvailable && combineData.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Service Completed",
        time: latestRecord.Slot,
        date: latestRecord.Date,
        liveTracking: false,
        rating: true,
        enggId: latestRecord?.ServiceEnggId,
        trackingId: latestRecord?.RequestId || latestRecord?.callbackId,
      });
    }



    if (combineData[0]?.isAssigned === false) {
      return res.status(200).json({
        status: "success",
        message: "Service Booked",
        time: null,
        date: null,
        liveTracking: false,
        rating: false,
      });
    }

    const rating = await engineerRating.findOne({
      ServiceId: combineData[0]?.RequestId || combineData[0]?.callbackId,
    });
    // // first case 1:
    if (combineData[0]?.isAssigned === false && !rating) {
      res.status(200).json({
        status: "success",
        message: "Service Booked",
        time: null,
        date: null,
        liveTracking: false,
        rating: false,
      });
    }
    //case 2
    else if (
      combineData[0]?.isAssigned === true &&
      combineData[0]?.isDead === false &&
      data[0][0].ServiceProcess === "InCompleted"
    ) {
      res.status(200).json({
        status: "success",
        message:
          currentDate === data[0][0].Date ? `Service Today at ${convertTo12HourFormatScheduleService(data[0][0].Slot[0].split("-")[0])}` : currentDate > data[0][0].Date ? "Service Expired" : "Service Booked", time:
          currentDate > data[0][0].Date ? "(Awaiting Cancelation)" : convertTo12HourFormat(data[0][0].Slot[0].split("-")[0]) + "-" + convertTo12HourFormat(data[0][0].Slot[0].split("-")[1]),
        date: data[0][0].Date,
        trackingId: data[0][0]?.callbackId || data[0][0]?.RequestId,
        liveTracking: currentDate === data[0][0].Date ? true : false,
        rating: false,
      });
    } else {
      return res.status(200).json({
        status: "complete",
        message: "Schedule Your Service",
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

// *********************************** rebuild API for tracking location  ********************************************************

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//api to get steps and engg deatil for tracker in client application...

module.exports.getStepsAndEnggDetail = async (req, res) => {
  try {
    const { trackerId } = req.params;

    const getData = await ReportTable.findOne({ serviceId: trackerId });

    const enggDetails = await ServiceEnggBasicSchema.findOne({
      EnggId: getData.EnggId,
    });

    let data = [];

    const resp = await assignService.findOne({
      RequestId: trackerId,
    });
    const resp1 = await assignCallback.findOne({
      callbackId: trackerId,
    });

    if (resp && resp != null && resp != undefined) {
      data = resp;
    } else if (resp1 && resp1 != null && resp1 != undefined) {
      data = resp1;
    }

    console.log(data);

    function processSlots(slots) {
      if (slots.length === 1) {
        return [slots[0]];
      } else if (slots.length > 1) {
        const startTime = slots[0].split("-")[0];
        const endTime = slots[slots.length - 1].split("-")[1];
        return [`${startTime}-${endTime}`];
      }
      return "";
    }

    const calucalteTime = processSlots(data.Slot);
    console.log("Calculating", calucalteTime);

    const responsedata = {
      enggname: enggDetails.EnggName,
      enggId: getData.EnggId,
      enggImage: enggDetails.EnggPhoto,
      enggPhone: enggDetails.PhoneNumber,
      slot:
        convertTo12HourFormat(calucalteTime[0].split("-")[0]) +
        "-" +
        convertTo12HourFormat(calucalteTime[0].split("-")[1]),
    };

    res.status(200).json({
      status: "success",
      steps: getData.Steps,
      EnggDetails: responsedata,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error while fetching current active client service" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------
//razor pay API  client can purchase memebership...

module.exports.clientPayment = async (req, res) => {
  try {
    const { amount, currency, JON, MembershipType, Discount } = req.body;

    console.log("MembershipType", req.body);

    if (!amount || !currency) {
      return res
        .status(400)
        .json({ message: "Amount and currency are required." });
    }
    const receipt = JON || "receipt#1";

    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const order = await instance.orders.create({
      amount: amount,
      currency: currency,
      receipt: receipt,
      partial_payment: false,
    });

    // console.log("================", order.id); //save in Membership Table

    if (order.statusCode === 400) {
      return res
        .status(400)
        .json({ message: "Something Went Wrong", data: order });
    }

    const clientData = await RegisterClientDetails.findOne({
      JobOrderNumber: JON,
    });

    if (!clientData) {
      return res.status(404).json({
        error: "Client not found",
      });
    }
    // Update client membership type
    clientData.MembershipType = MembershipType;
    await clientData.save();

    const startDate = new Date();
    const EndDate = new Date(startDate.setMonth(startDate.getMonth() + 12));
    await memberShipDetails.create({
      JobOrderNumber: JON,
      MembershipType,
      StartDate: new Date(),
      EndDate,
      Discount,
      PricePaid: amount,
      OrderId: order.id,
      MembershipInvoice: "MembershipInvoice.pdf",
    });

    return res
      .status(200)
      .json({ message: "Order created successfully", data: order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error enggPayment" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------
//controller to handle check Payment status Through Order_Id and Make Pdf(Membership Invoice)
const caluclateMembershipPriceAndTime = async (
  MembershipData,
  updateMembership
) => {
  const LastSecondCount = MembershipData[MembershipData.length - 2];
  if (new Date(LastSecondCount.EndDate) < Date.now()) {
    const dataExpires = await memberShipDetails.findOneAndUpdate(
      { OrderId: LastSecondCount.OrderId },
      { isDisable: true }
    );
    return 0;
  }
  const differenceInDays = new Date(LastSecondCount.EndDate) - Date.now();
  const dateDifference = Math.floor(differenceInDays / (1000 * 60 * 60 * 24));

  const MembershipPriceData = await createMemberShipOnTables.findOne({
    MembershipName:
      LastSecondCount.MembershipType === "warrenty"
        ? "platinum"
        : LastSecondCount.MembershipType,
  });

  const PriviousMembershipPrice =
    (MembershipPriceData.MembershipPrice / 365) * dateDifference; //previous membership price

  const appliedMembership = await createMemberShipOnTables.findOne({
    MembershipName: updateMembership.MembershipType,
  });

  const appliedMembershipPriceDaysToBeAdded =
    PriviousMembershipPrice / (appliedMembership.MembershipPrice / 365);

  console.log(
    "this is applied membership",
    appliedMembershipPriceDaysToBeAdded
  );

  return appliedMembershipPriceDaysToBeAdded;
};

module.exports.checkPaymentStatusAndMakeInvoice = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const MembershipData = await memberShipDetails.find({ JobOrderNumber });

    console.log("this is membership data --->> ", MembershipData)  //......................//TODO: add condition to whether membership is not already present ............................................

    const Details = MembershipData[MembershipData.length - 1];

    if (Details.IsPaid === true) {
      const data = {
        MembershipType: Details.MembershipType,
        EndDate: Details.EndDate,
        PricePaid: Details.PricePaid,
        MembershipInvoice: Details.MembershipInvoice,
      };
      return res.status(200).json({ status: "success", Details: data });
    }

    // when order id "1" evaluate the conditions
    if (Details.OrderId === "1") {
      const updateMembershipData = await memberShipDetails.findOneAndUpdate(
        {
          _id: Details._id,
        },
        {
          IsPaid: true,
        }
      );

      const DaysToBeAdded = await caluclateMembershipPriceAndTime(
        MembershipData,
        updateMembershipData
      );

      console.log("my days", DaysToBeAdded);

      let newDate = new Date();
      newDate.setDate(newDate.getDate() + 365 + DaysToBeAdded);

      const finalPurchase = await memberShipDetails.findOneAndUpdate(
        { _id: Details._id },
        { EndDate: newDate }
      );

      const data = {
        MembershipType: Details.MembershipType,
        EndDate: Details.EndDate,
        PricePaid: Details.PricePaid,
        MembershipInvoice: Details.MembershipInvoice,
      };

      return res.status(200).json({ status: "success", Details: data });
    }

    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const order = await instance.orders.fetch(Details.OrderId);

    if (order.status === "paid") {
      const updateMembership = await memberShipDetails.findOneAndUpdate(
        { OrderId: Details.OrderId },
        { IsPaid: true }
      );

      const DaysToBeAdded = await caluclateMembershipPriceAndTime(
        MembershipData,
        updateMembership
      );
      let newDate = new Date();
      newDate.setDate(newDate.getDate() + 365 + DaysToBeAdded);
      const finalPurchase = await memberShipDetails.findOneAndUpdate(
        { OrderId: Details.OrderId },
        { EndDate: newDate }
      );
      const data = {
        MembershipType: finalPurchase.MembershipType,
        EndDate: finalPurchase.EndDate,
        PricePaid: finalPurchase.PricePaid,
        MembershipInvoice: finalPurchase.MembershipInvoice,
      };

      const ClientData = await RegisterClientDetails.find({ JobOrderNumber });
      const appliedMembership = await createMemberShipOnTables.findOne({
        MembershipName: finalPurchase.MembershipType,
      });

      const billData = {
        ClientData,
        finalPurchase,
        appliedMembership,
      };

      const fileName = `membershipInvoice${JobOrderNumber}${new Date().getTime()}.pdf`;
      const htmlFilePath = await pdfFormat(billData);
      (options = {
        height: "1200px",
        width: "850px",
        format: "A4",
      }),
        htmlpdf
          .create(htmlFilePath, options)
          .toFile(
            path.join(
              process.cwd(),
              `./public/MembershipInvoice/MembershipBillReport/${fileName}`
            ),
            function (err, res) {
              // to do chage file path
              if (err) return console.error(err);
              console.log(res);
            }
          );

      await memberShipDetails.findOneAndUpdate(
        { OrderId: Details.OrderId },
        { MembershipInvoice: fileName }
      );

      return res.status(200).json({
        status: "success",
        Details: data,
      });
    } else {
      await memberShipDetails.findOneAndDelete({ OrderId: Details.OrderId });

      const Detail = MembershipData[MembershipData.length - 1];
      const data = {
        MembershipType: Detail.MembershipType,
        EndDate: Detail.EndDate,
        PricePaid: Detail.PricePaid,
        MembershipInvoice: Detail.MembershipInvoice,
      };
      return res.status(200).json({ status: "success", Details: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------

//-------------------- controller to get membership data includes Price and Featues Details ------------------------------------
module.exports.getMembershipFeatuesDetails = async (req, res) => {
  try {
    const membershipData = await createMemberShipOnTables.find({});

    return res.status(201).json({
      membershipData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while fetching membership data",
    });
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------- controller to get Membership Discount --------------------------------

module.exports.getMembershipDiscount = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const clientData = await RegisterClientDetails.findOne({
      JobOrderNumber,
    }).select("MembershipDiscount");

    return res.status(201).json({
      clientData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while fetching membership Discount",
    });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------

//register firebase token for Push Notification Purpose

// Define the tokens array

// Define and export the function
module.exports.firebaseTokenForPushNotificationPurpose = async (req, res) => {
  try {
    const { userId, firebaseToken } = req.body;

    // console.log("------------------->", userId, firebaseToken);

    const splitedData = userId.split("@")[0];
    const splitedData1 = userId.split("@")[1];

    // console.log("--------------->", splitedData, splitedData1);

    let clientToken;
    let enggToken;

    if (splitedData === "client") {
      clientToken = await RegisterClientDetails.findOneAndUpdate(
        { JobOrderNumber: splitedData1 },
        { firebaseToken }
      );
    } else if (splitedData === "engg") {
      enggToken = await ServiceEnggBasicSchema.findOneAndUpdate(
        { EnggId: splitedData1 },
        { firebaseToken }
      );
    }

    res
      .status(200)
      .json({ message: "Token added successfully", status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while savinf firebase notification token",
    });
  }
};

module.exports.updateClientProfile = async (req, res) => {
  try {
    const { JobOrderNumber, name, emailAddress, phone, password } = req.body;
    const profile = req.files;

    if (!JobOrderNumber && !name && !emailAddress && !phone) {
      return res.status(400).json({
        success: false,
        message: "Profile updation failed due to missing fields",
      });
    }

    if (profile.length > 0) {
      await RegisterClientDetails.findOneAndUpdate(
        {
          JobOrderNumber,
        },
        {
          name,
          PhoneNumber: phone,
          ProfileImage: profile[0].filename,
          Password: password,
          emailAddress,
        }
      );
    } else {
      await RegisterClientDetails.findOneAndUpdate(
        {
          JobOrderNumber,
        },
        {
          name,
          PhoneNumber: phone,
          Password: password,
          emailAddress,
        }
      );
    }

    await RegisteredElevatorForm.findOneAndUpdate(
      {
        "clientFormDetails.jon": JobOrderNumber,
      },
      {
        "clientFormDetails.userName": name,
        "clientFormDetails.phoneNumber": phone,
        "clientFormDetails.email": emailAddress,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//-----------------------------------------------------------------------------------------------------------
// delete firebase token of client on logout --- Abhishek
module.exports.removeClientFirebaseToken = async (req, res) => {
  try {
    const { jobOrderNumber } = req.query;

    await RegisterClientDetails.findOneAndUpdate(
      { JobOrderNumber: jobOrderNumber },
      { firebaseToken: "" }
    );
    console.log("success");
    res.status(201).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Enggineer can cancelled Previous  service or callback request ---------------------------------------------------------------

module.exports.EnginnerCancellPreviousServiceOrCallbackRequest = async (
  req,
  res
) => {
  try {
    const { serviceId, description } = req.body;

    if (!serviceId && !description) {
      return res
        .status(400)
        .json({ message: "serviceId and description are required" });
    }

    const cancelledServiceRequest = await assignService.findOne({
      RequestId: serviceId,
    });
    const cancelledCallbackRequest = await assignCallback.findOne({
      callbackId: serviceId,
    });

    if (!cancelledServiceRequest && !cancelledCallbackRequest) {
      return res
        .status(404)
        .json({ message: "Service or Callback Request not found" });
    }

    await ReportTable.findOneAndUpdate(
      { serviceId: serviceId },
      { isVerify: true, isActive: false }
    );

    if (cancelledServiceRequest) {
      await Promise.all([
        assignService.findOneAndUpdate(
          { RequestId: serviceId },
          { ServiceProcess: "cancelled", cancelDescription: description }
        ),
        serviceRequest.findOneAndUpdate(
          { RequestId: serviceId },
          { isCancelled: true }
        ),
      ]);
    } else if (cancelledCallbackRequest) {
      await Promise.all([
        assignCallback.findOneAndUpdate(
          { callbackId: serviceId },
          { ServiceProcess: "cancelled", cancelDescription: description }
        ),
        clientRequestCallback.findOneAndUpdate(
          { callbackId: serviceId },
          { isCancelled: true }
        ),
      ]);
    } else {
      return res
        .status(404)
        .json({ message: "Service or Callback Request not found" });
    }

    res.status(200).json({ message: "Request Cancelled successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error while cancelling the request" });
  }
};

// -------------------------------------------------------------------------------------------------------------------------
//api to get cancelled requests by the clients

module.exports.getCallbackOrServiceCancelledRequests = async (req, res) => {
  try {
    const cancelledRequests = await assignService.find({
      ServiceProcess: "cancelled",
    });
    const cancelledCallback = await assignCallback.find({
      ServiceProcess: "cancelled",
    });

    if (cancelledRequests.length === 0 && cancelledCallback.length === 0) {
      return res.status(200).json({ message: "No cancelled requests found" });
    }

    const combinedRequestData = [...cancelledRequests, ...cancelledCallback];

    res.status(200).json({ cancelledRequests: combinedRequestData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Internal server error while fething cancelling the request",
      });
  }
};

//----------------------------------------------------------------------------------------------------------------------------------------

//resume previous service API by The Enggineer

module.exports.resumePreviousService = async (req, res) => {
  try {
    const { serviceId } = req.body;

    const currentDate = new Date();
    const todayDate = currentDate.toLocaleDateString("en-GB");

    const serviceRequests = await assignService.findOne({
      RequestId: serviceId,
    });
    const serviceCallback = await assignCallback.findOne({
      callbackId: serviceId,
    });

    if (serviceRequests) {
      await assignService.findOneAndUpdate(
        { RequestId: serviceId },
        { Date: todayDate, ServiceProcess: "InCompleted" }
      );
    } else if (serviceCallback) {
      await assignCallback.findOneAndUpdate(
        { callbackId: serviceId },
        { Date: todayDate, ServiceProcess: "InCompleted" }
      );
    } else {
      return res
        .status(404)
        .json({ message: "Service or Callback Request not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "service/callback updated successfully",
      });
  } catch (error) {
    console.log("error while resuming engg service", error);
  }
};

// ----------------{armaan-dev}--------------------------------------
module.exports.sosRequest = async (req, res) => {
  try {
    const { jon, desc } = req.body;
    const clientCount = await RegisterClientDetails.findOne({
      JobOrderNumber: jon,
    });

    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    console.log(clientCount.sosCallCount);
    const data = {
      jon,
      desc,
      time,
      date,
      address: clientCount.Address,
      membership: clientCount.MembershipType,
      SoSCallCount: clientCount.sosCallCount,
      name: clientCount.name,
    };

    const createdSoSRequest = await SoSRequestsTable.create(data);

    res.status(200).json({
      createdSoSRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

// ----------------{armaan-dev}--------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------
