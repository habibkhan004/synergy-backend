import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: 'dvxwqvet0',
    api_key: '581167482116684',
    api_secret: 'lQdDCyaxQY80TplxGwK9rUJMJqs',
  });
  console.log("Cloudinary configured successfully");

}

export default connectCloudinary;