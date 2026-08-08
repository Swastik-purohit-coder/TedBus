const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000
    },

    imageUrl: {
      type: String,
      default: ""
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    commentsCount: {
      type: Number,
      default: 0
    },

    reportsCount: {
      type: Number,
      default: 0
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

module.exports = mongoose.model("Post", postSchema);