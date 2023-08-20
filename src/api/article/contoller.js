const Article = require("./model");
const AppError = require("../../utils/apperror");

const cloudinary = require("../../utils/cloudinary");
exports.addArticle = async (req, res, next) => {
  var pictureURL, picturePublic;

  try {
    req.body.user = req.user_id;
    await cloudinary.uploader.upload(req.file.path, {}).then((result) => {
      pictureURL = result.secure_url;
      picturePublic = result.public_id;
    });
    console.log("before");
    req.body.image = pictureURL;
    req.body.imageCloudinaryPublicId = picturePublic;
    console.log(req.body);
    const article = await Article.create(req.body);

    return res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    if (picturePublic) {
      await cloudinary.uploader.destroy(picturePublic);
    }
    next(new AppError("Server error", 500));
  }
};

//  get getAllArticle
exports.getAllArticles = async (req, res, next) => {
  // to dos is already available in req due to the protect middleware
  // const articles = await Article.find();
  const tags = req.query.tags ? req.query.tags.split(",") : [];
  const searchParams = req.query.searchParams ?? "";

  let query = {
    $or: [
      { subTitle: { $regex: searchParams, $options: "i" } },
      { title: { $regex: searchParams, $options: "i" } },
      { content: { $regex: searchParams, $options: "i" } },
    ],
  };

  if (tags.length > 0) {
    query.tags = { $in: tags};
  }

  const articles = await Article.find(query).populate({
    path: "user",
  });

  res.status(200).json({
    success: true,
    data: articles,
  });
};

//  get article
exports.getArticle = async (req, res, next) => {
  // to dos is already available in req due to the protect middleware
  const article = await Article.findById(req.params.id).populate({
    path: "user",
  });

  res.status(200).json({
    success: true,
    data: article,
  });
};

// delete Article
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    await cloudinary.uploader.destroy(article.imageCloudinaryPublicId);

    return res.status(200).json({
      success: true,
      date: article,
    });
  } catch (error) {
    next(new AppError("server error while deleting", 500));
  }
};

exports.editArticle = async (req, res, next) => {
  var pictureURL, picturePublic;

  try {
    const article = await Article.findById(req.params.id);

    if (!article)
      return next(
        new AppError("There is no article with the specified id", 400)
      );

    await cloudinary.uploader.upload(req.file.path, {}).then((result) => {
      pictureURL = result.secure_url;
      picturePublic = result.public_id;
    });

    req.body.image = pictureURL;
    req.body.imageCloudinaryPublicId = picturePublic;

    if (article.imageCloudinaryPublicId) {
      await cloudinary.uploader.destroy(article.imageCloudinaryPublicId);
    }
    const newone = await Article.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: newone,
    });
  } catch (error) {
    next(new AppError("server error", 500));
    await cloudinary.uploader.destroy(picturePublic);
  }
};
