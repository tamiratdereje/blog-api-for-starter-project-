const errorHandler = require("../api/geh/index.js");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const userRoute = require("../api/user/routes.js");
const articleRoute = require("../api/article/routes.js");

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/article", articleRoute);

app.use(errorHandler);
app.use("/api/v1/tags", (req, res, next) => {
  return res.status(200).json({
    success: true,
    tags: [
      "others",
      "sports",
      "oech",
      "politics",
      "art",
      "design",
      "culture",
      "production",
    ],
  });
});

// Handle URL which don't exist
app.use("*", (req, res, next) => {
  return res.status(200).json({
    statu: "Success",
    data: {
      hello: "hello world",
    },
  });
});

module.exports = app;
