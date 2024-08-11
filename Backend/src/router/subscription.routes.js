const express = require("express");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} = require("../controllers/subscription.controller");

const router = express.Router();

router.route("/:channelId").post(verifyToken, toggleSubscription);

router
  .route("/getSubscribers/:channelId")
  .get(verifyToken, getUserChannelSubscribers);

router
  .route("/getSubscriptions/:channelId")
  .get(verifyToken, getSubscribedChannels);

module.exports = router;
