import * as cloudinary from 'cloudinary';
const cloudImages = cloudinary.v2;
cloudImages.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudImages;
