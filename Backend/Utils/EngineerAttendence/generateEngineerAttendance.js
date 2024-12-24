const generateDailyAttendancePDF = require('./generateDailyAttendancePDF');
const path = require('path');
const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");
const EnggAttendanceServiceRecord = require("../../Modals/ServiceEngineerModals/Attendance")
const moment = require("moment");
const { getObjectURL } = require("../../S3bucket/S3")

// Calculating the total working hours
const calculateTotalHours = (checkIn, checkOut, checkintw, checkouttw) => {
    if (!checkIn || !checkOut || checkintw === "--" || checkouttw === "--") return "--";
    let checkInTime = new Date(`2000-01-01T${checkIn}`);
    let [hourss, minutess] = checkIn.split(":").map(Number);
    if (hourss > 24) {
        checkInTime = new Date(`2000-01-02T${checkintw}`);
    }
    let checkOutTime = new Date(`2000-01-01T${checkOut}`);
    let [hours2, minutes2] = checkOut.split(":").map(Number);
    if (hours2 > 24) {
        checkOutTime = new Date(`2000-01-02T${checkouttw}`);
    }


    const milliseconds = checkOutTime - checkInTime;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};

function convertTo24HourFormat(time) {
    if (time !== undefined) {
        const [hours, minutes] = time.split(":").map(Number);

        const normalizedHour = hours % 24;
        const formattedHour =
            normalizedHour < 10 ? `0${normalizedHour}` : normalizedHour;

        return `${formattedHour}:${minutes < 10 ? "0" + minutes : minutes}`;
    }
    return "--"
}

function convertTo12HourFormat(time) {
    if (time !== undefined) {
        const [hours, minutes] = time.split(":").map(Number);

        const period = hours >= 12 ? "PM" : "AM";
        const normalizedHour = hours % 12 || 12; // Handle 12 AM and 12 PM cases

        const formattedHour = normalizedHour < 10 ? `0${normalizedHour}` : normalizedHour;

        return `${formattedHour}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
    }
    return "--";
}


const getS3Image = async (key) => {
    try {
        if (key !== undefined)
            return await getObjectURL(key)

        return "--"
    } catch (error) {
        console.error("Error", error);
        return "--"
    }
}

const generateEngineerAttendance = async () => {
    try {
        // Getting engineer details
        const EngineerIDs = await ServiceEnggBasicSchema.find().select("EnggId EnggName EnggLastName");

        const todayDate = moment(
            new Date().toLocaleDateString("en-Us", { timeZone: "Asia/Kolkata" })
        ).subtract(1, "days").format("DD/MM/YYYY");

        const originalDate = moment(
            new Date().toLocaleDateString("en-Us", { timeZone: "Asia/Kolkata" })
        ).format("DD/MM/YYYY");

        // Getting current date attendance
        const todayAttendances = await EnggAttendanceServiceRecord.find({ Date: todayDate }).select("ServiceEnggId Check_In Check_Out");

        // Making the Data Format
        const EngineerData = await Promise.all(
            EngineerIDs.map(async (engineer, index) => {
                const engineerAttendence = todayAttendances.find(attendance => attendance.ServiceEnggId === engineer.EnggId);

                let totalWorkingHours = null;

                if (engineerAttendence && engineerAttendence.Check_In.time && engineerAttendence.Check_Out.time) {
                    let checkIn = convertTo24HourFormat(engineerAttendence?.Check_In.time)
                    let checkOut = convertTo24HourFormat(engineerAttendence?.Check_Out.time)
                    totalWorkingHours = calculateTotalHours(engineerAttendence?.Check_In.time, engineerAttendence?.Check_Out.time, checkIn, checkOut);
                }

                return {
                    engineerId: engineer.EnggId,
                    engineerName: `${engineer.EnggName} ${engineer.EnggLastName}`,
                    checkInTime: convertTo12HourFormat(engineerAttendence?.Check_In?.time),
                    checkOutTime: convertTo12HourFormat(engineerAttendence?.Check_Out?.time),
                    totalWorkingHours: totalWorkingHours || "--",
                    checkInFrontImage: engineerAttendence?.Check_In.time !== undefined
                        ? `${await getS3Image(engineerAttendence.Check_In.engPhoto?.split(" ")[0])}`
                        : "--",
                    checkInBackImage: engineerAttendence?.Check_In.time !== undefined
                        ? `${await getS3Image(engineerAttendence.Check_In.engPhoto?.split(" ")[1])}`
                        : "--",
                    checkOutFrontImage: engineerAttendence?.Check_Out.time !== undefined
                        ? `${await getS3Image(engineerAttendence.Check_Out.engPhoto?.split(" ")[0])}`
                        : "--",
                    checkOutBackImage: engineerAttendence?.Check_Out.time !== undefined
                        ? `${await getS3Image(engineerAttendence.Check_Out.engPhoto?.split(" ")[1])}`
                        : "--",
                };
            })
        );
        const pdfFilePath = path.join(__dirname, '../../public/EngineerDailyAttendanceFolder', 'EngineerAttendance.pdf');
        // Add 1 day to the original Date object for generating at date

        console.error("todayAttendances",todayAttendances)

        console.log("this is  today date ",todayDate)
        console.log("this is originaml date ", originalDate)

        await generateDailyAttendancePDF(EngineerData, todayDate, pdfFilePath, originalDate);
        
    } catch (error) {
        console.error(error);
        return error.message
    }
}

module.exports = generateEngineerAttendance;