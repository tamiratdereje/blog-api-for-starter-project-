// Geocoder
const geocoder = require("./geocoder");

module.exports = async function (address) {
  if (address) {
    // Reverse geocode 'address' and save location
    const addressReverseGeocode = await geocoder.reverse(address);

    const location = {
      type: "Point",
      coordinates: [
        addressReverseGeocode[0].longitude,
        addressReverseGeocode[0].latitude,
      ],
      formattedAddress: addressReverseGeocode[0].formattedAddress,
      street: addressReverseGeocode[0].streetName,
      city: addressReverseGeocode[0].city,
      state: addressReverseGeocode[0].stateCode,
      zipcode: addressReverseGeocode[0].zipcode,
      country: addressReverseGeocode[0].countryCode,
    };
    return location;
  }
};
