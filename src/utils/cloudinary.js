/**
    
 */
const cloudinary = require("cloudinary").v2;
const config = require('../configs')

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cl_apiKey,
  api_secret: config.cl_apiSecret,
});

module.exports = cloudinary;