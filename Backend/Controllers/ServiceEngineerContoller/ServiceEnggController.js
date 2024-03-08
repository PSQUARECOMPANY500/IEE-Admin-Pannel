const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const callbackAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const serviceAssigtoEngg = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const { generateEnggToken } = require('../../Middleware/ServiceEnggAuthMiddleware')

const EnggLocationModel = require("../../Modals/LocationModel/EnggLocationSchema");

const ServiceAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const AssignSecheduleRequest = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const clientDetailSchema = require("../../Modals/ClientDetailModals/RegisterClientDetailSchema");

const clientRequestImidiateVisit = require("../../Modals/ServicesModal/ClinetCallback")

const serviceRequest = require("../../Modals/ServicesModal/ClientServicesRequest")

const EnggAttendanceServiceRecord = require("../../Modals/ServiceEngineerModals/Attendance")

const EnggLeaveServiceRecord = require("../../Modals/ServiceEngineerModals/EnggLeaveSchema")

const OtpDetails = require("../../Modals/OTP/Otp")
const Report = require("../../Modals/Report/ReportSchema");

const CheckList = require("../../Modals/ChecklistModal/ChecklistModal")

const axios = require("axios");
require("dotenv").config();
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
module.exports.loginEngg = async (req, res) => {
  try {
    const { EnggId, password } = req.body;

    // console.log(EnggId,password)

    //firstly check the Engg is exist or not
    const Engg = await ServiceEnggBasicSchema.findOne({ EnggId });

    if (!Engg || Engg.EnggPassword !== password) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const token = generateEnggToken({ EnggId });
    res.json({ Engg, success: true, allotedAdmin: "65e0103005fd2695f3aaf6d4", adminName: "Parabh Simaran", token })


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
}

//-------------------------------------------------------------------------------------------------------------------------------------------------
//api for location  we need to integrate this with engg attendance

module.exports.createEnggLocation = async (req, res) => { // onswipe of the engg update allotdetails , jobordernumber(if joborder number is not present create a new array) starting and ending location 
  try {
    const { ServiceEnggId, JobOrderNumber, latitude, longitude } = req.body;
    if (ServiceEnggId && JobOrderNumber && latitude && longitude) {
      const AttendanceCreatedDate = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];

      let enggLocation = await EnggLocationModel.findOne({ ServiceEnggId, AttendanceCreatedDate });
      if (enggLocation) {
        // EnggLocation found, iterate over AllotDetails array
        let jobOrderFound = false;
        for (let i = 0; i < enggLocation.AllotDetails.length; i++) {
          if (enggLocation.AllotDetails[i].JobOrderNumber === JobOrderNumber && enggLocation.AllotDetails[i].createdDate === AttendanceCreatedDate) {
            // JobOrderNumber found, update startingLocation coordinates
            enggLocation.AllotDetails[i].startingLocation.coordinates = [latitude, longitude];
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
              coordinates: [latitude, longitude]
            },
            endingLocation: { type: "Point", coordinates: [] },
            createdDate: AttendanceCreatedDate
          });
        }
        await enggLocation.save();
        res.status(200).json({ message: "EnggLocation updated successfully" });
      } else {
        res.status(404).json({ message: "No Engg data found for the current date" });
      }
    }
  }
  catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Internal server error in Location creation" });
  }
}

module.exports.CreateEnggLocationOnAttendance = async (req, res) => {
  //this is the api to update current locations(real time )
  try {

    /* Attendances logic hear */
    const { ServiceEnggId, latitude, longitude } = req.body;

    if (ServiceEnggId && latitude && longitude) {
      const AttendanceCreatedDate = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];
      const response = await EnggLocationModel.findOneAndUpdate({ ServiceEnggId, AttendanceCreatedDate }, {
        currentLocation: { type: "Point", coordinates: [latitude, longitude] }
      })
      //console.log(response)
      if (!response) {
        await EnggLocationModel.create({
          ServiceEnggId,
          //mark Attandance Logic here
          currentLocation: { type: "Point", coordinates: [latitude, longitude] }
        })
      }
      res.status(200).json({ message: "Attendance marked and Location connection started" });
    }
    else {
      res.status(400).json({
        message: "400 Bad Request"
      })
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Internal server error in Location creation" });
  }
}



module.exports.getEnggLocationDetail = async (req, res) => {
  try {
    const AttendanceCreatedDate = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0];
    const enggDetail = await EnggLocationModel.find({ AttendanceCreatedDate });
    if (!enggDetail) {
      return res.status(404).json({
        message: "No services Engg found for the specified date",
      });
    }
    const serviceEnggId = await Promise.all(enggDetail.map(async (detail) => {
      return await ServiceEnggBasicSchema.findOne({ EnggId: detail.ServiceEnggId });
    }));

    console.log((serviceEnggId))


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
}

//api for the engg app i.e seduled with the daily task
module.exports.getEngScheduleData = async (req, res) => {
  try {
    const { ServiceEnggId } = req.body;
    const currentDate = new Date();
    const todayDate = currentDate.toLocaleDateString('en-GB');


    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDateString = tomorrowDate.toLocaleDateString('en-GB');


    const serviceAssignments = await ServiceAssigntoEngg.find({
      ServiceEnggId: ServiceEnggId,
      Date: { $in: [todayDate, tomorrowDateString] }
    });

    const assignScheduleRequests = await AssignSecheduleRequest.find({
      ServiceEnggId: ServiceEnggId,
      Date: { $in: [todayDate, tomorrowDateString] }
    });


    const clientDetailsCallbackRequest = await Promise.all(serviceAssignments.map(async (data) => {
      const callbackid = data.callbackId;
      const value = await clientRequestImidiateVisit.findOne({ callbackId: callbackid });
      return { ServiceEnggId: data.ServiceEnggId, JobOrderNumber: data.JobOrderNumber, Slot: data.Slot, Message: data.Message, TaskStatus: data.ServiceProcess, Date: data.Date, TypeOfIssue: value.TypeOfIssue, Description: value.Description, Type: value.Type };
    }));

    const clientDetailsServiceRequest = await Promise.all(assignScheduleRequests.map(async (data) => {
      const callbackid = data.callbackId;
      const value = await serviceRequest.findOne({ callbackId: callbackid });
      return { ServiceEnggId: data.ServiceEnggId, JobOrderNumber: data.JobOrderNumber, Slot: data.Slot, Message: data.Message, TaskStatus: data.ServiceProcess, Date: data.Date, TypeOfIssue: value.TypeOfIssue, Description: value.Description, Type: value.Type };
    }));

    const mainDetails = clientDetailsCallbackRequest.concat(clientDetailsServiceRequest).map((data) => ({

      ServiceEnggId: data.ServiceEnggId,
      JobOrderNumber: data.JobOrderNumber,
      Slot: data.Slot,
      Date: data.Date,
      Message: data.Message,
      TaskStatus: data.TaskStatus,
      TypeOfIssue: data.TypeOfIssue,
      Description: data.Description,
      Type: data.Type
    }));

    const filteredServiceAssignmentsWithClientName = await Promise.all(mainDetails.map(async (assignment) => {
      const client = await clientDetailSchema.findOne({ JobOrderNumber: assignment.JobOrderNumber });
      return { ...assignment, ClientName: client?.name, ClientNumber: client?.PhoneNumber, ClientAddress: client?.Address, ClientPhoto: client?.ProfileImage };
    }));

    filteredServiceAssignmentsWithClientName.sort((a, b) => {

      const dateA = new Date(a.Date.split('/').reverse().join('-'));
      const dateB = new Date(b.Date.split('/').reverse().join('-'));


      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;


      const timeA = convertTimeToSortableFormat(a.Slot[0]);
      const timeB = convertTimeToSortableFormat(b.Slot[0]);
      return timeA - timeB;
    });


    res.status(200).json({ EngScheduleData: filteredServiceAssignmentsWithClientName, });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in getEnggAssignDetails" });
  }
}

function convertTimeToSortableFormat(time) {

  const [startTime, endTime] = time.split('-').map(slot => slot.trim().split(':').map(part => parseInt(part)));
  return startTime[0] * 60 + (startTime[1] + (startTime[0] >= 12 ? 12 : 0)) * 60 + (startTime[0] >= 12 ? 720 : 0) + (startTime[0] === 12 ? -720 : 0);

}

//...................................................................................................................................
//api for the attendance checkin and checkout
module.exports.EnggTime = async (req, res) => {
  try {
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: '2-digit',
        hour12: false
      });
      return res.status(201).json({ time:time });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in EnggTime" });
  }
};

module.exports.EnggCheckIn = async (req, res) => {
  //console.log("req of checkin",req.params.ServiceEnggId)
  try {
    const images = req.files;
    const frontimagename = images?.frontimage[0].filename;
    const backimagename = images?.backimage[0].filename;
    const {IsAttendance} = req.body;
    const ServiceEnggId = req.params.ServiceEnggId;
    if (IsAttendance && ServiceEnggId) {
      const enggPhoto = frontimagename+ " " + backimagename;
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: '2-digit',
        hour12: false
      });
      const CheckIn = await EnggAttendanceServiceRecord.create({
        IsAttendance: IsAttendance,
        ServiceEnggId: ServiceEnggId,
        Check_In: {
          engPhoto: enggPhoto,
          time: time,
        }
      });
      return res.status(201).json({time});
    }
    return res.status(500).json({ error: "ServiceEnggId or IsAttendance not find" });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ error: "Internal server error in EnggCheckIn" });
  }
};

module.exports.EnggCheckOut = async (req, res) => {
  //console.log("req of checkout",req)
  try {
    const images = req.files;
    const frontimagename = images?.frontimage[0].filename;
    const backimagename = images?.backimage[0].filename;
    const ServiceEnggId = req.params.ServiceEnggId;
    if (ServiceEnggId) {
      const enggPhoto = frontimagename+ " " + backimagename;
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: '2-digit',
        hour12: false
      });
      const date = new Date().toLocaleDateString('en-GB');

      const CheckIn = await EnggAttendanceServiceRecord.findOneAndUpdate({ ServiceEnggId, Date: date }, {
        Check_Out: {
          engPhoto: enggPhoto,
          time: time
        }
      });
     return res.status(201).json({time});
    }
    return res.status(500).json({ error: "ServiceEnggId not find" });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ error: "Internal server error in EnggCheckOut" });
  }
};

module.exports.EnggOnFirstHalfBreak = async (req, res) => {
  try {
    const { ServiceEnggId, isStart } = req.body;
    if (ServiceEnggId) {
    const time = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: '2-digit',
      hour12: false
    });
    const date = new Date().toLocaleDateString('en-GB');
    const update = {
      [isStart ? "First_halfs_time" : "First_halfe_time"]: time,
    }

    const checkBreak = await EnggAttendanceServiceRecord.findOne({ServiceEnggId, Date: date});
    if(checkBreak.First_halfs_time  && checkBreak.First_halfe_time){
      return res.status(200).json({time:"0 min"})
    }

    if(!checkBreak.First_halfs_time  && !checkBreak.First_halfe_time){
      const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
        { ServiceEnggId, Date: date },
        update,
        { new: true }
      );

      return res.status(200).json({time:"15 min"})
      //point where start time will get update
    }

    if(checkBreak.First_halfs_time  && !checkBreak.First_halfe_time){
      if(!isStart){
        const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
          { ServiceEnggId, Date: date },
          update,
          { new: true }
        ); 
        return res.status(200).json({time:"0 min"})
      }     
      const [hour, minut, ] = time.split(":");
      const [hour1, minut1, ] = checkBreak.First_halfs_time.split(":");

      if (hour === hour1) {
        const remaningmin = minut - minut1;
        return res.status(200).json( remaningmin + "min")
      }
      if(hour > hour1){
        const rhour =hour-hour1;
        const rminut = 60 - parseInt(minut1);
        const finalrminut = parseInt(minut) + parseInt(rminut);
        const finalTimeInMinut = parseInt(finalrminut) + (parseInt(rhour)*60);
        return res.status(200).json(finalTimeInMinut+ "min")
      }
      //point where endtime will get update 
    }
  }
  return res.status(500).json({ error: "ServiceEnggId and isStart not found inFirst_half" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in First_half" });
  }
};



module.exports.EnggOnSecondHalfBreak = async (req, res) => {
  try {
    const { ServiceEnggId, isStart } = req.body;
    if (ServiceEnggId) {
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: '2-digit',
        hour12: false
      });

      const date = new Date().toLocaleDateString('en-GB');
      const update = {
        [isStart ? "Second_halfs_time" : "Second_halfe_time"]: time,
      }

      const checkBreak = await EnggAttendanceServiceRecord.findOne({ServiceEnggId, Date: date});
    if(checkBreak.Second_halfs_time  && checkBreak.Second_halfe_time){
      return res.status(200).json({time:"0 min"})
    }

    if(!checkBreak.Second_halfs_time  && !checkBreak.Second_halfe_time){
      const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
        { ServiceEnggId, Date: date },
        update,
        { new: true }
      );

      return res.status(200).json({time:"15 min"})
    }

    if(checkBreak.Second_halfs_time  && !checkBreak.Second_halfe_time){
      if(!isStart){
        const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
          { ServiceEnggId, Date: date },
          update,
          { new: true }
        ); 
        return res.status(200).json({time:"0 min"})
      }     
      const [hour, minut, ] = time.split(":");
      const [hour1, minut1, ] = checkBreak.Second_halfs_time.split(":");

      if (hour === hour1) {
        const remaningmin = minut - minut1;
        return res.status(200).json( remaningmin + "min")
      }
      if(hour > hour1){
        const rhour =hour-hour1;
        const rminut = 60 - parseInt(minut1);
        const finalrminut = parseInt(minut) + parseInt(rminut);
        const finalTimeInMinut = parseInt(finalrminut) + (parseInt(rhour)*60);
        return res.status(200).json(finalTimeInMinut+ "min")
      }
      //point where endtime will get update 
    }

  }
    return res.status(500).json({ error: "ServiceEnggId and isStart not found in Second_half" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in Second_half" });
  }
};

module.exports.EnggOnLunchBreak = async (req, res) => {
  try {
    const { ServiceEnggId, isStart } = req.body;
    if( ServiceEnggId){
      const time = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: '2-digit',
        hour12: false
      });
      const date = new Date().toLocaleDateString('en-GB');

      
      const update =  {
        [isStart ? "Lunch_breaks_time" : "Lunch_breake_time"]: time,
      }
  
      const checkBreak = await EnggAttendanceServiceRecord.findOne({ServiceEnggId, Date: date});
    if(checkBreak.Lunch_breaks_time  && checkBreak.Lunch_breake_time){
      return res.status(200).json({time:"0 min"})
    }

    if(!checkBreak.Lunch_breaks_time  && !checkBreak.Lunch_breake_time){
      const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
        { ServiceEnggId, Date: date },
        update,
        { new: true }
      );

      return res.status(200).json({time:"30 min"})
      //point where start time will get update
    }

    if(checkBreak.Lunch_breaks_time  && !checkBreak.Lunch_breake_time){
      if(!isStart){
        const Break = await EnggAttendanceServiceRecord.findOneAndUpdate(
          { ServiceEnggId, Date: date },
          update,
          { new: true }
        ); 
        return res.status(200).json({time:"0 min"})
      }     
      const [hour, minut, ] = time.split(":");
      const [hour1, minut1, ] = checkBreak.Lunch_breaks_time.split(":");

      if (hour === hour1) {
        const remaningmin = minut - minut1;
        return res.status(200).json( remaningmin + "min")
      }
      if(hour > hour1){
        const rhour =hour-hour1;
        const rminut = 60 - parseInt(minut1);
        const finalrminut = parseInt(minut) + parseInt(rminut);
        const finalTimeInMinut = parseInt(finalrminut) + (parseInt(rhour)*60);
        return res.status(200).json(finalTimeInMinut+ "min")
      }
    }
  }
    return res.status(500).json({ error: "ServiceEnggId and isStart not found in Break" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in Break" });
  }
};


module.exports.enggLeaveServiceRequest = async (req, res) => {
  try {
    const { ServiceEnggId, TypeOfLeave, From, To, Leave_Reason, document } = req.body;
    if (ServiceEnggId && TypeOfLeave && From && To && Leave_Reason && document) {

      const response = await EnggLeaveServiceRecord.create({
        ServiceEnggId,
        TypeOfLeave,
        Duration: { From: From, To: To, },
        Leave_Reason,
        Document: document
      })

      return res.status(201).json({ response });
    }
    else {
      return res.status(404).json({ message: "Please Provide Valid Details" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in enggLeaveServiceRequest" });
  }
};


module.exports.enggLeaveRecord = async (req, res) => {
  try {
    const { ServiceEnggId } = req.body;

    const response = await EnggLeaveServiceRecord.find({ ServiceEnggId })

    if (response.length === 0) {
      return res.status(404).json({ message: "No Leave Record Found" });
    }
    res.status(201).json({ response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in enggLeaveRecord" });
  }
};


module.exports.validateOtpForClient = async (req, res) => {
  try {
    const { Otp, ServiceEnggId, JobOrderNumber } = req.body;
    if (Otp && ServiceEnggId && JobOrderNumber) {
      const response = await OtpDetails.findOne({ otp: Otp, ServiceEnggId, JobOrderNumber })
      if (response) {
        return res.status(200).json({ sucess: true });
      } else {
        return res.status(404).json({ sucess: false })
      }
    }
    return res.status(500).json({ error: "Enter valid data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in validateOtpForClient" });
  }
}


module.exports.generateOtpForClient = async (req, res) => {
  try {
    const { ServiceEnggId, JobOrderNumber, PhoneNumber } = req.body;

    if (ServiceEnggId && JobOrderNumber && PhoneNumber) {
      const otp = Math.floor(1000 + Math.random() * 9000);

      // Save OTP details to the database
      const response = await OtpDetails.create({
        otp: otp,
        ServiceEnggId: ServiceEnggId,
        JobOrderNumber: JobOrderNumber
      });
      if (response) {
        const timer = 15 * 60 * 1000;

        setTimeout(async () => {
          await OtpDetails.findByIdAndDelete({ _id: response._id })
        }, timer)
      }
      // Prepare data and config for the API request

      const apiKey = process.env.MESSAGE_API_KEY;
     // console.log(apiKey, typeof (apiKey));
      const axiosConfig = {
        headers: {
          "authorization": apiKey,
          "Content-Type": "application/json"
        }
      };
      const data = {
        "variables_values": otp,
        "route": "otp",
        "numbers": PhoneNumber,
      };

      // Send request to Fast2SMS API
      const response1 = await axios.post("https://www.fast2sms.com/dev/bulkV2", data, axiosConfig);
      // await axios.post("https://www.fast2sms.com/dev/voice", data, axiosConfig);

      return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } else {
      return res.status(400).json({ error: "Missing required fields" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in generateOtpForClient" });
  }
};


module.exports.EnggReportResponse = async (req, res) => {
  try {
    const { checklistName , subcategories} = req.body;
    if (checklistName && subcategories) {
      const response = await Report.create({
        checklistName:checklistName,
        subcategories:subcategories
      })
      return res.status(200).json({response });
    }
    return res.status(500).json({ error: "Enter valid data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in EnggReportResponse" });
  }
}


module.exports.EnggReportQuestionFetch = async (req, res) => {
  try {
    const { CheckListId } = req.body;
    if (CheckListId) {
      const response = await CheckList.findById(CheckListId);
      return res.status(200).json({response });
    }
    return res.status(500).json({ error: "Enter valid data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error in EnggReportQuestionFetch" });
  }
}
//-----------------------------------------------------------------{Amit-Features(aX13) Ends}--------------------------------------------------------------------------------