const moment = require("moment");
const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const callbackAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const serviceAssigtoEngg = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const engineerRating = require("../../Modals/Rating/Rating");

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

const memberShipTable = require("../../Modals/MemebershipModal/MembershipsSchema");

const engglocationmodels = require("../../Modals/LocationModel/EnggLocationSchema");

const Razorpay = require("razorpay");

// const twilio  = require('twilio')

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

//--------------------------------------------------------------------------------------------------------------------
//by Paras
const calculateTwotimedifferenceinMins = (timetogetdiff1, timetogetdiff2) => {
  const time1 = new Date(`2024-03-12T${timetogetdiff2}`);
  const time2 = new Date(`2024-03-12T${timetogetdiff1}`);
  const differenceInMs = time1.getTime() - time2.getTime();
  const differenceInMinutes = differenceInMs / (1000 * 60);

  return Math.floor(differenceInMinutes);
};

const calculateDiffBetweentwoTime = (timetogetdiff1, timetogetdiff2) => {
  const time1 = new Date(`2024-03-12T${timetogetdiff2}`);
  const time2 = new Date(`2024-03-12T${timetogetdiff1}`);
  const differenceInMs = time1.getTime() - time2.getTime();
  const differenceInMinutes = differenceInMs / (1000 * 60);
  console.log(differenceInMinutes, "diff time");
  return differenceInMinutes;
};
// ---------------------------------------------------------------------------------------------------------------------
module.exports.RegisterServiceEngg2 = async (req, res) => {
  try {
    const formData = req.files;
    const bodyData = req.body;
    console.log(bodyData, "Body Data");

    console.log("mobileNumber",bodyData.mobileNumber, "Engg id ", bodyData.EnggId)

    const EnggAlreadyExist = await ServiceEnggBasicSchema.find({
        $or: [
          { PhoneNumber: bodyData.mobileNumber },
          { EnggId: bodyData.EnggId },
        ],
      });

    console.log("Engg already exist console ", EnggAlreadyExist)

    if (EnggAlreadyExist.length > 0) {
      return res
        .status(200)
        .json({ message: "Engg Already Exist with this Mobile Number or ID" });
    }

    const enggData = await ServiceEnggBasicSchema.create({
      EnggName: bodyData.firstName,
      EnggId: bodyData.EnggId,
      AlternativeNumber: bodyData.AlternativeNumber,
      EnggRole: bodyData.EnggRole,
      EnggLastName: bodyData.lastName,
      PhoneNumber: bodyData.mobileNumber,
      EnggAddress: bodyData.address,
      EnggPhoto: formData?.profilePhoto
        ? formData?.profilePhoto[0]?.key
        : "",
      DateOfBirth: bodyData.dateOfBirth,
      Email: bodyData.email,
      PinCode: bodyData.pinCode,
      City: bodyData.city,
      District: bodyData.district,
      State: bodyData.state,
      AddharCardNo: bodyData.addharCardNumber,
      DrivingLicenseNo: bodyData.drivingLisience,
      PanCardNo: bodyData.pancards,
      Qualification: bodyData.qualification,
      AdditionalCourse: bodyData.additionalCourse,
      AccountHolderName: bodyData.accountHolderName,
      BranchName: bodyData.branchName,
      AccountNumber: bodyData.accountNumber,
      IFSCcode: bodyData.IFSCcode,
      AddharPhoto: formData?.addharPhoto
        ? formData?.addharPhoto[0]?.key
        : "",
      DrivingLicensePhoto: formData?.drivingLicensePhoto
        ? formData?.drivingLicensePhoto[0]?.key
        : "",
      PancardPhoto: formData?.pancardPhoto
        ? formData?.pancardPhoto[0]?.key
        : "",
      QualificationPhoto: formData?.qualificationPhoto
        ? formData?.qualificationPhoto[0]?.key
        : "",
      AdditionalCoursePhoto: formData?.additionalCoursePhoto
        ? formData?.additionalCoursePhoto[0]?.key
        : "",
      DurationOfJob: bodyData.jobDuration,
      CompanyName: bodyData.companyName,
      JobTitle: bodyData.jobTitle,
      ManagerName: bodyData.managerName,
      ManagerNo: bodyData.managerNumber,
    });

    res
      .status(201)
      .json({ message: "service Engg Register Succesfully2", user: enggData });
  } catch (error) {
    console.error("Error registring in service Engg:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//===========\\=\\\\\\\\\\\====\=\=\=\==\=\=\=\=\=\=\=

//-------------------------------------------------------------------------------------------------------------------------------
//function to handle serviceEngg Login
module.exports.loginEngg = async (req, res) => {
  try {
    const DeviceId = req.headers["device-id"];
    const { EnggId, password } = req.body;

    console.log("00000000000000", req.body);
    console.log("))))))))))))))", req.headers);

    // console.log("90000000000000000000",DeviceId);
    //firstly check the Engg is exist or not

    const [Engg, rating] = await Promise.all([
      ServiceEnggBasicSchema.findOneAndUpdate(
        { EnggId },
        { ActiveDevice: DeviceId }
      ),
      engineerRating.find({ ServiceEnggId: EnggId }),
    ]);

    let count = 0;

    rating.map((item) => (count += item.Rating));
    const Rating = Math.floor((count / rating.length) * 10) / 10;

    if (!Engg || Engg.EnggPassword !== password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateEnggToken({ EnggId });
    console.log("{", EnggId);
    console.log("}", token);

    res.json({
      Engg,
      success: true,
      allotedAdmin: "65e0103005fd2695f3aaf6d4", //to do dynamic
      adminName: "Parabh Simaran", //to do dynamic
      Rating,
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
  console.log("chlrahai");
  try {
    const { EnggId } = req.params;
    console.log("EnggId--", EnggId);
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
    const { ServiceEnggId, JobOrderNumber } = req.body;
    if (ServiceEnggId && JobOrderNumber) {
      const AttendanceCreatedDate = new Date()
        .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",")[0];

      let enggLocation = await EnggLocationModel.findOne({
        ServiceEnggId,
        AttendanceCreatedDate,
      });

      if (!enggLocation) {
        return res.status(404).send({ mesasge: "No Engg location found" });
      }

      const latitude = enggLocation.currentLocation.coordinates[0];
      const longitude = enggLocation.currentLocation.coordinates[1];

      if (
        enggLocation?.AllotDetails[0]?.startingLocation?.coordinates?.length >=
        0
      ) {
        return res.status(404).json({
          message: "Location already marked",
        });
      }

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
    console.log(error);
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

    console.log("location latitude and langitude", latitude, longitude);

    if (ServiceEnggId && latitude && longitude) {
      const AttendanceCreatedDate = new Date()
        .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",")[0];

      const response = await EnggLocationModel.findOne({
        ServiceEnggId,
        AttendanceCreatedDate,
      });

      // console.log("++++++----------", response.currentLocation.coordinates);

      if (response) {
        let coordinate;
        coordinate = {
          origin: `${latitude},${longitude}`,
        };
        response.currentLocation.coordinates.push(coordinate);
        await response.save();
      } else {
        await EnggLocationModel.create({
          ServiceEnggId,
          currentLocation: {
            type: "Point",
            coordinates: {
              origin: `${latitude},${longitude}`,
            },
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
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in Location creation" });
  }
};

//-------------\\\\\\\\\\\\\\\\\\\\\-------------------\\\\\\\\\\\\\\\\\\\\\\----------------------------------------------------------------------------
module.exports.getEnggLocationCoordiantesToShowThePathOnMap = async (
  req,
  res
) => {
  try {
    const { ServiceEnggId } = req.params;

    const AttendanceCreatedDate = new Date()
      .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
      .split(",")[0];

    const coordinatesResponse = await EnggLocationModel.findOne({
      ServiceEnggId,
      AttendanceCreatedDate,
    });

    // console.log("console the coordinates ---->>> " ,coordinatesResponse);

    if (!coordinatesResponse) {
      return res
        .status(200)
        .json({
          message:
            "No location found for the specified Service Engineer ID and date",
        });
    }

    let coordinatesToSend = [];
    const coordinates =
      coordinatesResponse &&
      coordinatesResponse.currentLocation &&
      coordinatesResponse.currentLocation.coordinates.map((item) => {
        let coordinate = item?.origin?.split(",");
        // console.log("this is corrdibatyes found", coordinate)
        let lat = parseFloat(coordinate[0]);
        let lng = parseFloat(coordinate[1]);
        coordinatesToSend.push({ lat, lng });
      });

    res.status(200).json({ coordinates: coordinatesToSend });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching the cordinates" });
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

    const combinedData = enggDetail.map((detail, index) => ({
      ...detail.toObject(),
      serviceEnggIdDetails: serviceEnggId[index],
    }));

    // console.log("location data----------------",combinedData);

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

    // console.log("todays date =====> ", todayDate);

    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    // const tomorrowDateString = tomorrowDate.toLocaleDateString("en-GB");  //FIXME: I remove the "tomorrowDateString" date string from the Query...

    const serviceAssignments = await ServiceAssigntoEngg.find({
      ServiceEnggId: ServiceEnggId,
      Date: { $in: [todayDate] },
    });

    const assignScheduleRequests = await AssignSecheduleRequest.find({
      ServiceEnggId: ServiceEnggId,
      Date: { $in: [todayDate] },
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

//-----------------------------------------------------------------------------------------------------------

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
    const ServiceEnggId = req.params.ServiceEnggId;
    const images = req.files;
    const frontimagename = images?.frontimage[0].key;
    const backimagename = images?.backimage[0].key;
    const { IsAttendance } = req.body;
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
      .status(400)
      .json({ error: "ServiceEnggId or IsAttendance not find" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in EnggCheckIn" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------
//by Paras
function getCalculatedTotalHours(engData, time) {
  let firstBreakTime = 0;
  let lunchBreakTime = 0;
  let secondBreakTime = 0;
  firstBreakTime = engData.First_halfe_time
    ? calculateDiffBetweentwoTime(
        engData.First_halfs_time,
        engData.First_halfe_time
      )
    : 0;
  lunchBreakTime = engData.Lunch_breake_time
    ? calculateDiffBetweentwoTime(
        engData.Lunch_breaks_time,
        engData.Lunch_breake_time
      )
    : 0;
  secondBreakTime = engData.Second_halfe_time
    ? calculateDiffBetweentwoTime(
        engData.Second_halfs_time,
        engData.Second_halfe_time
      )
    : 0;
  let totalBreakHours;
  totalBreakHours = Math.floor(
    firstBreakTime + lunchBreakTime + secondBreakTime
  );
  console.log(totalBreakHours, "total break hours");

  const startTime = engData.Check_In.time;
  const checkouttime = time;
  const finalTimeinMins = calculateTwotimedifferenceinMins(
    startTime,
    checkouttime
  );
  const hoursOfFinalTime = Math.floor(finalTimeinMins / 60);
  const finalTime = `${hoursOfFinalTime}:${
    finalTimeinMins - hoursOfFinalTime * 60
  }`;
  console.log(finalTime, "final time");

  const totalWorkHoursinMins = finalTimeinMins - totalBreakHours;
  const totalWorkHours = Math.floor(totalWorkHoursinMins / 60);
  let finalTotalTime = `${totalWorkHours}:${
    totalWorkHoursinMins - totalWorkHours * 60
  }`;
  console.log(finalTotalTime, "final total time");
  return finalTotalTime;
}
//--------------------------------------------------------------------------------------------------------------------------------
module.exports.EnggCheckOut = async (req, res) => {
  //console.log("req of checkout",req)
  try {
    const images = req.files;
    const frontimagename = images?.frontimage[0].key;
    const backimagename = images?.backimage[0].key;
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
      const engData = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });
      console.log(engData, "eng data");
      const finalTotalTime = getCalculatedTotalHours(engData, time); //by Paras

      const CheckIn = await EnggAttendanceServiceRecord.findOneAndUpdate(
        { ServiceEnggId, Date: date },
        {
          Check_Out: {
            engPhoto: enggPhoto,
            time: time,
          },
          Total_Hours: finalTotalTime, //by Paras
        }
      );
      //make the logic that delete the coordinates from the EnggLocation Table "Starts" ----------------
      const now = new Date()
        .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",")[0];

      const EnggCoordinates = await engglocationmodels.findOne({
        ServiceEnggId: ServiceEnggId,
        AttendanceCreatedDate: now,
      });

      const keepIndexes = [];
      if (EnggCoordinates) {
        const waypoints = EnggCoordinates.currentLocation.coordinates
          .slice(1, -1)
          .reduce((acc, point, index) => {
            if (
              index %
                Math.ceil(
                  EnggCoordinates.currentLocation.coordinates.length / 23
                ) ===
                0 &&
              index !== 0
            ) {
              keepIndexes.push(index + 1);
            }
            return acc;
          }, []);

        const filteredconditions =
          EnggCoordinates.currentLocation.coordinates.filter((_, index) => {
            return (
              index === 0 ||
              index ===
                EnggCoordinates.currentLocation.coordinates.length - 1 ||
              keepIndexes.includes(index)
            );
          });
        await engglocationmodels.updateOne(
          { ServiceEnggId: ServiceEnggId, AttendanceCreatedDate: now },
          { $set: { "currentLocation.coordinates": filteredconditions } }
        );
      }

      //make the logic that delete the coordinates from the EnggLocation Table "Ends" ------------------

      return res.status(201).json(time);
    }
    return res.status(500).json({ error: "ServiceEnggId not fonnd" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error in EnggCheckOut" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
// changes by armaan
module.exports.enggLeaveServiceRequest = async (req, res) => {
  try {
    const { ServiceEnggId, TypeOfLeave, From, To, Leave_Reason } = req.body;

    let document,
      response = null;
    if (req.files) {
      // console.log(ServiceEnggId, TypeOfLeave, From, To, Leave_Reason);
      

      document = req.files.document[0].key;
      response = await EnggLeaveServiceRecord.create({
        ServiceEnggId,
        TypeOfLeave,
        Duration: { From: From, To: To },
        Leave_Reason,
        Document: document,
      });
    } else {
      response = await EnggLeaveServiceRecord.create({
        ServiceEnggId,
        TypeOfLeave,
        Duration: { From: From, To: To },
        Leave_Reason,
      });
    }

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
      const time1 = new Date(response.time).getTime();
      const date = new Date().getTime();
      const expireTime = date - time1;
      if (expireTime > 300000) {
        return res.status(200).json({ success: false, message: "OTP expired" });
      } else {
        return res.status(404).json({ success: true });
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

    const date = new Date().toISOString();

    if (ServiceEnggId && JobOrderNumber && PhoneNumber) {
      const otp = Math.floor(1000 + Math.random() * 9000);

      // Save OTP details to the database
      const response = await OtpDetails.create({
        otp: otp,
        ServiceEnggId: ServiceEnggId,
        JobOrderNumber: JobOrderNumber,
        time: date,
      });
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
      const response = await ReportInfoModel.create({
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

const calculateEarlyLate = (timetocalculate) => {
  const currentTime = new Date();
  const [hours, minutes, seconds] = timetocalculate.split(":").map(Number);
  const targetTime = new Date(currentTime);
  targetTime.setHours(hours, minutes, seconds, 0);
  return targetTime;
};

const caluclateCheckInCheckOutStatus = (attendanceTime, caltime) => {
  if (calculateEarlyLate(attendanceTime) > calculateEarlyLate(caltime[1])) {
    return "Late";
  } else if (
    calculateEarlyLate(attendanceTime) <= calculateEarlyLate(caltime[1]) &&
    calculateEarlyLate(attendanceTime) >= calculateEarlyLate(caltime[0])
  ) {
    return "On Time";
  } else if (
    calculateEarlyLate(attendanceTime) < calculateEarlyLate(caltime[0])
  ) {
    return "Early";
  }
};


// ------------------------------------------------------------------------------------------------------------------------------

module.exports.EnggCheckInCheckOutDetals = async (req,res) => {
  try {
    const Id = req.params.ServiceEnggId;

    const today = new Date();
    today.setDate(today.getDate() - 1); 
    
    const Todaysdate = new Date().toLocaleDateString("en-GB");
    const previousDate = today.toLocaleDateString("en-GB"); 


    if(!Id){
      res.status(404).json("please provide the service Engg Id");
    }

    // -------------------------------------- optimize the code -------------------------------------------------------
    const getAttendanceDetails = async (date) => {
      return await EnggAttendanceServiceRecord.findOne({ ServiceEnggId: Id, Date: date });
    };

    const calculateStatus = (attendanceRecord) => {
      let Check_In_status, Check_Out_status;

      if (attendanceRecord?.Check_In?.time) {
        Check_In_status = caluclateCheckInCheckOutStatus(attendanceRecord.Check_In.time, ["08:45:00", "09:15:00"]);
      }
      if (attendanceRecord?.Check_Out?.time) {
        Check_Out_status = caluclateCheckInCheckOutStatus(attendanceRecord.Check_Out.time, ["17:15:00", "17:45:00"]);
      }

      return { Check_In: attendanceRecord?.Check_In?.time, Check_In_status, Check_Out: attendanceRecord?.Check_Out?.time, Check_Out_status };
    };


    const Todaysresponse = await getAttendanceDetails(Todaysdate);
    const previousDateresponse = await getAttendanceDetails(previousDate);

    // console.log("previous data response ------------->>>>>> ", previousDateresponse);
    // console.log("Todaysresponse data response ------------->>>>>> ", Todaysresponse);

    if(Todaysresponse){
      return res.status(200).json(calculateStatus(Todaysresponse));
    }

    if(!Todaysresponse){

      const currentTime = new Date();
      const isBefore7AM = currentTime.getHours() < 7;

      console.log("concept of 7AM is supported ------------------------------>>>>>>>>>>>>>> ", isBefore7AM);

      //setup the condition day start from 07:AM

        if(previousDateresponse && !previousDateresponse.Check_Out.time && isBefore7AM){
          const result = calculateStatus(previousDateresponse);
          return res.status(200).json(result);
        }else{
          return res.status(200).json({message:"no attendance found last response"})
        }
    }

  
  } catch (error) {
    console.error(error);
    return res
    .status(500)
    .json({ error: "Internal server error in EnggCheckInCheckOutDetals" });
  }
}

// ------------------------------------------------------------------------------------------------------------------------------


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
    // console.log(callbackData.callbackId);
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

    // console.log(checklistId);

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

    // console.log(spareParts);

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
    const reqs = req.body;
    const file = req.files;
    let ReportData;

    // console.log(reqs);

    // console.log("20",req.body)
    console.log("21",req.files)

    const serviceExist = await ReportInfoModel.findOne({
      serviceId: reqs.serviceId,
    });
    const QuestionResponse = JSON.parse(reqs.questionsDetails);

    const photoFileNames = file.photoss.map((file) => file.key);
    const uploaddata = [
      {
        subCategoriesPhotosId: reqs.subCategoriesphotos?.subCategoriesPhotosId,
        photo: photoFileNames,
      },
    ];
    if (serviceExist) {
      serviceExist.questionsDetails.push(...QuestionResponse);
      serviceExist.subCategoriesphotos.push(...uploaddata);
      ReportData = await serviceExist.save();
    } else {
      ReportData = await ReportInfoModel.create({
        serviceId: reqs.serviceId,
        EnggId: reqs.EnggId,
        JobOrderNumber: reqs.JobOrderNumber,
        questionsDetails: QuestionResponse,
        subCategoriesphotos: uploaddata,
        paymentMode: "Cash",
        paymentDetils: "paymentDetils",
        // isActive: true,
      });
    }

    res.status(201).json({ ReportData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error Genrating Report by Engg",
    });
  }
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//api to handle the functionlity of tracker in the client app
module.exports.handleTrackerPostionClientApp = async (req, res) => {
  try {
    const { serviceId, EnggId, JobOrderNumber, Steps } = req.body;

    // console.log(serviceId);
    // console.log(Steps);

    const havea = await ReportInfoModel.findOne({
      serviceId: serviceId,
    });

    if (havea) {
      await ReportInfoModel.findOneAndUpdate(
        { serviceId: serviceId },
        { EnggId: EnggId, Steps: Steps, JobOrderNumber: JobOrderNumber }
      );
    } else {
      await ReportInfoModel.create({
        serviceId: serviceId,
        EnggId: EnggId,
        JobOrderNumber: JobOrderNumber,
        Steps: Steps,
      });
    }

    res.status(200).json({ message: "info update succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error Genrating Report by Engg",
    });
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    // console.log("working inside this");
    // console.log(ServiceEnggId);
    const leaves = await EnggLeaveServiceRecord.find({ ServiceEnggId });
    0;
    // console.log("leaves", leaves);
    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ message: "No leaves found" });
    }
    const approved = leaves.filter((leave) => leave.IsApproved === "Approved");
    const count = approved[approved.length - 1]?.UsedLeave || 0;
    // console.log(count);
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


// @route name-getAllEngDetails
// @route type-private
// @route work-get eng details leave rating etc....

module.exports.getAllEngDetails = async (req, res) => {
  try {
    const engDetails = await ServiceEnggBasicSchema.find().select(
      "AvailableCash EnggId EnggLastName EnggName EnggPhoto EnggRole Spare isCheckedIn"
    );   

    const combinedData = await Promise.all(
      engDetails.map(async (eng) => {
        const spareParts = await sparePartRequestTable.find({
          EnggId: eng.EnggId, 
          isApproved: true,
          isApplied: true,
        });
        const engLeaveRecord = await EnggLeaveServiceRecord.find({
          ServiceEnggId: eng.EnggId,
        });
        const currentLeaveRecord = engLeaveRecord[engLeaveRecord.length - 1];
        const enggCheckIn = await EnggAttendanceServiceRecord.find({
          ServiceEnggId: eng.EnggId,
          Date: moment(Date.now()).format("DD/MM/YYYY"),
          "Check_In.time": { $exists: true, $ne: null },
          "Check_Out.time": { $exists: false },
        });

        return {
          ...eng.toObject(),
          engLeaveRecord: currentLeaveRecord,
          Spare: spareParts.length || 0,
          isCheckedIn: enggCheckIn.length ? true : false,
        };
      })
    );

    res.status(200).json({ combinedData });
  } catch (error) {
    console.error("Error in getAllEngDetails:", error);
    return res.status(500).json({
      error: "Internal server error in get service eng details",
    });
  }
};

//---------------------------------------------end of getAllEngDetails api create by aayush for Eng page for gettting details of eng data leave rating and other details of eng----------------------------------------------------------------------------------------------------------------------------------------

//Date => 28/03/2024

// ------------------------  function to handle getFinalReportData ------------------------

module.exports.getFinalReportDetails = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reportData = await ReportInfoModel.findOne({ serviceId });
    // console.log("tttttttttttttttttttt", reportData.JobOrderNumber);

    const getMemberShipDetails = await memberShipTable.findOne({
      JobOrderNumber: reportData.JobOrderNumber,
      isDisable: false,
    });
    // console.log("***********", getMemberShipDetails);

    if (!reportData) {
      return res.status(400).json({ message: "Report Not Found" });
    }

    const filteredData = reportData.questionsDetails.filter(
      (question) =>
        (question.questionResponse.isResolved &&
          question.questionResponse.sparePartDetail.sparePartsType !== "" &&
          question.questionResponse.sparePartDetail.subsparePartspartid !==
            "") ||
        (question.questionResponse.isResolved &&
          question.questionResponse.SparePartDescription !== "") ||
        !question.questionResponse.isResolved
    );

    // console.log("}}}}}}}}}}}", filteredData.questionResponse.sparePartDetail);

    const IssuesResolved = [];
    const IssuesNotResolved = [];
    const SparePartsChanged = [];
    const SparePartsRequested = [];
    const TotalAmount = [];

    filteredData.forEach((element) => {
      if (element.questionResponse.isResolved) {
        IssuesResolved.push(element);
      } else {
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

    const caluclatePriceAsPerMemeberShip = (memeberShip, partprice) => {
      if (memeberShip === "platinum" && partprice < 20000) {
        return 0;
      } else if (memeberShip === "gold" && partprice < 8000) {
        return 0;
      } else if (memeberShip === "silver" && partprice < 1000) {
        return 0;
      } else {
        return partprice;
      }
    };

    // const membership = getMemberShipDetails.MembershipType || 'silver';  //todo - chnage is future--------------------
    const membership = "silver";
    // console.log("membership -----", membership)

    // price caluclate login insiode the spare part
    const caluclatePrice = SparePartsChanged.map((item) => {
      const sparePartPrice = item.questionResponse.sparePartDetail.partsprice;
      return caluclatePriceAsPerMemeberShip(membership, sparePartPrice);
    });
    const totalPrice = caluclatePrice.reduce(
      (acc, curr) => acc + parseInt(curr),
      0
    );
    TotalAmount.push(totalPrice);

    // price caluclate login insiode the spare part

    res.status(200).json({
      IssuesResolved,
      IssuesNotResolved,
      SparePartsChanged,
      SparePartsRequested,
      TotalAmount,
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

    if (getData.length === 0) {
      return res
        .status(200)
        .json({ message: "No reports found for this Engg Id" });
    }

    const FianlData = getData?.filter((data) => data.isActive === true);

    // console.log("==>", FianlData);

    if (FianlData.length === 0) {
      return res
        .status(200)
        .json({ message: "No Active Report Found With This Engg Id" });
    }

    const ServiceId = FianlData[0].serviceId;
    const ReEvaluateData =
      FianlData[0].questionsDetails[FianlData[0].questionsDetails.length - 1];

    // Checksum for the subCategoriesId and subcategoryname  -- Dark_Shadow
    if (!ReEvaluateData || ReEvaluateData === undefined) {
      return res.status(200).json({
        ServiceId: ServiceId,
        subCategoriesId: "No Data Found",
        subcategoryname: "No Data Found",
        Steps: FianlData[0].Steps,
      });
    }
    // console.log(ReEvaluateData);
    return res.status(200).json({
      ServiceId: ServiceId,
      subCategoriesId: ReEvaluateData.subCategoriesId,
      subcategoryname: ReEvaluateData.subcategoryname,
      Steps: FianlData[0].Steps,
    });
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
    const { serviceId, paymentdata } = req.body;

    const sparePartRequestDate = new Date()
      .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
      .split(",")[0];

    const date = new Date().toLocaleDateString("en-GB");
    const indiaTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const ReportData = await ReportInfoModel.findOne({ serviceId });

    if (!ReportData) {
      return res.status(404).json({ message: "Report Not Found" });
    }

    //update cash in Engg table------------
    if (JSON.parse(paymentdata).Payment_Method === "Cash") {
      await ServiceEnggBasicSchema.findOneAndUpdate(
        {
          EnggId: ReportData.EnggId,
        },
        { $inc: { AvailableCash: JSON.parse(paymentdata).Total_Amount } }
      );
    }
    const paymentPDF = req.files.report[0].key;

    ReportData.paymentDetils = paymentPDF;
    ReportData.isVerify = true;
    ReportData.isActive = false;
    ReportData.paymentMode = JSON.parse(paymentdata).Payment_Method;
    ReportData.TotalAmount = JSON.parse(paymentdata).Total_Amount;
    ReportData.Date = sparePartRequestDate;

    await ReportData.save();

    const SparePartsChanged = ReportData.questionsDetails.filter((question) => {
      const {
        isResolved,
        isSparePartRequest,
        sparePartDetail,
        SparePartDescription,
      } = question.questionResponse;
      const hasSparePartDetails =
        sparePartDetail.sparePartsType !== "" &&
        sparePartDetail.subsparePartspartid !== "";

      if (
        (isResolved && hasSparePartDetails) ||
        (isResolved && SparePartDescription !== "") ||
        !isResolved
      ) {
        if (!isSparePartRequest && hasSparePartDetails && isResolved) {
          return true;
        }
      }

      return false;
    });

    SparePartsChanged.forEach(async (sparePart) => {
      const sparePartId =
        sparePart.questionResponse.sparePartDetail.subsparePartspartid;
      const sparePartType =
        sparePart.questionResponse.sparePartDetail.sparePartsType;
      const sparePartRequestUpdate = await sparePartRequestTable.findOne({
        EnggId: ReportData.EnggId,
        sparePartId,
        Type: sparePartType,
      });
      if (sparePartRequestUpdate) {
        sparePartRequestUpdate.isApplied = true;
        sparePartRequestUpdate.save();
      }
    });

    const FilteredData = ReportData.questionsDetails.filter(
      (value) => value.questionResponse.isSparePartRequest === true
    );

    const result = await Promise.all(
      FilteredData.map(async (item) => {
        const { questionResponse } = item; // (todo for spare part id (Discuss in Enventory Modules)
        const newSparePartRequest = await sparePartRequestTable.create({
          EnggId: ReportData.EnggId,
          sparePartId: questionResponse.sparePartDetail.subsparePartspartid,
          quantity: 1,
          Type: questionResponse.sparePartDetail.sparePartsType,
          Description: questionResponse.SparePartDescription,
          RequestType: "On Site Request",
          sparePartName: questionResponse.sparePartDetail.sparePartsname,
          SubSparePartName:
            questionResponse.sparePartDetail.subsparePartspartname,
          Date: sparePartRequestDate,
        });
        // console.log("newSparePartRequest+++++++++++++++++++++++", newSparePartRequest);
        return questionResponse; // Return questionResponse
      })
    );

    //implement the logic here to raised new request its callback or service and update spare part details in callbackRequest and serviceRequest and refrence to service id-------
    const sparePartRequestedByEngg =
      result &&
      result.map((item) => ({
        sparePartId: item.sparePartDetail.subsparePartspartid,
        Type: item.sparePartDetail.sparePartsType,
        sparePartName: item.sparePartDetail.sparePartsname,
        SubSparePartName: item.sparePartDetail.subsparePartspartname,
      }));

    const checkitItCallback = await clientRequestImidiateVisit.findOne({
      callbackId: serviceId,
    });
    const checkitItService = await serviceRequest.findOne({
      RequestId: serviceId,
    });

    if (FilteredData.length > 0) {
      if (checkitItCallback) {
        await clientRequestImidiateVisit.create({
          JobOrderNumber: checkitItCallback.JobOrderNumber,
          // callbackId,
          callbackDate: date,
          callbackTime: indiaTime,
          TypeOfIssue: checkitItCallback.TypeOfIssue
            ? checkitItCallback.TypeOfIssue
            : "",
          Description: checkitItCallback.Description
            ? checkitItCallback.Description
            : "",
          RepresentativeName: checkitItCallback.RepresentativeName
            ? checkitItCallback.RepresentativeName
            : "",
          RepresentativeNumber: checkitItCallback.RepresentativeNumber
            ? checkitItCallback.RepresentativeNumber
            : "",
          //update spare part information in callback table
          sparePartDetails: sparePartRequestedByEngg,
          previousServiceId: serviceId,
        });
      }
      if (checkitItService) {
        await serviceRequest.create({
          JobOrderNumber: checkitItService.JobOrderNumber,
          // RequestId,
          RequestDate: date,
          RequestTime: indiaTime,
          TypeOfIssue: checkitItService.TypeOfIssue
            ? checkitItService.TypeOfIssue
            : "",
          //update spare part information in service table
          sparePartDetails: sparePartRequestedByEngg,
          previousServiceId: serviceId,
        });
      }
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const updateTaskStatusCallback = await callbackAssigntoEngg.findOne({
      callbackId: serviceId,
    });
    const updateTaskStatusServiceRequest = await serviceAssigtoEngg.findOne({
      RequestId: serviceId,
    });

    if (updateTaskStatusCallback) {
      updateTaskStatusCallback.ServiceProcess = "completed";
      let jon = updateTaskStatusCallback?.JobOrderNumber;
      let activeMembership = await memberShipTable.findOne({
        JobOrderNumber: jon,
        isDisable: false,
        isRenewed: false,
      });
      if (activeMembership) {
        activeMembership.callbacksCount =
          activeMembership.callbacksCount > 0
            ? activeMembership.callbacksCount + 1
            : 1;
        activeMembership.revenue =
          activeMembership.revenue > 0
            ? ReportData.TotalAmount + activeMembership.revenue
            : ReportData.TotalAmount;
        activeMembership.sparePartsSoldCount =
          activeMembership.sparePartsSoldCount || 0; // Ensure it's a number
        if (SparePartsChanged && SparePartsChanged.length > 0) {
          activeMembership.sparePartsSoldCount += SparePartsChanged.length;
        }
        await activeMembership.save();
      }
      await updateTaskStatusCallback.save();
    } else {
      updateTaskStatusServiceRequest.ServiceProcess = "completed";
      let jon = updateTaskStatusCallback?.JobOrderNumber;
      let activeMembership = await memberShipTable.findOne({
        JobOrderNumber: jon,
        isDisable: false,
        isRenewed: false,
      });

      if (activeMembership) {
        activeMembership.callbacksCount =
          activeMembership.SOScallsCount > 0
            ? activeMembership.SOScallsCount + 1
            : 1;
        activeMembership.revenue =
          activeMembership.revenue > 0
            ? ReportData.TotalAmount + activeMembership.revenue
            : ReportData.TotalAmount;
        activeMembership.sparePartsSoldCount || 0; // Ensure it's a number
        activeMembership.sparePartsSoldCount =
          activeMembership.sparePartsSoldCount || 0; // Ensure it's a number
        if (SparePartsChanged && SparePartsChanged.length > 0) {
          activeMembership.sparePartsSoldCount += SparePartsChanged.length;
        }
        await activeMembership.save();
      }
      await updateTaskStatusServiceRequest.save();
    }

    //-------------------------------------------------------------------------------
    const updateInCallbackTable = await clientRequestImidiateVisit.findOne({
      callbackId: serviceId,
    });
    const updateInServiceTable = await serviceRequest.findOne({
      RequestId: serviceId,
    });

    if (updateInCallbackTable) {
      updateInCallbackTable.isDead = true;
      await updateInCallbackTable.save();
    }
    if (updateInServiceTable) {
      updateInServiceTable.isDead = true;
      await updateInServiceTable.save();
    }

    return res
      .status(200)
      .json({ message: "Report Submitted Successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while updating status in report",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//Paras Code Starts 10/26/2024

//put request
module.exports.putEnggBreakDetails = async (req, res) => {
  try {
    console.log("req recieved");
    const { ServiceEnggId } = req.body;
    if (ServiceEnggId) {
      const date = new Date().toLocaleDateString("en-GB");

      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });

      console.log(result, "put record values");
      if (result) {
        if (time < "12:00:00") {
          //will save in firsthalf break
          if (result?.First_halfs_time && result?.First_halfe_time) {
            return res.status(200).json({
              status: "Warning",
              message: "You've already taken/finished your Break",
            });
          }

          let updatedTime;
          if (result.First_halfs_time) {
            updatedTime = { First_halfe_time: time };
          } else {
            updatedTime = { First_halfs_time: time };
          }
          const updatedRecord =
            await EnggAttendanceServiceRecord.findOneAndUpdate(
              {
                ServiceEnggId,
                Date: date,
              },
              updatedTime,
              { new: true }
            );

          if (updatedRecord?.First_halfe_time) {
            return res.status(200).json({
              status: "stop",
              message: "Break Ended Successfully",
              data: {
                first: false,
                lunch: false,
                second: false,
              },
            });
          }

          return res.status(200).json({
            status: "success",
            message: "Break Started Successfully",
            data: {
              first: true,
              lunch: false,
              second: false,
            },
          });
        } else if (time >= "12:00:00" && time < "16:00:00") {
          let updatedTime;
          //will save in lunch break
          if (result?.First_halfs_time && !result?.First_halfe_time) {
            updatedTime = { First_halfe_time: time };
            await EnggAttendanceServiceRecord.findOneAndUpdate(
              {
                ServiceEnggId,
                Date: date,
              },
              updatedTime,
              { new: true }
            );
            return res
              .status(200)
              .json({ status: "stop", message: "Break Ended Successfully" });
          }
          if (result?.Lunch_breaks_time && result?.Lunch_breake_time) {
            return res.status(200).json({
              status: "Warning",
              message: "You've already taken/finished your Break",
            });
          }
          if (result.Lunch_breaks_time) {
            updatedTime = { Lunch_breake_time: time };
          } else {
            updatedTime = { Lunch_breaks_time: time };
          }
          const updatedRecord =
            await EnggAttendanceServiceRecord.findOneAndUpdate(
              {
                ServiceEnggId,
                Date: date,
              },
              updatedTime,
              { new: true }
            );

          if (updatedRecord?.Lunch_breake_time) {
            return res.status(200).json({
              status: "stop",
              message: "Break Ended Successfully",
            });
          }

          return res.status(200).json({
            status: "success",
            message: "Break Started Successfully",
            data: {
              first: false,
              lunch: true,
              second: false,
            },
          });
        } else {
          //will save in second half break
          let updatedTime2;
          if (result?.First_halfs_time && !result?.First_halfe_time) {
            updatedTime2 = { First_halfe_time: time };
            await EnggAttendanceServiceRecord.findOneAndUpdate(
              {
                ServiceEnggId,
                Date: date,
              },
              updatedTime2,
              { new: true }
            );
            return res
              .status(200)
              .json({ status: "stop", message: "Stopped Previous Break" });
          } else if (result?.Lunch_breaks_time && !result?.Lunch_breake_time) {
            updatedTime2 = { Lunch_breake_time: time };
            await EnggAttendanceServiceRecord.findOneAndUpdate(
              {
                ServiceEnggId,
                Date: date,
              },
              updatedTime2,
              { new: true }
            );
            return res
              .status(200)
              .json({ status: "stop", message: "Break Ended Successfully" });
          }

          if (result?.Second_halfs_time && result?.Second_halfe_time) {
            return res.status(200).json({
              status: "Warning",
              message: "You've already taken/finished your Break",
            });
          }
          let updatedTime;
          if (result.Second_halfs_time) {
            updatedTime = { Second_halfe_time: time };
          } else {
            updatedTime = { Second_halfs_time: time };
          }
          const updatedRecord =
            await EnggAttendanceServiceRecord.findOneAndUpdate(
              {
                ServiceEnggId,
                Date: date,
              },
              updatedTime,
              { new: true }
            );

          if (updatedRecord?.Second_halfe_time) {
            return res.status(200).json({
              status: "stop",
              message: "Break Ended Successfully",
            });
          }

          return res.status(200).json({
            status: "success",
            message: "Break Started Successfully",
            data: {
              first: false,
              lunch: false,
              second: true,
            },
          });
        }
      } else {
        return res.status(400).json({
          status: "error",
          message: "Employee not Detected",
        });
      }
    } else {
      return res
        .status(500)
        .json({ error: "ServiceId not found / Try to login again !" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while updating status in report",
    });
  }
};
module.exports.getEnggBreakDetails = async (req, res) => {
  try {
    console.log(req.params, "Params");
    const { ServiceEnggId } = req.params;
    if (ServiceEnggId) {
      const date = new Date().toLocaleDateString("en-GB");
      console.log(date, "date", ServiceEnggId);
      const result = await EnggAttendanceServiceRecord.findOne({
        ServiceEnggId,
        Date: date,
      });

      console.log(result, "get request");
      let values = {
        FirstBreak: {},
        LunchBreak: {},
        SecondBreak: {},
      };
      if (result) {
        // For first half
        if (!result.First_halfs_time && !result.First_halfe_time) {
          values.FirstBreak = { play: false, time: "15" };
        } else if (result.First_halfs_time && result.First_halfe_time) {
          const remaintime = calculateTwotimedifference(
            result.First_halfs_time,
            result.First_halfe_time,
            15
          );
          values.FirstBreak = { play: false, time: remaintime };
        } else {
          const remaintime = calculateTimedifference(
            result.First_halfs_time,
            15
          );
          values.FirstBreak = { play: true, time: remaintime };
        }

        // for Lunch break
        if (result.Lunch_breaks_time && result.Lunch_breake_time) {
          const remaintime = calculateTwotimedifference(
            result.Lunch_breaks_time,
            result.Lunch_breake_time,
            30
          );
          console.log(remaintime, "remaining timwe");
          values.LunchBreak = { play: false, time: remaintime };
        } else if (result.Lunch_breaks_time && !result.Lunch_breake_time) {
          const remaintime = calculateTimedifference(
            result.Lunch_breaks_time,
            30
          );
          values.LunchBreak = { play: true, time: remaintime };
        } else {
          values.LunchBreak = { play: false, time: "30" };
        }

        // for Second half
        if (result.Second_halfs_time && result.Second_halfe_time) {
          const remaintime = calculateTwotimedifference(
            result.Second_halfs_time,
            result.Second_halfe_time,
            15
          );
          values.SecondBreak = { play: false, time: remaintime };
        } else if (result.Second_halfs_time && !result.Second_halfe_time) {
          const remaintime = calculateTimedifference(
            result.Second_halfs_time,
            15
          );
          values.SecondBreak = { play: true, time: remaintime };
        } else {
          values.SecondBreak = { play: false, time: "15" };
        }
        return res.status(200).json({ status: "success", data: values });
      } else {
        values = {
          FirstBreak: {
            play: false,
            time: "0",
          },
          LunchBreak: {
            play: false,
            time: "0",
          },
          SecondBreak: {
            play: false,
            time: "0",
          },
        };
        return res.status(200).json({ status: "success", data: values });
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid ServiceEnggId" });
    }
  } catch (error) {
    console.log(error, "Error of catch");
    return res
      .status(500)
      .json({ error: "Internal server error ! Contact Developer." });
  }
};
//--------------------------------------------------------------------------------------------------------------------------------
//==================================================================
//==================================================================

module.exports.getReportDataForFinalSubmmitPage = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const ReportData = await ReportInfoModel.findOne({ serviceId });
    if (!ReportData) {
      res.status(400).json({ message: "Report not Found" });
    }

    const transformedData = ReportData.questionsDetails.reduce((acc, item) => {
      if (!acc[item.subcategoryname]) {
        acc[item.subcategoryname] = [];
      }

      let resolved = "";

      if (
        item.questionResponse.sparePartDetail.sparePartsType === "" &&
        item.questionResponse.sparePartDetail.subsparePartspartid === "" &&
        item.questionResponse.isResolved
      ) {
        resolved = "Already resolved";
      } else {
        resolved = item.questionResponse.isResolved ? "Yes" : "No";
      }

      acc[item.subcategoryname].push({
        questionId: item.questionId,
        questionname: item.questionResponse.questionName,
        resolvedstatus: resolved,
      });

      return acc;
    }, {});

    res.json(transformedData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error ! Contact Developer." });
  }
};

//====================================================Razorpay-api-starts=======================================================================
//amit on 01/05/2024 ---

//function to create razor-Pay instance
// //Done, Touch this api at your own risk.

// module.exports.clientPayment = async (req, res) => {
//   try {
//     const { amount, currency, JON } = req.body;

//     if (!amount || !currency) {
//       return res
//         .status(400)
//         .json({ message: "Amount and currency are required." });
//     }
//     const receipt = JON || "receipt#1";

//     const instance = new Razorpay({
//       key_id: process.env.key_id,
//       key_secret: process.env.key_secret,
//     });

//     const order = await instance.orders.create({
//       amount: amount,
//       currency: currency,
//       receipt: receipt,
//       partial_payment: false,
//     });

//     if (order.statusCode === 400) {
//       return res
//         .status(400)
//         .json({ message: "Something Went Wrong", data: order });
//     }
//     return res
//       .status(200)
//       .json({ message: "Order created successfully", data: order });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server Error enggPayment" });
//   }
// };

//amit on 2/05/2024 and 3/05/2024
//function for the paymentLink generation and verification

//Done, Touch this api at your own risk.
module.exports.paymentLink = async (req, res) => {
  try {
    const { amount, currency, description, name, contact, serviceId } =
      req.body;

    if (!amount || !currency || !name || !contact || !serviceId) {
      return res.status(400).json({
        message:
          "Amount , currency , name , contact and serviceId are required.",
      });
    }
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const data = await ReportInfoModel.findOne({ serviceId });

    if (data.payment_id && data.paymentType === "Link") {
      const id = data.payment_id;
      const response = await instance.paymentLink.fetch(id);
      if (response.status === "created") {
        return res.status(200).json({ type: "Link", data: response });
      } else if (response.status === "paid") {
        return res
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      }
    }

    const Time = new Date();
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const fiveMinutesInSeconds = 17 * 60;

    const newTimestamp = currentTimestamp + fiveMinutesInSeconds;

    const response = await instance.paymentLink.create({
      amount: amount,
      currency: currency,
      description: description || "service payment",
      expire_by: newTimestamp,
      customer: {
        name: name,
        email: " ",
        contact: contact,
      },
      notify: {
        sms: true,
        email: false,
      },
      reminder_enable: true,
    });

    const isoTimeString = new Date(Time).toISOString();
    await ReportInfoModel.findOneAndUpdate(
      { serviceId },
      {
        paymentType: "Link",
        payment_id: response.id,
        paymentTime: isoTimeString,
      }
    );
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in paymentLink ! Contact Developer",
      error: error,
    });
  }
};
//just for testing! Done, Touch this api at your own risk.
module.exports.verifyPaymentLink = async (req, res) => {
  try {
    const { razorpayLink } = req.body;

    console.log("pankaj mirat ", razorpayLink)

    if (!razorpayLink) {
      return res.status(400).json({ message: "razorpayLink is required." });
    }

    console.log({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    })

    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const response = await instance.paymentLink.fetch(razorpayLink);
    if (!response) {
      return res.status(404).json({ message: "Payment link not found." });
    }


    return res.status(200).json({ response });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error in verifyPaymentLink! Contact Developer.",
      error: error,
    });
  }
};
//Done, Touch this api at your own risk.`
module.exports.generatePaymentQr = async (req, res) => {
  try {
    const { amount, JobOrderNumber, serviceId } = req.body;

    if (!amount || !JobOrderNumber || !serviceId) {
      return res.status(400).json({
        message: "Amount , JobOrderNumbe and serviceId are required.",
      });
    }
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });
    const data = await ReportInfoModel.findOne({ serviceId });
    if (data.payment_id && data.paymentType === "Qr") {
      const id = data.payment_id;
      const response = await instance.qrCode.fetch(id);
      if (response.status === "active") {
        return res.status(200).json({ type: "Qr", response: response });
      } else if (
        response.status === "closed" &&
        response.close_reason === "paid"
      ) {
        return res
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      }
    }

    const client = await clientDetailSchema.findOne({
      JobOrderNumber: JobOrderNumber,
    });

    let customerid = client.Razorpay_customer_ID;

    if (!customerid) {
      const customer = await instance.customers.create({
        name: client.name,
        contact: client.PhoneNumber,
        email: "",
        fail_existing: 0,
      });

      customerid = customer.id;

      await clientDetailSchema.findOneAndUpdate(
        { JobOrderNumber },
        { Razorpay_customer_ID: customerid }
      );
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const fiveMinutesInSeconds = 5 * 60;

    const newTimestamp = currentTimestamp + fiveMinutesInSeconds;

    const response = await instance.qrCode.create({
      type: "upi_qr",
      name: "Store Front Display",
      usage: "single_use",
      fixed_amount: true,
      payment_amount: amount,
      description: "For Service Payment",
      customer_id: customerid,
      close_by: newTimestamp,
      notes: {
        purpose: "Service Payment",
      },
    });
    const Time = new Date();
    const isoTimeString = new Date(Time).toISOString();
    await ReportInfoModel.findOneAndUpdate(
      { serviceId },
      { paymentType: "Qr", payment_id: response.id, paymentTime: isoTimeString }
    );
    return res.status(200).json({ status: "success", response: response });
  } catch (error) {
    console.error("Error in generatePaymentQr:", error);
    return res.status(500).json({
      message: "Internal server error in generatePaymentQr! Contact Developer.",
      error: error,
    });
  }
};
//Done, Touch this api at your own risk.
module.exports.getPaymentStatus = async (req, res) => {
  try {
    const { serviceId } = req.body;
    if (!serviceId) {
      return res.status(400).json({ message: "serviceId is required." });
    }
    const data = await ReportInfoModel.findOne({ serviceId });
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    if (data.paymentType === "Qr") {
      const id = data.payment_id;
      const response = await instance.qrCode.fetch(id);

      if (response.status === "active") {
        return res.status(200).json({ type: "Qr", response: response });
      } else if (
        response.status === "closed" &&
        response.close_reason === "paid"
      ) {
        return res
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      } else {
        return res.status(400).json({ status: "error", message: "expired" });
      }
    }
    if (data.paymentType === "Link") {
      const id = data.payment_id;
      const response = await instance.paymentLink.fetch(id);

      if (response.status === "created") {
        return res.status(200).json({ type: "Link", response: response });
      } else if (response.status === "paid") {
        return res
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      } else {
        return res.status(400).json({ status: "error", message: "expired" });
      }
    }
    return res
      .status(400)
      .json({ status: "error", message: "payment not initiated" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in verifyPaymentLink! Contact Developer.",
      error: error,
    });
  }
};

//Done, touch this api at your own risk
module.exports.resendPaymentLink = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        status: "error",
        message: "serviceId is required.",
      });
    }
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const data = await ReportInfoModel.findOne({ serviceId });
    if (data) {
      if (data.payment_id) {
        const id = data.payment_id;

        const response = await instance.paymentLink.fetch(id);
        if (response.status === "created") {
          const Timestamp = new Date();
          Timestamp.setMinutes(Timestamp.getMinutes() + 2);

          const fTimestamp = new Date(data.paymentTime);

          const timeDifference = Math.abs(Timestamp - fTimestamp) / 1000;
          if (timeDifference < 120) {
            return res
              .status(400)
              .json({ status: "error", time_left: timeDifference });
          } else {
            if (data.payment_id) {
              const response = await instance.paymentLink.notifyBy(
                data.payment_id,
                "sms"
              );
              const fTimestamp = new Date();
              fTimestamp.setMinutes(fTimestamp.getMinutes() + 2);
              data.paymentTime = fTimestamp.toISOString();
              await data.save();
              return res
                .status(200)
                .json({ status: "success", data: response });
            }
          }
        } else if (response.status === "paid") {
          return res
            .status(200)
            .json({ status: "success", message: "Payment successful" });
        } else {
          return res.status(400).json({
            status: "error",
            message: "Link is Expired",
          });
        }
      }
    }
    return res.status(400).json({
      status: "error",
      message: "resend failed no existing payment Link found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in resendPaymentLink! Contact Developer.",
      error: error,
    });
  }
};

//Done, Touch this api at your own risk.
module.exports.updatePaymentStatus = async (req, res) => {
  try {
    const { serviceId } = req.body;
    // console.log(serviceId);
    if (!serviceId) {
      return res.status(400).json({ message: "serviceId is required." });
    }
    const data = await ReportInfoModel.findOne({ serviceId });
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    if (data.paymentType === "Qr") {
      const id = data.payment_id;
      const response = await instance.qrCode.fetch(id);

      if (response.status === "active") {
        await instance.qrCode.close(id);
        data.payment_id = " ";
        data.paymentType = " ";
        await data.save();
      } else if (
        response.status === "closed" &&
        response.close_reason === "paid"
      ) {
        return res
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      }
    }
    if (data.paymentType === "Link") {
      const id = data.payment_id;
      const response = await instance.paymentLink.fetch(id);

      if (response.status === "created") {
        await instance.paymentLink.cancel(id);
        data.payment_id = " ";
        data.paymentType = " ";
        await data.save();
      } else if (response.status === "paid") {
        return res
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      }
    }
    return res.status(200).json({ status: "success", message: "Pass" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Internal server error in updatePaymentStatus! Contact Developer.",
      error: error,
    });
  }
};
//=======================================================Razorpay-api-ends====================================================================

module.exports.canclePaymentLink = async (req, res) => {
  const { serviceId } = req.body;

  const data = await ReportInfoModel.findOne({ serviceId });

  if (!data) {
    return res.status(404).json({ message: "No data found" });
  }

  const instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });

  try {
    if (data.paymentType === "Qr") {
      const id = data.payment_id;
      const response = await instance.qrCode.fetch(id);
      if (response.status === "active") {
        await instance.qrCode.close(id);
        data.payment_id = " ";
        data.paymentType = " ";
        await data.save();
        return res.status(200).json({
          status: "success",
          message: "Payment Qr cancelled Successfully.",
        });
      } else if (
        response.status === "closed" &&
        response.close_reason === "paid"
      ) {
        return res
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      }
    } else if (data.paymentType === "Link") {
      const id = data.payment_id;
      const response = await instance.paymentLink.fetch(id);
      console.log("response ==== >>>> ", response);
      if (response.status === "created") {
        await instance.paymentLink.cancel(id);
        data.payment_id = " ";
        data.paymentType = " ";
        await data.save();
        return res.status(200).json({
          status: "success",
          message: "Payment Link cancelled Successfully.",
        });
      } else if (response.status === "captured" || response.status === "paid") {
        return res``
          .status(200)
          .json({ status: "success", message: "Payment already done" });
      }
    }
  } catch (error) {
    console.log("this is the error", error);
    res.status(204).json({ status: "error", message: error });
  }
};

//-------------------------------------------------------------------------------------------------------------

//API TO GET PERVIOS PENDING SERVICES --------------------------------------

module.exports.getAllClientPreviousService = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;

    const currentDate = new Date();
    const todayDate = currentDate.toLocaleDateString("en-GB");
    const EnggCallback = await ServiceAssigntoEngg.find({ ServiceEnggId });
    const EnggService = await AssignSecheduleRequest.find({ ServiceEnggId });

    if (EnggCallback.length === 0 && EnggService.length === 0) {
      return res.status(400).json({ message: "no callBack is assign to Engg" });
    }

    const allServices = [...EnggCallback, ...EnggService];

    const PreviousServices = allServices.filter((item) => {
      return item.Date < todayDate && item.ServiceProcess === "InCompleted";
    });

    const RemainingAccepctedServices = await Promise.all(
      PreviousServices.map(async (item) => {
        const report = await ReportInfoModel.findOne({
          serviceId: item.RequestId ? item.RequestId : item.callbackId,
        });

        if (report && report.Steps >= 2) {
          //FIXME:
          return item;
        }
        return null;
      })
    );

    const resultService = RemainingAccepctedServices.filter(
      (service) => service !== null
    );

    const convertIntoMinutes = (timeRange) => {
      const [start, end] = timeRange.split("-");
      const [startHour, startMinute] = end.split(":").map(Number);
      return startHour * 60 + startMinute;
    };

    const EngScheduleData = await Promise.all(
      resultService.map(async (item) => {
        const clientDetails = await clientDetailSchema
          .find({ JobOrderNumber: item.JobOrderNumber })
          .select("name Address PhoneNumber");
        const EnggDetails = await ServiceEnggBasicSchema.find({
          EnggId: item.ServiceEnggId,
        }).select("EnggName");

        //make the engg time logic
        const enggTimeInCallback = await ServiceAssigntoEngg.find({
          ServiceEnggId: item.ServiceEnggId,
          Date: todayDate,
        }).select("Slot");
        const enggTimeInService = await AssignSecheduleRequest.find({
          ServiceEnggId: item.ServiceEnggId,
          Date: todayDate,
        }).select("Slot");

        const enggTodaysFirstSlotAssign = [
          ...enggTimeInCallback,
          ...enggTimeInService,
        ];
        const enggSortedSlot = enggTodaysFirstSlotAssign.sort((a, b) => {
          const aStart =
            a.Slot && a.Slot[0] ? convertIntoMinutes(a.Slot[0]) : Infinity;
          const bStart =
            b.Slot && b.Slot[0] ? convertIntoMinutes(b.Slot[0]) : Infinity;
          return aStart - bStart;
        });

        let Type;

        if (item.callbackId) {
          Type = await clientRequestImidiateVisit
            .findOne({
              callbackId: item.callbackId,
            })
            .select("Type");
        } else {
          Type = await serviceRequest
            .findOne({ RequestId: item.RequestId })
            .select("Type");
        }

        return {
          ...item._doc,
          clientDetails,
          EnggDetails,
          Type,
          todayEnggFirstSlot: enggSortedSlot[0],
        };
      })
    );

    res.status(200).json({ PendingServices: EngScheduleData });
  } catch (error) {
    console.log("this is the error", error);
    res.status(204).json({ status: "error", message: error });
  }
};

//--------------------------------service Engg login with OTP ----------------------------------------
// api to handle service Engg login with OTP
module.exports.serviceEnggLoginWithOtp = async (req, res) => {
  try {
    const { EnggId, PhoneNumber } = req.body;
    const Engineer = await ServiceEnggBasicSchema.findOne({
      EnggId,
      PhoneNumber,
    });

    if (!Engineer) {
      return res.status(200).json({ message: "Phone Number is not matched" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    // Save OTP details to the database
    const response = await OtpDetails.create({
      otp: otp,
      ServiceEnggId: EnggId,
      createdAt: Date.now(),
      expiresAt: Date.now() + 900000,
    });

    // const apiKey = process.env.MESSAGE_API_KEY;
    // console.log("---------------------------------",apiKey);
    // const axiosConfig = {
    // headers: {
    // authorization: apiKey,
    // "Content-Type": "application/json",
    // },
    // };
    // const data = {
    // variables_values: otp,
    // route: "otp",
    // numbers: PhoneNumber,
    // };

    // fast to SMS service is not working now : ToDo : fix the registration problem.................(TODO:)
    // Send request to Fast2SMS API
    // const response1 = await axios.post("https://www.fast2sms.com/dev/bulkV2",axiosConfig,data);
    // const response23 = await axios.post(
    // "https://www.fast2sms.com/dev/bulkV2",
    // {
    // variables_values: otp,
    // route: "otp",
    // numbers: PhoneNumber,
    // },
    // {
    // headers: {
    // authorization: apiKey,
    // "Content-Type": "application/json",
    // },
    // }
    // );

    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log("this is the error", error);
    res.status(500).json({ message: "errro while login with OTP" });
  }
};
//------------------------------------------------------------------------------------------------------------

// verify Engg OTP while logion with mobile device

module.exports.verifyEnggOTPWhileLogingWithMobileDevice = async (req, res) => {
  try {
    const { ServiceEnggId, otp } = req.body;

    const useOTPVerificationRecords = await OtpDetails.findOne({
      ServiceEnggId,
    });


    if (useOTPVerificationRecords.length <= 0) {
      return res.status(404).json({
        message: "Account record does not exist, or has been verified already",
      });
    }

    const expiresAt = useOTPVerificationRecords.expiresAt;

    if (expiresAt < Date.now()) {
      await OtpDetails.deleteMany({ ServiceEnggId });
      return res
        .status(401)
        .json({ message: "OTP expired. Please generate a new one." });
    }

    if (useOTPVerificationRecords.otp === otp) {
      await OtpDetails.deleteMany({ ServiceEnggId });
      return res.status(200).json({ message: "OTP verify successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }

  } catch (error) {
    console.log("this is the error", error);
    res.status(500).json({ message: "errro while Verifying with OTP" });
  }
};
