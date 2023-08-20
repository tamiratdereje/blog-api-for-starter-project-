
const express = require("express");
const router = express.Router();
const { protect, authorize } = require('../../middleware/auth.js')
const allowedFileTypes = require('../../utils/allowedFileTypes.js')
const fileUpload = require('../../utils/fileUpload.js')

const articleController = require("./contoller.js");

router.route("/")
        .post(protect, allowedFileTypes('jpeg', 'jpg', 'png', 'gif'), fileUpload.single('photo'), articleController.addArticle)
        .get(articleController.getAllArticles)

router.route("/:id")
        .delete(protect, articleController.deleteArticle)
        .put(protect, allowedFileTypes('jpeg', 'jpg', 'png', 'gif'), fileUpload.single('photo'), articleController.editArticle)
        .get(articleController.getArticle);

module.exports = router;