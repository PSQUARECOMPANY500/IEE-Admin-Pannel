const { PutObjectURL } = require('../S3bucket/S3');

const generatePresignedUrlMiddleware = async (req, res, next) => {
  try {
    const { files } = req.files; // Expecting files to be an array of { key, contentType }
    console.log("this is file is console on s3 bucket ",files)

    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: "Files array is required" });
    }

    // Generate presigned URLs for each file
    const presignedUrls = await Promise.all(
      files.map(async (file) => {
        const { key, contentType } = file; // Extract key and contentType from the file object
        if (!key || !contentType) {
          throw new Error("Key and contentType are required for each file");
        }
        return await PutObjectURL(key, contentType);
      })
    );

    // Attach the generated presigned URLs to the request object
    req.presignedUrls = presignedUrls; // Array of presigned URLs

    // Call `next()` to move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    res.status(500).json({ error: "Failed to generate pre-signed URL" });
  }
};

module.exports = generatePresignedUrlMiddleware;
