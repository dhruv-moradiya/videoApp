const mongoose = require("mongoose");
const { User } = require("../models/user.model");
const { Video } = require("../models/video.model");
const { upload } = require("../middlewares/multer.middleware");

const publishAVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!req.files || !req.files.videoFile || req.files.video.length === 0) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const videoFileLocalPath = req.files?.videoFile[0]?.path;

    if (!videoFileLocalPath) {
      return res.status(400).json({ message: "Video file is required" });
    }

    if (
      !req.files ||
      !req.files.thumbnail ||
      req.files.thumbnail.length === 0
    ) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!thumbnailLocalPath) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }

    const video = await upload(videoFileLocalPath, "video");
    const thumbnail = await upload(thumbnailLocalPath, "image");

    console.log("video", video);
    console.log("thumbnail", thumbnail);

    // const newVideo = await Video.create({
    //   title,
    //   description,
    //   videoFile: video.url,
    //   thumbnail: thumbnail.url,
    //   owner: req?.user?._id,
    // });

    console.log("req.files", req.files);
    req.end();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while publishing video :- " + error.message });
  }
};

module.exports = { publishAVideo };
