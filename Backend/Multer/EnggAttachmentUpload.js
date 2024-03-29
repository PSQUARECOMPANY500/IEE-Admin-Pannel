const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/EnggAttachments');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}.jpeg`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
