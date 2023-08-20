// AppError
const AppError = require("./apperror");

module.exports = (...fileTypes) => {
  return (req, res, next) => {
    if (fileTypes.length === 0) {
      return next(
        new AppError("Please provide at least one file extension", 500)
      );
    }

    // Add allowed file types to the req object
    req.fileTypes = fileTypes;
    next();
  };
};
