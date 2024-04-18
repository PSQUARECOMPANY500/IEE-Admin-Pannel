const multer = require('multer');

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

module.exports = uploadReportAttachment;
