const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },

    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    },

    forumPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumPost"
    },

    reason: {
      type: String,
      enum: [
        "Spam",
        "Abusive Content",
        "Fake Information",
        "Inappropriate Content",
        "Other"
      ],
      required: true
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewed",
        "removed",
        "dismissed"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Report", reportSchema);