const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "psqrco@gmail.com",
        pass: "tczb rxil pioe nrgd",
    },
});

module.exports = transporter;