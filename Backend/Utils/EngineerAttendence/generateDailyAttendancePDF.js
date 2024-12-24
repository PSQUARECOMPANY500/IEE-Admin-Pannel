const puppeteer = require('puppeteer');
const fs = require('fs');
const htmlpdf = require("html-pdf");

const generateDailyAttendancePDF = async (EngineerData, todayDate, pdfFilePath) => {

    console.log("this is generating Engg Attendance >>>> <<<<... ", EngineerData[0].engineerDetails[0].EnggName)
// const generateDailyAttendancePDF = async (EngineerData, todayDate, pdfFilePath,formattedGeneratedAtDate) => {
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
        <h2>ServiceEnggId: ${EngineerData[0].ServiceEnggId}</h2>
        <h2>EnggName: ${EngineerData[0].engineerDetails[0].EnggName}</h2>
        <h2>Today's Date: ${todayDate}</h2>

        <table>
            <tr>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Date</th>
                
                
            </tr>
            ${EngineerData.map(engineer => `
                <tr>
                    <td>${engineer.Check_In?.time}</td>
                    <td>${engineer.Check_Out?.time}</td>
                    <td>${engineer?.Date}</td>
                  
                </tr>
            `).join('')
        }
        </table >
    </body >
    </html >
    `;

    (
        options = { 
        height: "1200px",
        width: "850px",
        format: "A4",
      }),
      
       await htmlpdf
          .create(htmlContent, options)
          .toFile(
            pdfFilePath,
            function (err, res) {
              // to do chage file path
              if (err) return console.error(err);
              console.log(res);
            }
          );

    // Create a PDF Document
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // await page.setContent(htmlContent);

    // await page.pdf({
    //     path: pdfFilePath, // Use the provided pdfFilePath
    //     format: 'A4',
    //     printBackground: true,
    // });

    // await browser.close();
};

module.exports = generateDailyAttendancePDF;
