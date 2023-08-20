
const express = require("express");
const router = express.Router();
const { protect, authorize } = require('../../middleware/auth.js')
const allowedFileTypes = require('../../utils/allowedFileTypes.js')
const fileUpload = require('../../utils/fileUpload.js')

const userController = require("./contoller.js");

router.route("/")
        .post(userController.register)
        .get(protect, userController.getMe)
        .put(protect, userController.editUser)
        .delete(protect, userController.deleteUser);

router.route("/login")
        .post(userController.login);

router.route("/changePassword")
        .post(protect, userController.changePassword);

router.route("/all")
        .get(userController.getAllUsers);

router.route("/update/image")
        .put(protect,allowedFileTypes('jpeg', 'jpg', 'png', 'gif'), fileUpload.single('photo'), userController.updateImage);

module.exports = router;