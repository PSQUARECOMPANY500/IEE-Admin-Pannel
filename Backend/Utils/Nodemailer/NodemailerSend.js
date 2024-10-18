const transporter = require("./NodemailerTransporter");

const sendEmail = async () => {
    try {
        console.log("executed")
        await transporter.sendMail({
            from: '"<psqrco@gmail.com>',
            to: "armaan.singh@psquarecompany.com",
            subject: "Today Engineer Attendance",
            text: "Please find attached the daily attendance report.",
            attachments: [
                {
                    filename: 'EngineerAttendance.pdf',
                    path: './public/EngineerDailyAttendanceFolder/EngineerAttendance.pdf'
                }
            ]
        });
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = sendEmail;
