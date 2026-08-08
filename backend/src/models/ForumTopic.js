const mongoose = require("mongoose");

const forumTopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500
    },

    category: {
      type: String,
      enum: [
        "Routes",
        "Destinations",
        "Travel Advice"
      ],
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ForumTopic", forumTopicSchema);