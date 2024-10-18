const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand,PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIARFSYGNLRBGIA5DHK",
    secretAccessKey: "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",              // ----------------- TODO: It shoould be mode to .env file ------------------
  },
});


module.exports.getObjectURL = async (key) => {
    const command = new GetObjectCommand({
        Bucket:"ieelifts.in",
        Key:key
    });
    const url = getSignedUrl(s3Client,command)
    return url;
}


//----------------------------------------------------------------------------------------------------------------------------------------------

module.exports.PutObjectURL = async (key,contentType) => {
    const command = new PutObjectCommand({
        Bucket:"ieelifts.in",
        Key:key,
        ContentType: contentType
    });
    const url = getSignedUrl(s3Client,command)
    return url;
}


