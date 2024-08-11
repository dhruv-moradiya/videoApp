const mongoose = require("mongoose");
const { Subscription } = require("../models/subscription.model");
const { User } = require("../models/user.model");

const toggleSubscription = async (req, res) => {
  try {
    const { channelId } = req.params;

    if (!channelId || !mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({ message: "Invalid channel id" });
    }

    const channel = await User.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const subscription = await Subscription.findOne({
      subscriber: req.user._id,
      channel: channelId,
    });

    console.log("subscription", subscription);

    if (subscription) {
      await Subscription.findByIdAndDelete(subscription._id);
      return res.status(200).json({ message: "Unsubscribed" });
    }

    await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });

    return res.status(200).json({ message: "Subscribed" });
  } catch (error) {
    return res.status(500).json({
      message: "Error while toggling subscription :- " + error.message,
    });
  }
};

const getUserChannelSubscribers = async (req, res) => {
  try {
    const { channelId } = req.params;

    if (!channelId) {
      return res.status(400).json({ message: "Channel ID is required" });
    }

    const subscribers = await Subscription.find({
      channel: channelId,
    }).populate({
      path: "subscriber",
      select: "username email avatar",
    });

    return res.status(200).json({ subscribers });
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting subscribers :- " + error.message,
    });
  }
};

const getSubscribedChannels = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      subscriber: req.user._id,
    }).populate({
      path: "channel",
    });

    return res.status(200).json({ subscriptions });
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting subscribed channels :- " + error.message,
    });
  }
};

module.exports = {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
};
