import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    
    fs.unlinkSync(file);

    return result.secure_url;

  } catch (error) {
    console.log("Cloudinary Upload Error:", error);


    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return null;
  }
};

export default uploadOnCloudinary;