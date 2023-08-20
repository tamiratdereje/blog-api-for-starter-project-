// Node-Geocoder
const NodeGeocoder = require("node-geocoder");

// Geocoder options
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

// Export module
module.exports = geocoder;
