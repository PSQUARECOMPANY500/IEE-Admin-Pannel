const cron = require('node-cron');
const generateEngineerAttendance = require('./generateEngineerAttendance');
const sendEmail = require('../Nodemailer/NodemailerSend');

// Schedule the job to run every day at 7:00 PM
const cronjob = () => {
    cron.schedule('27 10 * * *', async () => {
        console.log("Running cron job to generate engineer attendance PDF at 17:41PM...");
        await generateEngineerAttendance();
        await sendEmail();
    });
}

module.exports = cronjob;