// A configuration file that reads from the environment variables

// Dotenv
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// Export config variables
module.exports = {
  env: process.env.NODE_ENV,
  db: {
    remote: process.env.DB_REMOTE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRESIN,
  },
  cloud_name : "dzpmgwb8t",

  cl_apiKey : 412446846419928,
  
  cl_apiSecret: "FjcXcXmJHnjA8JfNL-smC1tT5TY"
};
