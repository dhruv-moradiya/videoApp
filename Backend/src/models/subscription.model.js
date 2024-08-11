const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      // * User who subscribe
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channel: {
      // * User who is subscribed to
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = { Subscription };

// * subscriber me humare subscriber honge jo hame subscribe karenge or channel me hum jise subscribe karenge wo hoge.
