const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const callbackAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const serviceAssigtoEngg = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const {
  generateEnggToken,
} = require("../../Middleware/ServiceEnggAuthMiddleware");

const EnggLocationModel = require("../../Modals/LocationModel/EnggLocationSchema");

const ServiceAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const AssignSecheduleRequest = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const clientDetailSchema = require("../../Modals/ClientDetailModals/RegisterClientDetailSchema");

const clientRequestImidiateVisit = require("../../Modals/ServicesModal/ClinetCallback");

const serviceRequest = require("../../Modals/ServicesModal/ClientServicesRequest");

const EnggAttendanceServiceRecord = require("../../Modals/ServiceEngineerModals/Attendance");

const EnggLeaveServiceRecord = require("../../Modals/ServiceEngineerModals/EnggLeaveSchema");

const OtpDetails = require("../../Modals/OTP/Otp");

const Report = require("../../Modals/Report/ReportSchema");

const CheckList = require("../../Modals/ChecklistModal/ChecklistModal");

const SparePart = require("../../Modals/SpearParts/SpearParts");

const ReportInfoModel = require("../../Modals/ReportModal/ReportModal");

const sparePartRequestTable = require("../../Modals/SpearParts/SparePartRequestModel");

const axios = require("axios");
require("dotenv").config();






const calculateTimedifference = (timetogetdiff, valuediff) => {
  const time = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const time1 = new Date(`2024-03-12T${time}`);
  const time2 = new Date(`2024-03-12T${timetogetdiff}`);
  const differenceInMs = time1.getTime() - time2.getTime();
  const differenceInMinutes = differenceInMs / (1000 * 60);
  const remaintime = Math.ceil(valuediff - Number(differenceInMinutes));

  return remaintime;
};

const calculateTwotimedifference = (
  timetogetdiff1,
  timetogetdiff2,
  valuediff
) => {
  const time1 = new Date(`2024-03-12T${timetogetdiff2}`);
  const time2 = new Date(`2024-03-12T${timetogetdiff1}`);
  const differenceInMs = time1.getTime() - time2.getTime();
  const differenceInMinutes = differenceInMs / (1000 * 60);
  const remaintime = Math.ceil(valuediff - Number(differenceInMinutes));

  return remaintime;
};






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
      EnggPhoto,
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
    res
      .status(201)
      .json({ message: "service Engg Register Succesfully", user: newUser });
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
module.exports.loginEngg = async (req, res) => {
  try {
    const { EnggId, password } = req.body;

    // console.log(EnggId,password)

    //firstly check the Engg is exist or not
    const Engg = await ServiceEnggBasicSchema.findOne({ EnggId });

    if (!Engg || Engg.EnggPassword !== password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateEnggToken({ EnggId });
    res.json({
      Engg,
      success: true,
      allotedAdmin: "65e0103005fd2695f3aaf6d4",
      adminName: "Parabh Simaran",
      token,
    });
  } catch (error) {
    console.error("Error logging in service Engg:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

    if (!assignedServices || assignedServices.length === 0) {
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

//-----------------------------------------------------------------{Amit-Features(aX13) Starts}--------------------------------------------------------------------------------

//function to handle (all the Engg detail as per engg Id)

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
      message: "servicesc Engg retrieved by his/her ID successfully",
      enggDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------
//api for location  we need to integrate this with engg attendance

module.exports.createEnggLocation = async (req, res) => {
  // onswipe of the engg update allotdetails , jobordernumber(if joborder number is not present create a new array) starting and ending location
  try {
    const { ServiceEnggId, JobOrderNumber, latitude, longitude } = req.body;
    if (ServiceEnggId && JobOrderNumber && latitude && longitude) {
      const AttendanceCreatedDate = new Date()
        .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",")[0];

      let enggLocation = await EnggLocationModel.findOne({
        ServiceEnggId,
        AttendanceCreatedDate,
      });
      if (enggLocation) {
        // EnggLocation found, iterate over AllotDetails array
        let jobOrderFound = false;
        for (let i = 0; i < enggLocation.AllotDetails.length; i++) {
          if (
            enggLocation.AllotDetails[i].JobOrderNumber === JobOrderNumber &&
            enggLocation.AllotDetails[i].createdDate === AttendanceCreatedDate
          ) {
            // JobOrderNumber found, update startingLocation coordinates
            enggLocation.AllotDetails[i].startingLocation.coordinates = [
              latitude,
              longitude,
            ];
            jobOrderFound = true;
            break;
          }
        }
        if (!jobOrderFound) {
          // JobOrderNumber not found, create new object and push into AllotDetails array
          enggLocation.AllotDetails.push({
            JobOrderNumber,
            startingLocation: {
              type: "Point",
              coordinates: [latitude, longitude],
            },
            endingLocation: { type: "Point", coordinates: [] },
            createdDate: AttendanceCreatedDate,
          });
        }
        await enggLocation.save();
        res.status(200).json({ message: "EnggLocation updated successfully" });
      } else {
        res
          .status(404)
          .json({ message: "No Engg data found for the current date" });
      }
    }
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in Location creation" });
  }
};

//----------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.CreateEnggLocationOnAttendance = async (req, res) => {
  //this is the api to update current locations(real time )
  try {
    /* Attendances logic hear */
    const { ServiceEnggId, latitude, longitude } = req.body;

    if (ServiceEnggId && latitude && longitude) {
      const AttendanceCreatedDate = new Date()
        .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",")[0];
      const response = await EnggLocationModel.findOneAndUpdate(
        { ServiceEnggId, AttendanceCreatedDate },
        {
          currentLocation: {
            type: "Point",
            coordinates: [latitude, longitude],
          },
        }
      );
      //console.log(response)
      if (!response) {
        await EnggLocationModel.create({
          ServiceEnggId,
          //mark Attandance Logic here
          currentLocation: {
            type: "Point",
            coordinates: [latitude, longitude],
          },
        });
      }
      res
        .status(200)
        .json({ message: "Attendance marked and Location connection started" });
    } else {
      res.status(400).json({
        message: "400 Bad Request",
      });
    }
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in Location creation" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.getEnggLocationDetail = async (req, res) => {
  try {
    const AttendanceCreatedDate = new Date()
      .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
      .split(",")[0];
    const enggDetail = await EnggLocationModel.find({ AttendanceCreatedDate });
    if (!enggDetail) {
      return res.status(404).json({
        message: "No services Engg found for the specified date",
      });
    }
    const serviceEnggId = await Promise.all(
      enggDetail.map(async (detail) => {
        return await ServiceEnggBasicSchema.findOne({
          EnggId: detail.ServiceEnggId,
        });
      })
    );

    console.log(serviceEnggId);

    const combinedData = enggDetail.map((detail, index) => ({
      ...detail.toObject(),
      serviceEnggIdDetails: serviceEnggId[index],
    }));

    res.status(200).json({
      message: "Services Engg Location retrieved by his/her ID successfully",
      combinedData,
    });
    //}
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

//api for the engg app i.e seduled with the daily task
module.exports.getEngScheduleData = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;
    const currentDate = new Date();
    const todayDate = currentDate.toLocaleDateString("en-GB");

    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDateString = tomorrowDate.toLocaleDateString("en-GB");

    const serviceAssignments = await ServiceAssigntoEngg.find({
      ServiceEnggId: ServiceEnggId,
      Date: { $in: [todayDate, tomorrowDateString] },
    });

    const assignScheduleRequests = await AssignSecheduleRequest.find({
      ServiceEnggId: ServiceEnggId,
      Date: { $in: [todayDate, tomorrowDateString] },
    });

    const clientDetailsCallbackRequest = await Promise.all(
      serviceAssignments.map(async (data) => {
        const callbackid = data.callbackId;
        const value = await clientRequestImidiateVisit.findOne({
          callbackId: callbackid,
        });
        return {
          serviceId: data.callbackId,
          ServiceEnggId: data.ServiceEnggId,
          JobOrderNumber: data.JobOrderNumber,
          Slot: data.Slot,
          Message: data.Message,
          TaskStatus: data.ServiceProcess,
          Date: data.Date,
          TypeOfIssue: value.TypeOfIssue,
          Description: value.Description,
          Type: value.Type,
        };
      })
    );

    const clientDetailsServiceRequest = await Promise.all(
      assignScheduleRequests.map(async (data) => {
        const callbackid = data.callbackId;
        const value = await serviceRequest.findOne({ callbackId: callbackid });
        return {
          serviceId: data.RequestId,
          ServiceEnggId: data.ServiceEnggId,
          JobOrderNumber: data.JobOrderNumber,
          Slot: data.Slot,
          Message: data.Message,
          TaskStatus: data.ServiceProcess,
          Date: data.Date,
          TypeOfIssue: value.TypeOfIssue,
          Description: value.Description,
          Type: value.Type,
        };
      })
    );

    const mainDetails = clientDetailsCallbackRequest
      .concat(clientDetailsServiceRequest)
      .map((data) => ({
        serviceId: data.serviceId,
        ServiceEnggId: data.ServiceEnggId,
        JobOrderNumber: data.JobOrderNumber,
        Slot: data.Slot,
        Date: data.Date,
        Message: data.Message,
        TaskStatus: data.TaskStatus,
        TypeOfIssue: data.TypeOfIssue,
        Description: data.Description,
        Type: data.Type,
      }));

    const filteredServiceAssignmentsWithClientName = await Promise.all(
      mainDetails.map(async (assignment) => {
        const client = await clientDetailSchema.findOne({
          JobOrderNumber: assignment.JobOrderNumber,
        });
        return {
          ...assignment,
          ClientName: client?.name,
          ClientNumber: client?.PhoneNumber,
          ClientAddress: client?.Address,
          ClientPhoto: client?.ProfileImage,
        };
      })
    );

    filteredServiceAssignmentsWithClientName.sort((a, b) => {
      const dateA = new Date(a.Date.split("/").reverse().join("-"));
      const dateB = new Date(b.Date.split("/").reverse().join("-"));

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      const timeA = convertTimeToSortableFormat(a.Slot[0]);
      const timeB = convertTimeToSortableFormat(b.Slot[0]);
      return timeA - timeB;
    });

    res
      .status(200)
      .json({ EngScheduleData: filteredServiceAssignmentsWithClientName });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in getEnggAssignDetails" });
  }
};

function convertTimeToSortableFormat(time) {
  const [startTime, endTime] = time.split("-").map((slot) =>
    slot
      .trim()
      .split(":")
      .map((part) => parseInt(part))
  );
  return (
    startTime[0] * 60 +
    (startTime[1] + (startTime[0] >= 12 ? 12 : 0)) * 60 +
    (startTime[0] >= 12 ? 720 : 0) +
    (startTime[0] === 12 ? -720 : 0)
  );
}

//...................................................................................................................................
//api for the attendance checkin and checkout
module.exports.EnggTime = async (req, res) => {
  try {
    const time = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return res.status(201).json({ time: time });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in EnggTime" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggCheckIn = async (req, res) => {
  //console.log("req of checkin",req.params.ServiceEnggId)
  try {
    const images = req.files;
    const frontimagename = images?.frontimage[0].filename;
    const backimagename = images?.backimage[0].filename;
    const { IsAttendance } = req.body;
    const ServiceEnggId = req.params.ServiceEnggId;
    if (IsAttendance && ServiceEnggId) {
      const enggPhoto = frontimagename + " " + backimagename;
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const CheckIn = await EnggAttendanceServiceRecord.create({
        IsAttendance: IsAttendance,
        ServiceEnggId: ServiceEnggId,
        Check_In: {
          engPhoto: enggPhoto,
          time: time,
        },
      });
      return res.status(201).json(time);
    }
    return res
      .status(500)
      .json({ error: "ServiceEnggId or IsAttendance not find" });
  } catch (error) {
    //console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in EnggCheckIn" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggCheckOut = async (req, res) => {
  //console.log("req of checkout",req)
  try {
    const images = req.files;
    const frontimagename = images?.frontimage[0].filename;
    const backimagename = images?.backimage[0].filename;
    const ServiceEnggId = req.params.ServiceEnggId;
    if (ServiceEnggId) {
      const enggPhoto = frontimagename + " " + backimagename;
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const date = new Date().toLocaleDateString("en-GB");

      const CheckIn = await EnggAttendanceServiceRecord.findOneAndUpdate(
        { ServiceEnggId, Date: date },
        {
          Check_Out: {
            engPhoto: enggPhoto,
            time: time,
          },
        }
      );
      return res.status(201).json(time);
    }
    return res.status(500).json({ error: "ServiceEnggId not find" });
  } catch (error) {
    //console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in EnggCheckOut" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggOnFirstHalfBreak = async (req, res) => {
  try {
    const { ServiceEnggId } = req.body;

    if (ServiceEnggId) {
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const date = new Date().toLocaleDateString("en-GB");

      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });

      if (result) {
        if (result?.First_halfs_time && result?.First_halfe_time) {
          return res.status(200).json({
            status: "Warning",
            message: "You've already taken/finished your Break",
          });
        }
        let updateinfo = "";
        result?.First_halfs_time
          ? (updateinfo = { First_halfe_time: time })
          : (updateinfo = { First_halfs_time: time });

        const updatedRecord =
          await EnggAttendanceServiceRecord.findOneAndUpdate(
            {
              ServiceEnggId,
              Date: date,
            },
            updateinfo,
            { new: true }
          );
        if (updatedRecord?.First_halfe_time) {
          return res.status(200).json({
            status: "stop",
            message: "Your operation stopped successfull",
          });
        }

        return res.status(200).json({
          status: "success",
          message: "Your operation is successfull",
        });
      }
    }
    return res
      .status(500)
      .json({ error: "ServiceId not found / Try to login again !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error in First_half ! contact Developer !",
    });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggOnSecondHalfBreak = async (req, res) => {
  try {
    const { ServiceEnggId } = req.body;
    console.log("ServiceEnggId get in backend = ", ServiceEnggId);
    if (ServiceEnggId) {
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const date = new Date().toLocaleDateString("en-GB");

      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });

      if (result) {
        if (result?.Second_halfs_time && result?.Second_halfe_time) {
          return res.status(200).json({
            status: "Warning",
            message: "You've already taken/finished your Break",
          });
        }
        let update = "";
        result?.Second_halfs_time
          ? (update = { Second_halfe_time: time })
          : (update = { Second_halfs_time: time });

        const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
          {
            ServiceEnggId,
            Date: date,
          },
          update,
          { new: true }
        );
        if (Break?.Second_halfe_time) {
          return res.status(200).json({
            status: "stop",
            message: "Your operation stopped successfull",
          });
        }
        return res.status(200).json({
          status: "success",
          message: "Your operation is successfull",
        });
      }
    }
    return res
      .status(500)
      .json({ error: "ServiceId not found / Try to login again !" });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error in Second_half ! contact developer",
    });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggOnLunchBreak = async (req, res) => {
  try {
    const { ServiceEnggId } = req.body;

    if (ServiceEnggId) {
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const date = new Date().toLocaleDateString("en-GB");

      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });

      if (result) {
        if (result?.Lunch_breaks_time && result?.Lunch_breake_time) {
          return res.status(200).json({
            status: "Warning",
            message: "You've already taken/finished your Lunch Break",
          });
        }
        let update = "";
        result?.Lunch_breaks_time
          ? (update = { Lunch_breake_time: time })
          : (update = { Lunch_breaks_time: time });

        const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
          {
            ServiceEnggId,
            Date: date,
          },
          update,
          { new: true }
        );
        if (Break?.Lunch_breake_time) {
          return res.status(200).json({
            status: "stop",
            message: "Your operation stopped successfull",
          });
        }
        return res.status(200).json({
          status: "success",
          message: "Your operation is successfull",
        });
      }
    }
    return res
      .status(500)
      .json({ error: "ServiceId not found / Try to login again !" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in Break ! contact developer" });
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------------------
// changes by armaan

module.exports.enggLeaveServiceRequest = async (req, res) => {
  try {
    const { ServiceEnggId, TypeOfLeave, From, To, Leave_Reason } = req.body;

    // console.log("preert", req.files);
    // return ;
    // return;

    let document = null;
    if (req.files) {
      document = req.files[0];
    }
    const response = await EnggLeaveServiceRecord.create({
      ServiceEnggId,
      TypeOfLeave,
      Duration: { From: From, To: To },
      Leave_Reason,
      Document: document,
    });
    console.log("document",document)
    res
      .status(200)
      .json({ success: true, message: "Leave Created successfully", response });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in enggLeaveServiceRequest" });
  }
};
// changes by armaan
//----- for testing api ----------------------------------------------------------------------------------------------------------
module.exports.testingApi = async (req, res) => {
  try {
    return res.status(200).json({ message: "testing successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in enggLeaveServiceRequest" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.enggLeaveRecord = async (req, res) => {
  try {
    const { ServiceEnggId } = req.body;

    const response = await EnggLeaveServiceRecord.find({ ServiceEnggId });

    if (response.length === 0) {
      return res.status(404).json({ message: "No Leave Record Found" });
    }
    res.status(201).json({ response });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in enggLeaveRecord" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.validateOtpForClient = async (req, res) => {
  try {
    const { Otp, ServiceEnggId, JobOrderNumber } = req.body;
    if (Otp && ServiceEnggId && JobOrderNumber) {
      const response = await OtpDetails.findOne({
        otp: Otp,
        ServiceEnggId,
        JobOrderNumber,
      });
      if (response) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(404).json({ success: false });
      }
    }
    return res.status(500).json({ error: "Enter valid data" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in validateOtpForClient" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.generateOtpForClient = async (req, res) => {
  try {
    const { ServiceEnggId, JobOrderNumber, PhoneNumber } = req.body;

    if (ServiceEnggId && JobOrderNumber && PhoneNumber) {
      const otp = Math.floor(1000 + Math.random() * 9000);

      // Save OTP details to the database
      const response = await OtpDetails.create({
        otp: otp,
        ServiceEnggId: ServiceEnggId,
        JobOrderNumber: JobOrderNumber,
      });
      if (response) {
        const timer = 5 * 60000;

        setTimeout(async () => {
          await OtpDetails.findByIdAndDelete({ _id: response._id });
        }, timer);
      }
      // Prepare data and config for the API request

      const apiKey = process.env.MESSAGE_API_KEY;
      // console.log(apiKey, typeof (apiKey));
      const axiosConfig = {
        headers: {
          authorization: apiKey,
          "Content-Type": "application/json",
        },
      };
      const data = {
        variables_values: otp,
        route: "otp",
        numbers: PhoneNumber,
      };

      // Send request to Fast2SMS API
      const response1 = await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        data,
        axiosConfig
      );
      // await axios.post("https://www.fast2sms.com/dev/voice", data, axiosConfig);

      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully" });
    } else {
      return res.status(400).json({ error: "Missing required fields" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in generateOtpForClient" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggReportResponse = async (req, res) => {
  try {
    const { checklistName, subcategories } = req.body;
    if (checklistName && subcategories) {
      const response = await Report.create({
        checklistName: checklistName,
        subcategories: subcategories,
      });
      return res.status(200).json({ response });
    }
    return res.status(500).json({ error: "Enter valid data" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in EnggReportResponse" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggReportQuestionFetch = async (req, res) => {
  try {
    const { CheckListId } = req.body;
    if (CheckListId) {
      const response = await CheckList.findById(CheckListId);
      return res.status(200).json({ response });
    }
    return res.status(500).json({ error: "Enter valid data" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in EnggReportQuestionFetch" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggCheckInCheckOutDetals = async (req, res) => {
  try {
    const Id = req.params.ServiceEnggId;
    if (Id) {
      const date = new Date().toLocaleDateString("en-GB");
      const response = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId: Id,
        Date: date,
      });
      return res.status(200).json({
        Check_In: response.Check_In.time,
        Check_Out: response.Check_Out.time,
      });
    }
    return res.status(500).json({ error: "ServiceEnggId Not Found" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in EnggCheckInCheckOutDetals" });
  }
};
//-----------------------------------------------------------------{Amit-Features(aX13) Ends}--------------------------------------------------------------------------------

//-----------------------------------------------------------------{preet dev section starts}--------------------------------------------------------------------------------
//function to handle AssignCallbackDataForEnggAppByCallbackId
module.exports.AssignCallbackDataForEnggAppByCallbackId = async (req, res) => {
  try {
    const { callbackId } = req.params;
    const callbackData = await callbackAssigntoEngg.findOne({ callbackId });
    if (!callbackData) {
      return res.status(404).json({ message: "no callback data found" });
    }
    const clientDetail = await clientDetailSchema.findOne({
      JobOrderNumber: callbackData.JobOrderNumber,
    });
    if (!clientDetail) {
      return res.status(404).json({ message: "no clientDetail data found" });
    }
    const CallbackDetail = await clientRequestImidiateVisit.findOne({
      callbackId: callbackData.callbackId,
    });
    console.log(callbackData.callbackId);
    if (!CallbackDetail) {
      return res.status(404).json({ message: "no CallbackDetail data found" });
    }

    const Details = {
      callbackData,
      clientDetail,
      CallbackDetail,
    };
    return res.status(200).json({ Details });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        "Internal server error in AssignCallbackDataForEnggAppByCallbackId",
    });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------
// function to AssignServiceRequestDataForEnggAppByServiceId
module.exports.AssignServiceRequestDataForEnggAppByServiceId = async (
  req,
  res
) => {
  try {
    const { RequestId } = req.params;
    const callbackData = await AssignSecheduleRequest.findOne({ RequestId });

    if (!callbackData) {
      return res.status(404).json({ message: "no RequestData data found" });
    }
    const clientDetail = await clientDetailSchema.findOne({
      JobOrderNumber: callbackData.JobOrderNumber,
    });
    if (!clientDetail) {
      return res.status(404).json({ message: "no clientDetail data found" });
    }

    const CallbackDetail = await serviceRequest.findOne({
      RequestId: callbackData.RequestId,
    });
    if (!CallbackDetail) {
      return res.status(404).json({ message: "no ServiceDetail data found" });
    }

    const Details = {
      callbackData,
      clientDetail,
      CallbackDetail,
    };
    return res.status(200).json({ Details });
  } catch (error) {
    return res.status(500).json({
      error:
        "Internal server error in AssignCallbackDataForEnggAppByCallbackId",
    });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------
//function to get checklistAll checklist by checklistId and serviceType

module.exports.getChecklistByIdAndServiceType = async (req, res) => {
  try {
    const { checklistId } = req.params;

    console.log(checklistId);

    const checkList = await CheckList.findById({ _id: checklistId });

    if (!checkList) {
      return res.status(400).json({ message: "Current No CheckList found" });
    }

    return res.status(200).json({ checkList });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error in finding checkilst",
    });
  }
};

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//date -> 21/03/2024

//controller to handle gety sparePartDetails

module.exports.getAllSparePartdetails = async (req, res) => {
  try {
    const spareParts = await SparePart.find();

    if (!spareParts) {
      return res.status(401).json({ message: "Spare Part is not Present" });
    }

    console.log(spareParts);

    return res.status(200).json({ spareParts });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error in get spare part",
    });
  }
};

//-----------------------------------------------------------------{preet dev section ends}----------------------------------------------------------------------------------
//----------------------------------------------------------------------------- important API ( I think) -----------------------------------------------------------------------------------------------

//date -> 22/03/2024

//function to handle GenrateReport by the Engenieer

module.exports.GenerateReportByEngg = async (req, res) => {
  try {
    const {
      serviceId,
      EnggId,
      questionsDetails,
      subCategoriesphotos,
      paymentMode,
      paymentDetils,
      isActive,
    } = req.body;

    // console.log("pankaj mera bhai",req.body.questionsDetails[0].questionResponse);
    // console.log("pankaj mera bhai1", req.body.questionsDetails);
    // console.log("pankaj mera bhai 2 ", req.body.questionsDetails[0]);
    // console.log("pankaj mera bhai 3 ", req.body);

    // return;

    let ReportData;

    const serviceExist = await ReportInfoModel.findOne({ serviceId });

    if (serviceExist) {
      serviceExist.questionsDetails.push(...questionsDetails);
      serviceExist.subCategoriesphotos.push(...subCategoriesphotos);
      ReportData = await serviceExist.save();
    } else {
      ReportData = await ReportInfoModel.create({
        serviceId,
        EnggId,
        questionsDetails,
        subCategoriesphotos,
        paymentMode,
        paymentDetils,
        isActive,
      });
    }

    res.status(201).json({ ReportData });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error Genrating Report by Engg",
    });
  }
};

// {armaan}--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports.getEngineerLeaves = async (req, res) => {
  try {
    const { ServiceEnggId } = req.query;
    const leaves = await EnggLeaveServiceRecord.find({ ServiceEnggId });

    res.status(200).json({ leaves });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in getEngineerLeaves" });
  }
};

module.exports.getEngineerLeveCount = async (req, res) => {
  try {
    const { ServiceEnggId } = req.query;
    console.log("working inside this");
    console.log(ServiceEnggId);
    const leaves = await EnggLeaveServiceRecord.find({ ServiceEnggId });
    console.log("leaves", leaves);
    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ message: "No leaves found" });
    }
    const approved = leaves.filter((leave) => leave.IsApproved === "Approved");
    const count = approved[approved.length - 1].UsedLeave;
    res.status(200).json({
      success: true,
      leavesUsed: count,
      totalLeave: leaves[0].TotalLeave,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in getEngineerLeaveCount" });
  }
};

// {armaan}--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Date => 28/03/2024

// ------------------------  function to handle getFinalReportData ------------------------

module.exports.getFinalReportDetails = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reportData = await ReportInfoModel.findOne({ serviceId });

    if (!reportData) {
      return res.status(400).json({ message: "Report Not Found" });
    }

    const filteredData = reportData.questionsDetails.filter(
      (question) =>
        (question.questionResponse.isResolved &&
          question.questionResponse.sparePartDetail.sparePartsType !== "" &&
          question.questionResponse.sparePartDetail.subsparePartspartid !==
            "") ||
        !question.questionResponse.isResolved
    );

    // console.log(filteredData);
    const IssuesResolved = [];
    const IssuesNotResolved = [];
    const SparePartsChanged = [];
    const SparePartsRequested = [];
    const TotalAmount = [];

    filteredData.forEach((element) => {
      if (
        element.questionResponse.isResolved &&
        element.questionResponse.sparePartDetail.sparePartsType !== "" &&
        element.questionResponse.sparePartDetail.subsparePartspartid !== "" &&
        !element.questionResponse.isSparePartRequest
      ) {
        IssuesResolved.push(element);
      }

      if (
        !element.questionResponse.isResolved &&
        !element.questionResponse.isSparePartRequest
      ) {
        IssuesNotResolved.push(element);
      }

      if (
        !element.questionResponse.isSparePartRequest &&
        element.questionResponse.sparePartDetail.sparePartsType !== "" &&
        element.questionResponse.sparePartDetail.subsparePartspartid !== "" &&
        element.questionResponse.isResolved
      ) {
        SparePartsChanged.push(element);
      }

      if (
        element.questionResponse.isSparePartRequest &&
        element.questionResponse.sparePartDetail.sparePartsType !== "" &&
        element.questionResponse.sparePartDetail.subsparePartspartid !== "" &&
        !element.questionResponse.isResolved
      ) {
        SparePartsRequested.push(element);
      }
    });

    res.status(200).json({
      IssuesResolved,
      IssuesNotResolved,
      SparePartsChanged,
      SparePartsRequested,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error fetching Report by Engg",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// by preet 31/03/2024 ---------
// function to handle get ( serviceId for activate service for generating Report )  for showing the final Report...

module.exports.getServiceIdOfLatestReportByServiceEngg = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const getData = await ReportInfoModel.find({ EnggId });

    if (!getData) {
      return res
        .status(404)
        .json({ message: "no Report found With This Engg Id" });
    }

    if (getData.isActive === true) {
      return res.status(200).json({ getData });
    }

    const serviceId = getData[0].serviceId;
    console.log(serviceId);
    return res.status(200).json({ serviceId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching Engg Id",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------

//function to handle updatePaymentDetails and send Data to sparePartRequested Table

module.exports.UpdatePaymentDetilsAndSparePartRequested = async (req, res) => {
  try {
    const { serviceId, paymentDetils } = req.body;

    const ReportData = await ReportInfoModel.findOne({ serviceId });

    if (!ReportData) {
      return res.status(404).json({ message: "Report Not Found" });
    }

    ReportData.paymentDetils = paymentDetils;
    ReportData.isVerify = true;
    ReportData.isActive = false;

    await ReportData.save();

    const FilteredData = ReportData.questionsDetails.filter(
      (value) => value.questionResponse.isSparePartRequest === true
    );

    // console.log("FilteredData == >",FilteredData);
    // console.log("FilteredData ReportData",ReportData.questionsDetails[25].questionResponse.isSparePartRequest);

    const FinalFilteredData = await Promise.all(
      FilteredData.map(async (item) => {
        const sparePartRequestDate = new Date()
          .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
          .split(",")[0];
        const { questionResponse } = item; // (todo for spare part id (Discuss in Enventory Modules)
        const newSparePartRequest = new sparePartRequestTable({
          EnggId: ReportData.EnggId,
          sparePartId: questionResponse.sparePartDetail.subsparePartspartid,
          quantity: "default",
          Type: questionResponse.sparePartDetail.sparePartsType,
          Description: questionResponse.SparePartDescription,
          RequestType: "On Site Request",
          sparePartName: questionResponse.sparePartDetail.sparePartsname,
          SubSparePartName: questionResponse.sparePartDetail.sparePartsname,
          Date: sparePartRequestDate,
        });
        return await newSparePartRequest.save();
      })
    );
    // console.log("FinalFilteredData",FilteredData)
    // console.log("FinalFilteredData2",FinalFilteredData)

    return res.status(200).json({ FinalFilteredData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while updating status in report",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------






















//==================================================================
//==================================================================

//pankaj code starts 03/31/2024

module.exports.EnggFirsthalfinfo = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;
    if (ServiceEnggId) {
      const date = new Date().toLocaleDateString("en-GB");
      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });

      if (result) {
        if (!result.First_halfs_time && !result.First_halfe_time) {
          return res.status(200).json({ status: "success", message: "15 min" });
        }
        if (result.First_halfs_time && result.First_halfe_time) {
          const remaintime = calculateTwotimedifference(
            result.First_halfs_time,
            result.First_halfe_time,
            15
          );
          return res
            .status(200)
            .json({ status: "success", message: remaintime + " min" });
        }
        if (result.First_halfs_time && !result.First_halfe_time) {
          const remaintime = calculateTimedifference(
            result.First_halfs_time,
            15
          );
          return res
            .status(200)
            .json({ status: "play", message: remaintime + " min" });
        }
      } else {
        return res.status(200).json({ status: "success", message: "0 min" });
      }
    } else {
      return res
        .status(500)
        .json({ error: "ServiceEnggId Id not found ! try to login again!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error ! Contact Developer." });
  }
};

module.exports.EnggSecondhalfinfo = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;

    if (ServiceEnggId) {
      const date = new Date().toLocaleDateString("en-GB");
      console.log("date = ", date);
      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });
      if (result) {
        if (!result.Second_halfs_time && !result.Second_halfe_time) {
          return res.status(200).json({ status: "success", message: "15 min" });
        }
        if (result.Second_halfs_time && result.Second_halfe_time) {
          const remaintime = calculateTwotimedifference(
            result.Second_halfs_time,
            result.Second_halfe_time,
            15
          );
          return res
            .status(200)
            .json({ status: "success", message: remaintime + " min" });
        }
        if (result.Second_halfs_time && !result.Second_halfe_time) {
          const remaintime = calculateTimedifference(
            result.Second_halfs_time,
            15
          );
          return res
            .status(200)
            .json({ status: "play", message: remaintime + " min" });
        }
      } else {
        return res.status(200).json({ status: "success", message: "0 min" });
      }
    } else {
      return res
        .status(500)
        .json({ error: "ServiceEnggId Id not found ! try to login again!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error ! Contact Developer." });
  }
};



module.exports.EnggLunchBreakinfo = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;
    if (ServiceEnggId) {
      const date = new Date().toLocaleDateString("en-GB");
      console.log("date = ", date);
      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });
      if (result) {
        if (!result.Lunch_breaks_time && !result.Lunch_breake_time) {
          return res.status(200).json({ status: "success", message: "30 min" });
        }
        if (result.Lunch_breaks_time && result.Lunch_breake_time) {
          const remaintime = calculateTwotimedifference(
            result.Lunch_breaks_time,
            result.Lunch_breake_time,
            30
          );
          return res
            .status(200)
            .json({ status: "success", message: remaintime + " min" });
        }
        if (result.Lunch_breaks_time && !result.Lunch_breake_time) {
          const remaintime = calculateTimedifference(
            result.Lunch_breaks_time,
            30
          );
          return res
            .status(200)
            .json({ status: "play", message: remaintime + " min" });
        }
      } else {
        return res.status(200).json({ status: "success", message: "0 min" });
      }
    } else {
      return res
        .status(500)
        .json({ error: "ServiceEnggId Id not found ! try to login again!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error ! Contact Developer." });
  }
};