const express = require("express");
const { verifyToken } = require("../middlewares/auth.middleware");
const { publishAVideo } = require("../controllers/video.controller");
const { upload } = require("../middlewares/multer.middleware");

const router = express.Router();

router.route("/publish").post(
  verifyToken,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishAVideo
);

module.exports = router;
