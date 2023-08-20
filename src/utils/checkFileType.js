/**
 * This code for checking file type
 * @param {*} file
 * @param {*} callBack
 * @returns
 */

// Path
const path = require("path");
const AppError = require("./apperror");

function checkFileType(req, file, callBack) {
  // Allowed file types
  const allowedFileTypes = req.fileTypes;

  // File Extension
  const fileExtension = path.extname(file.originalname).split(".")[1];

  // File mime type
  const fileMimeType = file.mimetype.split("/")[1];

  // Check both extension and mime type
  if (
    !allowedFileTypes.includes(fileExtension.toLowerCase()) ||
    !allowedFileTypes.includes(fileMimeType.toLowerCase())
  ) {
    return callBack(new AppError("Invalid file format", 400));
  }
  callBack(null, true);
}

module.exports = checkFileType;
