const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumTopic",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000
    },

    status: {
      type: String,
      enum: ["active", "removed"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ForumPost", forumPostSchema);