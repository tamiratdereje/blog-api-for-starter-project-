const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    tags: [
      {
        type: String,
        enum: [
          "Others",
          "Sports",
          "Tech",
          "Politics",
          "Art",
          "Design",
          "Culture",
          "Production",
        ],
        default: ["Others"],
      },
    ],
    content: {
      type: String,
      default: "No content"
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    subTitle: {
      type: String,
      required: [true, "Please add a subTitle"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    estimatedReadTime: {
      type: String,
      default: "5 min",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: false,
    },

    imageCloudinaryPublicId: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Article", ArticleSchema);
