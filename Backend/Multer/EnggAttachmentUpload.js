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


//TODO: make it dynamic



// const storage = multerS3({
//   s3: s3,
//   bucket: 'ieelifts.in',
//   metadata:(req, file, cb) => {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     const parts = file.mimetype.split("/")[1]; // Get file extension
//     cb(null, `public/EnggAttachments/${file.originalname}-${Date.now()}.${parts}`); // Define file name in S3
//   },
// })



// ||||||||||||||||||||||||||||||||||||||||||||  multer setup older approach  |||||||||||||||||||||||||||||||||||||
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/EnggAttachments');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${parts}`);         // TODO:change to AWS S3 bucket URL
  },
});
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| |||||||||||||||||||||||||||||||
const uploaded = multer({ storage: storage });









// const storageEdit = multerS3({
//   s3: s3,
//   bucket: 'ieelifts.in',
//   metadata:(req, file, cb) => {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     const parts = file.mimetype.split("/")[1]; // Get file extension
//     cb(null, `public/EnggAttachments/${file.originalname}-${Date.now()}.${parts}`); // Define file name in S3
//   },
// })



// ||||||||||||||||||||||||||||||||||||||||||||  multer setup older approach  |||||||||||||||||||||||||||||||||||||

const storageEdit = multer.diskStorage({
  destination:(req,res,cb) => {
    cb(null, './public/EnggAttachments');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${parts}`);
  },
})

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| |||||||||||||||||||||||||||||||

const uploadEdit = multer({ storage: storageEdit });




















// const storageMembershipUpgradeBillByAdmin =  multerS3({
//   s3: s3,
//   bucket: 'ieelifts.in',
//   metadata:(req, file, cb) => {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: (req, file, cb) => {
//     const parts = file.mimetype.split("/")[1]; // Get file extension
//     cb(null, `public/MembershipInvoice/MembershipBillReport/${file.originalname}-${Date.now()}.${parts}`); // Define file name in S3
//   },
// })


// ||||||||||||||||||||||||||||||||||||||||||||  multer setup older approach  |||||||||||||||||||||||||||||||||||||

const storageMembershipUpgradeBillByAdmin = multer.diskStorage({
  destination:(req,res,cb) => {
    cb(null, './public/MembershipInvoice/MembershipBillReport')
  },
  filename:(req,file,cb) => {
    const parts = file.mimetype.split("/")[1];
    console.log("}}}}}}}}}}}}}}}}}",file)
    cb(null, `${file.fieldname}-${Date.now()}.${parts}`)
  }
})
const storageMembershipUpgradeBill = multer({ storage: storageMembershipUpgradeBillByAdmin})

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| |||||||||||||||||||||||||||||||


module.exports = {uploaded, uploadEdit, storageMembershipUpgradeBill,s3};























