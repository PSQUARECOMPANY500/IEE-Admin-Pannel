const ServiceAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const AssignSecheduleRequest = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const getAllServiceRequest = require("../../Modals/ServicesModal/ClientServicesRequest");

const getAllCalbacks = require("../../Modals/ServicesModal/ClinetCallback");

const clientDetailSchema = require("../../Modals/ClientDetailModals/RegisterClientDetailSchema");

const ServiceEnggData = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const ChecklistModal = require("../../Modals/ChecklistModal/ChecklistModal");

const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const AssignMemeberships = require("../../Modals/MemebershipModal/MembershipsSchema");

const ReferalSchema = require("../../Modals/ClientDetailModals/ClientReferalSchema");

const mongoose = require("mongoose");

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get current date Assign Service Detail
module.exports.getCurrentDateAssignServiceRequest = async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString("en-GB");
    const currentDetailServiceRequest = await AssignSecheduleRequest.find({
      Date: currentDate,
    });

    if (currentDetailServiceRequest.length === 0) {
      return res
        .status(400)
        .json({ message: "no Service Request for today's" });
    }

    const serviceRequestDetail = await Promise.all(
      currentDetailServiceRequest.map(async (item) => {
        const enggDetail = await ServiceEnggData.findOne({
          EnggId: item.ServiceEnggId,
        });
        const clientDetail = await clientDetailSchema.findOne({
          JobOrderNumber: item.JobOrderNumber,
        });

        //extract only specific field

        const enggName = enggDetail ? enggDetail.EnggName : null;
        const clientName = clientDetail ? clientDetail.name : null;

        return { ...item._doc, enggName, clientName };
      })
    );
    return res.status(200).json({ serviceRequestDetail });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get AssignCallbackDetail of current date
module.exports.getCurrentDateAssignCallback = async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString("en-GB");
    const currentDetailCallback = await ServiceAssigntoEngg.find({
      Date: currentDate,
    });

    if (currentDetailCallback.length === 0) {
      return res.status(400).json({ message: "no callback for today's" });
    }

    const callbackWithDetails = await Promise.all(
      currentDetailCallback.map(async (item) => {
        const enggDetail = await ServiceEnggData.findOne({
          EnggId: item.ServiceEnggId,
        });
        const clientdetail = await clientDetailSchema.findOne({
          JobOrderNumber: item.JobOrderNumber,
        });

        // Extract only specific fields from enggDetail and clientDetail
        const enggName = enggDetail ? enggDetail.EnggName : null;
        const clientName = clientdetail ? clientdetail.name : null;

        return { ...item._doc, enggName, clientName };
      })
    );
    return res.status(200).json({ callbackWithDetails });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle getAllAssignCallbacks (as used in ticket section)

module.exports.getAllAssignCallbacks = async (req, res) => {
  try {
    const allAssignCallbacks = await ServiceAssigntoEngg.find({});
    if (!allAssignCallbacks || allAssignCallbacks.length === 0) {
      return res.status(400).json({ message: "No callback" });
    }
    return res.status(200).json({ allAssignCallbacks });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//functio to handle get all Referals for admin
module.exports.getAllreferals = async (req, res) => {
  try {
    const allReferals = await ReferalSchema.find({});
    return res.status(200).json({
      message: "All referals fetched Successfully",
      Referals: allReferals,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//function to handle get ALL Aassign service request by admin from the assignserviceRequestTable

module.exports.getAllAssignServiceRequest = async (req, res) => {
  try {
    const assignServicerequest = await AssignSecheduleRequest.find();

    // Get all unique JobOrderNumbers and AllotAChecklist ids
    const jobOrderNumbers = assignServicerequest.map(
      (request) => request.JobOrderNumber
    );
    const allotAChecklistIds = assignServicerequest.map(
      (request) => request.AllotAChecklist
    );
    const uniqueJobOrderNumbers = Array.from(new Set(jobOrderNumbers));
    const uniqueAllotAChecklistIds = Array.from(new Set(allotAChecklistIds));

    // Fetch client details for each unique JobOrderNumber
    const clientDetails = await clientDetailSchema.find({
      JobOrderNumber: { $in: uniqueJobOrderNumbers },
    });

    // Fetch checklist details for each unique AllotAChecklist id
    const checklistDetails = await ChecklistModal.find({
      _id: { $in: uniqueAllotAChecklistIds },
    });

    // Create a map for quick access to client and checklist details
    const clientMap = {};
    clientDetails.forEach((client) => {
      clientMap[client.JobOrderNumber] = client;
    });

    const checklistMap = {};
    checklistDetails.forEach((checklist) => {
      checklistMap[checklist._id] = checklist;
    });

    // Combine assign service requests with client and checklist details
    const clientdetailsEmbeded = assignServicerequest.map((request) => ({
      ...request._doc,
      clientDetail: clientMap[request.JobOrderNumber] || null,
      checklistDetail: checklistMap[request.AllotAChecklist] || null,
    }));

    res.status(200).json({
      message: "Fetch All Assign Service Request successfully",
      clientdetailsEmbeded,
    });
  } catch (error) {
    console.error("Error creating engg detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// function to handle get all engg Detail by Id
module.exports.getEnggDetail = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const enggDetail = await ServiceEnggBasicSchema.findOne({ EnggId });

    if (!enggDetail) {
      return res.status(404).json({
        message: "No services Engg found for the specified Service Engineer ID",
      });
    }

    res.status(200).json({
      message: "servicesc Engg retrieved by ID successfully",
      enggDetail,
    });
  } catch (error) {
    console.error("Error creating engg detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle insert data in the { checkList }
module.exports.createCheckList = async (req, res) => {
  try {
    const { checklistName, subcategories } = req.body;

    const newCheckList = await ChecklistModal.create({
      checklistName,
      subcategories,
    });
    res.status(201).json({
      message: "Checklist created successfully",
      checklist: newCheckList,
    });
  } catch (error) {
    console.error("Error creating checklist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//fucntion to get the checklist
module.exports.getAllChecklist = async (req, res) => {
  try {
    const checklist = await ChecklistModal.find({});

    res
      .status(200)
      .json({ message: "fetch checklist sucessfully", Checklists: checklist });
  } catch (error) {
    console.error("Error while getting checklist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle   (assign callbacks to Engg)
module.exports.assignCallbacks = async (req, res) => {
  try {
    const {
      ServiceEnggId,
      JobOrderNumber,
      callbackId,
      AllotAChecklist,
      Slot,
      Date,
      Message,
      ServiceProcess,
    } = req.body;

    let callback;

    // Check if the callbackId already exists
    const existingCallback = await ServiceAssigntoEngg.findOne({ callbackId });

    if (existingCallback) {
      // Update existing data
      callback = await ServiceAssigntoEngg.findOneAndUpdate(
        { callbackId },
        {
          ServiceEnggId,
          JobOrderNumber,
          AllotAChecklist,
          Slot,
          Date,
          Message,
          ServiceProcess,
        },
        { new: true } // Return the updated document
      );
    } else {
      // Create a new entry
      callback = await ServiceAssigntoEngg.create({
        ServiceEnggId,
        JobOrderNumber,
        callbackId,
        AllotAChecklist,
        Slot,
        Date,
        Message,
        ServiceProcess,
      });
    }

    const populatedCallback = await ServiceAssigntoEngg.findById(callback._id)
      .populate("AllotAChecklist")
      .exec();

    res.status(201).json({
      message: "callback Assign Succesfully",
      callback: populatedCallback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to assign requests from the client
module.exports.AssignServiceRequests = async (req, res) => {
  try {
    const {
      ServiceEnggId,
      JobOrderNumber,
      RequestId,
      AllotAChecklist,
      Slot,
      Date,
      Message,
      ServiceProcess,
    } = req.body;

    let callback;

    const existingCallback = await AssignSecheduleRequest.findOne({
      RequestId,
    });

    if (existingCallback) {
      callback = await AssignSecheduleRequest.findOneAndUpdate(
        { RequestId },
        {
          ServiceEnggId,
          JobOrderNumber,
          AllotAChecklist,
          Slot,
          Date,
          Message,
          ServiceProcess,
        },
        { new: true }
      );
    } else {
      callback = await AssignSecheduleRequest.create({
        ServiceEnggId,
        JobOrderNumber,
        RequestId,
        AllotAChecklist,
        Slot,
        Date,
        Message,
        ServiceProcess,
      });
    }

    const populatedService = await AssignSecheduleRequest.findById(Request._id)
      .populate("AllotAChecklist")
      .exec();

    res.status(201).json({
      message: "service Request Assign Succesfully",
      Request: populatedService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to get all the callbacks
module.exports.getAllCallbacks = async (req, res) => {
  try {
    const callBackRequests = await getAllCalbacks.find();

    //fetch extra client detail
    const clientCallbacksDetails = await Promise.all(
      callBackRequests.map(async (callback) => {
        const clientDetail = await clientDetailSchema.findOne({
          JobOrderNumber: callback.JobOrderNumber,
        });
        return {
          ...callback._doc,
          clientDetail: clientDetail,
        };
      })
    );

    res.status(200).json({
      message: "all callBack fetched Succesfully",
      Callbacks: clientCallbacksDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to get all the Requests
module.exports.getAllRequests = async (req, res) => {
  try {
    const serviceRequests = await getAllServiceRequest.find();

    const clientRequestDetail = await Promise.all(
      serviceRequests.map(async (Requests) => {
        const clientDetail = await clientDetailSchema.findOne({
          JobOrderNumber: Requests.JobOrderNumber,
        });
        return {
          ...Requests._doc,
          clientDetail: clientDetail,
        };
      })
    );

    res.status(200).json({
      message: "all services Requests fetched Succesfully",
      ServiceRequest: clientRequestDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Function to handle get Callbackdetail By CallbackId
module.exports.getCallbackDetailByCallbackId = async (req, res) => {
  try {
    const { callbackId } = req.params;

    const clientCallbacksDetails = await getAllCalbacks.findOne({ callbackId });

    // console.log("HE",clientCallbacksDetails)

    if (!clientCallbacksDetails) {
      res.status(404).json({ message: "no data found with this callback id" });
    }

    const clientDetail = await clientDetailSchema.findOne({
      JobOrderNumber: clientCallbacksDetails.JobOrderNumber,
    });
    console.log("HE", clientCallbacksDetails.JobOrderNumber);

    const callbackClientdetails = {
      ...clientCallbacksDetails._doc,
      clientDetail: clientDetail,
    };

    res.status(200).json({
      message: "all detal fetched successfully",
      callback: callbackClientdetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Function to handle get Request detail By RequestId
module.exports.getRequestDetailByRequestId = async (req, res) => {
  try {
    const { RequestId } = req.params;

    const clientRequestDetails = await getAllServiceRequest.findOne({
      RequestId,
    });
    // console.log("clientRequestDetails",clientRequestDetails)
    if (!clientRequestDetails) {
      res.status(404).json({ message: "no data found with this Request id" });
    }

    const clientDetail = await clientDetailSchema.findOne({
      JobOrderNumber: clientRequestDetails.JobOrderNumber,
    });
    // console.log("HE",clientCallbacksDetails.JobOrderNumber)

    const RequestClientdetails = {
      ...clientRequestDetails._doc,
      clientDetail: clientDetail,
    };

    res.status(200).json({
      message: "all detal fetched successfully",
      request: RequestClientdetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// get All Clients

//function to handle GetAllClients infromation
module.exports.getAllClientsData = async (req, res) => {
  try {
    const clients = await clientDetailSchema.find();
    res.status(200).json({
      message: "all  Clients fetched Succesfully",
      Clients: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// get All serviceEnggeniers

//function to handle getAllserviceEngg Details

module.exports.getAllServiceEnggData = async (req, res) => {
  try {
    const serviceEngg = await ServiceEnggData.find();
    res.status(200).json({
      message: "all  ServiceEngg fetched Succesfully",
      ServiceEngg: serviceEngg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// function to handle getAssign Callback By CallbackId
module.exports.getAssignCallbackByCallbackId = async (req, res) => {
  try {
    const { callbackId } = req.params;

    const callbackDetail = await ServiceAssigntoEngg.findOne({ callbackId });
    if (!callbackDetail) {
      return res.status(404).json({ error: "Callback not found" });
    }

    const serviceEnggDetail = await ServiceEnggData.findOne({
      EnggId: callbackDetail.ServiceEnggId,
    });
    if (!serviceEnggDetail) {
      return res
        .status(404)
        .json({ error: "Service Engineer details not found" });
    }
    const checkList = await ChecklistModal.findOne({
      _id: callbackDetail.AllotAChecklist,
    });

    if (!checkList) {
      return res.status(404).json({ error: "Checklist not found" });
    }
    const callbackdetails = {
      ...callbackDetail._doc,
      serviceEnggDetail: serviceEnggDetail,
      checkList: checkList,
    };

    res.status(200).json({ callbackdetails: callbackdetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function to handle get Assign service request By ServiceId
module.exports.getAssignServiceRequestByServiceRequestId = async (req, res) => {
  try {
    const { RequestId } = req.params;

    const RequestDetail = await AssignSecheduleRequest.findOne({ RequestId });
    if (!RequestDetail) {
      return res.status(404).json({ error: "Request not found" });
    }

    const serviceEnggDetail = await ServiceEnggData.findOne({
      EnggId: RequestDetail.ServiceEnggId,
    });
    if (!serviceEnggDetail) {
      return res
        .status(404)
        .json({ error: "Service Engineer details not found" });
    }
    const checkList = await ChecklistModal.findOne({
      _id: RequestDetail.AllotAChecklist,
    });

    if (!checkList) {
      return res.status(404).json({ error: "Checklist not found" });
    }
    const callbackdetails = {
      ...RequestDetail._doc,
      serviceEnggDetail: serviceEnggDetail,
      checkList: checkList,
    };

    res.status(200).json({ details: callbackdetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// {armaan-dev}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function to handle create client memenership

module.exports.createClientMemebership = async (req, res) => {
  try {
    const {
      JobOrderNumber,
      MemebershipType,
      StartDate,
      Duration,
      Discount,
      PricePaid,
      isRenewed,
      isExpired,
      isDisable,
    } = req.body;

    const startDate = new Date(StartDate);
    const durationInMonths = Number(Duration);
    const EndDate = new Date(
      startDate.setMonth(startDate.getMonth() + durationInMonths)
    );

    const MemberShipDetails = await AssignMemeberships.create({
      JobOrderNumber,
      MemebershipType,
      StartDate: new Date(StartDate),
      EndDate,
      Duration,
      Discount,
      PricePaid,
      isRenewed,
      isExpired,
      isDisable,
    });

    res
      .status(201)
      .json({ message: "memebership created successfully", MemberShipDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ---------------------------------------------------------------------
// {armaan-dev}
// ---------------------------------------------------------------------
// {armaan-dev}

module.exports.getClientMembership = async (req, res) => {
  try {
    const { dataType, wanted, page, pageSize } = req.query;
    const membershipData = await AssignMemeberships.find();
    const filteredData = filterMembershipByType(membershipData, dataType);
    const skip = (page - 1) * pageSize;
    let clientData, totalExpiredPages, totalExpiringPages;

    switch (wanted) {
      case "expired":
        const expiredData = await calculateExpired(filteredData);
        totalExpiredPages = Math.ceil(expiredData.length / pageSize);
        const sortedExpiredData = expiredData.sort(
          (a, b) => b.EndDate - a.EndDate
        );
        clientData = sortedExpiredData.slice(skip, skip + pageSize);
        break;
      case "expiring":
        const expiringData = await calculateExpiring(filteredData);
        totalExpiringPages = Math.ceil(expiringData.length / pageSize);
        const sortedExpiringData = expiringData.sort(
          (a, b) => b.EndDate - a.EndDate
        );
        clientData = sortedExpiringData.slice(skip, skip + pageSize);
        break;
      default:
        return res
          .status(404)
          .json({ success: false, message: "Incorrect params" });
    }

    const clientDetails = await sentClientData(clientData);
    return res.status(201).json({
      totalPages: wanted === "expired" ? totalExpiredPages : totalExpiringPages,
      clientData: clientDetails,
      count: clientData.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sentClientData = async (data) => {
  const clientDetailPromises = data.map(async (item) => {
    const clientData = await clientDetailSchema.findOne({
      JobOrderNumber: item.JobOrderNumber,
    });
    return {
      JobOrderNumber: clientData.JobOrderNumber,
      name: clientData.name,
      address: clientData.Address,
      number: clientData.PhoneNumber,
    };
  });

  return Promise.all(clientDetailPromises);
};

const calculateExpiring = async (filteredData) => {
  const expiringData = await Promise.all(
    filteredData.map(async (data) => {
      const timeDifference = data.EndDate - Date.now();
      const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (daysLeft > 0 && daysLeft <= 30) {
        return data;
      }
    })
  );
  return expiringData.filter(Boolean);
};

const calculateExpired = async (filteredData) => {
  const expiredData = filteredData.filter((data) => data.EndDate < Date.now());
  return expiredData;
};

const filterMembershipByType = (data, type) => {
  return data.filter((member) => member.MemebershipType === type);
};

// {armaan-dev}
//-------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------
//function to get all booked dates {amit-features}

module.exports.getBookedDates = async (req, res) => {
  const timeSlots = [
    {
      slot: "9:00-10:00",
    },
    {
      slot: "10:00-11:00",
    },
    {
      slot: "11:00-12:00",
    },
    {
      slot: "12:00-13:00",
    },
    {
      slot: "13:00-14:00",
    },
    {
      slot: "14:00-15:00",
    },
    {
      slot: "15:00-16:00",
    },
    {
      slot: "16:00-17:00",
    },
    {
      slot: "17:00-18:00",
    },
  ];

  try {
    const data = await ServiceAssigntoEngg.find();

    const groupedDates = {};

    data.forEach((entry) => {
      if (!groupedDates[entry.Date]) {
        groupedDates[entry.Date] = {
          slots: [],
          isSlotAvailable: true,
        };
      }
      groupedDates[entry.Date].slots.push(entry.Slot);
    });

    Object.keys(groupedDates).forEach((date) => {
      const slotLength = groupedDates[date].slots.length;
      const allSlots = timeSlots.length;

      if (allSlots === slotLength) {
        groupedDates[date].isSlotAvailable = false;
      }
    });

    res.json(groupedDates);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};
// {armaan-dev}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Function to get membership data
module.exports.getMembershipDetails = async (req, res) => {
  try {
    const memberShipDetails = await AssignMemeberships.find();
    const dataTypes = ["warrenty", "platinum", "silver", "gold"];

    const responseData = await Promise.all(
      dataTypes.map(async (type) => {
        const filteredData = filterMembershipByType(memberShipDetails, type);
        return { dataType: type, details: calculateData(filteredData) };
      })
    );

    // Send responseData or do whatever you need with it
    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const calculateData = (data) => {
  let totalRevenue = 0;
  let count = 0;

  for (const d of data) {
    totalRevenue += parseFloat(d.PricePaid);

    // Check if membership is active based on start and end dates, and other conditions
    if (
      d.EndDate > Date.now() &&
      d.StartDate <= Date.now() &&
      !d.isDisable &&
      !d.isRenewed
    ) {
      count++;
    }
  }

  return { totalRevenue, count };
};

// Get client Details
module.exports.getClientDetail = async (req, res) => {
  try {
    const { JON } = req.params;
    const client = await clientDetailSchema.findOne({ JobOrderNumber: JON });

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
// {armaan-dev}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
