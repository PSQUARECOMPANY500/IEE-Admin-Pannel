const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3'); 



// Initialize the S3 client -------------------------------------------------------------
const s3 = new S3Client({
  region: "ap-south-1", // Set your region
  credentials: {
    accessKeyId: "AKIARFSYGNLRBGIA5DHK",
    secretAccessKey: "aTLDBN/9g7YvKmwTcAJgGidI5lgq/Rv3d/rBFg1P",
  },
});


// const storage = multerS3({
//   s3: s3,
//   bucket: 'ieelifts.in',
//   metadata:(req, file, cb) => {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     const parts = file.mimetype.split("/")[1]; // Get file extension
//     cb(null, `public/ReportAttachments/${file.originalname}-${Date.now()}.${parts}`); // Define file name in S3
//   },
// })


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/ReportAttachments');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `ReportImage-${Date.now()}.${parts}`);
  },
});


const uploadReportAttachment = multer({ storage: storage });


//=---------------------------------------------------------------- --------------------------------                            

// const PDFStore = multerS3({
//   s3: s3,
//   bucket: 'ieelifts.in',
//   metadata:(req, file, cb) => {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     const parts = file.mimetype.split("/")[1]; // Get file extension
//     cb(null, `public/ReportPdf/${file.originalname}-${Date.now()}.${parts}`); // Define file name in S3
//   },
// })


const PDFStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/ReportPdf');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${parts}`);
  },
});

const reportPdf = multer({ storage: PDFStore });









//=---------------------------------------------------------------- --------------------------------                            


module.exports = {uploadReportAttachment, reportPdf} ;
