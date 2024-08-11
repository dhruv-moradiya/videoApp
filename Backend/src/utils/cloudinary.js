const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (localFilePath, type) => {
  console.log("localFilePath", localFilePath);
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: type === "image" ? "image" : "video",
      folder: type === "image" ? "images" : "videos",
    });

    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw new Error(error.message);
  }
};
module.exports = { uploadFile };
