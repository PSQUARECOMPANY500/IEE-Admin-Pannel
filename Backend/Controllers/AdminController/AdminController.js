const ServiceAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const AssignSecheduleRequest = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const getAllServiceRequest = require("../../Modals/ServicesModal/ClientServicesRequest");

const getAllCalbacks = require("../../Modals/ServicesModal/ClinetCallback");

const clientDetailSchema = require("../../Modals/ClientDetailModals/RegisterClientDetailSchema");

const ServiceEnggData = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const ChecklistModal = require("../../Modals/ChecklistModal/ChecklistModal");

const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const AssignMemeberships = require("../../Modals/MemebershipModal/MembershipsSchema");

const mongoose = require("mongoose");

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

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

    const callback = await ServiceAssigntoEngg.create({
      ServiceEnggId,
      JobOrderNumber,
      callbackId,
      AllotAChecklist,
      Slot,
      Date,
      Message,
      ServiceProcess,
    });

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

    const Request = await AssignSecheduleRequest.create({
      ServiceEnggId,
      JobOrderNumber,
      RequestId,
      AllotAChecklist,
      Slot,
      Date,
      Message,
      ServiceProcess,
    });

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
    // console.log("HE",clientCallbacksDetails.JobOrderNumber)

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

//function to get all the Requests
module.exports.getAllRequests = async (req, res) => {
  try {
    const serviceRequests = await getAllServiceRequest.find();
    res.status(200).json({
      message: "all  Requests fetched Succesfully",
      Services: serviceRequests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "intenal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

    const MemberShipDetails = await AssignMemeberships.create({
      JobOrderNumber,
      MemebershipType,
      StartDate: new Date(StartDate),
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

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function to get the membership data
module.exports.getClientMemebership = async (req, res) => {
  try {
    const membershipData = await AssignMemeberships.find();

    const membershipTypes = ["warrenty", "platinum", "gold", "silver"];
    const calculations = {};

    membershipTypes.forEach((type) => {
      const filteredData = filterMembershipByType(membershipData, type);
      calculations[type] = calculateData(filteredData);
    });

    res.status(201).json({ success: true, ...calculations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

//function used to calculate the data of meberships
const calculateData = (data) => {
  let totalRevenue = 0;
  let count = 0;
  let expData = [];

  for (const d of data) {
    totalRevenue += parseFloat(d.PricePaid);

    const startDate = new Date(d.StartDate);
    const durationInMonths = Number(d.Duration);
    const endDate = new Date(
      startDate.setMonth(startDate.getMonth() + durationInMonths)
    );

    const timeDifference = endDate - Date.now();

    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysLeft <= 30) {
      if (daysLeft <= 0) {
        d.isExpired = true;
        d.save();
      }
      expData.push({
        JobOrderNumber: d.JobOrderNumber,
        isExpired: d.isExpired,
      });
    }
    if (!d.isExpired && !d.isDisable && !d.isRenewed) {
      count++;
    }
  }

  return { totalRevenue, count, expData };
};

// to filter the memberships
const filterMembershipByType = (data, type) => {
  return data.filter((member) => member.MemebershipType === type);
};

// Function to get client data on membership Limited page
module.exports.showClientLimitedDetails = async (req, res) => {
  try {
    const JobOrderNumbers = req.body.JobOrderNumber;
    const clientData = [];

    await Promise.all(
      JobOrderNumbers.map(async (JON) => {
        const data = await clientDetailSchema.findOne({ JobOrderNumber: JON });
        clientData.push({
          name: data.name,
          PhoneNumber: data.PhoneNumber,
          Address: data.Address,
        });
      })
    );

    res.status(201).json({ success: true, clientData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

// Get client Details
module.exports.getClientDetail = async (req, res) => {
  try {
    const { JON } = req.params;
    console.log(JON);
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
