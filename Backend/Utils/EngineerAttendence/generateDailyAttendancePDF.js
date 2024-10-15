const puppeteer = require('puppeteer');
const fs = require('fs');

const generateDailyAttendancePDF = async (EngineerData, todayDate, pdfFilePath) => {
    // Create HTML content
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Engineer Attendance Report</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; text-align: center; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            a { text-decoration: none; font-weight: bold; color: #000; }
        </style>
    </head>
    <body>
        <h1>Engineer Attendance Report</h1>
        <h2>Date: ${todayDate}</h2>
        <h2>Generated At: 15/10/2024 11:14 A.M.</h2>
        <table>
            <tr>
                <th>Engineer ID</th>
                <th>Engineer Name</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Total Working Hours</th>
                <th>Check-In Images</th>
                <th>Check-Out Images</th>
            </tr>
            ${EngineerData.map(engineer => `
                <tr>
                    <td>${engineer.engineerId}</td>
                    <td>${engineer.engineerName}</td>
                    <td>${engineer.checkInTime}</td>
                    <td>${engineer.checkOutTime}</td>
                    <td>${engineer.totalWorkingHours}</td>
                   ${engineer.checkInFrontImage !== "--" && engineer.checkInBackImage !== "--"
            ? `<td>
        <a href=${engineer.checkInFrontImage} target="_blank"><-> Front</a>
        <br/>
        <a href=${engineer.checkInBackImage} target="_blank"><-> Back</a>
        </td>`
            : "<td>--</td>"}
        
        ${engineer.checkOutFrontImage !== "--" && engineer.checkOutBackImage !== "--"
            ? `<td>
        <a href=${engineer.checkOutFrontImage} target="_blank"><-> Front</a>
        <br/>
        <a href=${engineer.checkOutBackImage} target="_blank"><-> Back</a>
    </td>`
            : "<td>--</td>"}

                </tr>
            `).join('')
        }
        </table >
    </body >
    </html >
    `;

    // Create a PDF Document
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    await page.pdf({
        path: pdfFilePath, // Use the provided pdfFilePath
        format: 'A4',
        printBackground: true,
    });

    await browser.close();
};

module.exports = generateDailyAttendancePDF;
