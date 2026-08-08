const Comment = require("../models/Comment");
const Post = require("../models/Post");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
      status: "active"
    })
      .populate("user", "name picture")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty"
      });
    }

    const post = await Post.findOne({
      _id: req.params.postId,
      status: "active"
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const comment = await Comment.create({
      post: post._id,
      user: req.user._id,
      text: text.trim()
    });

    post.commentsCount += 1;
    await post.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name picture");

    res.status(201).json({
      success: true,
      comment: populatedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const isOwner =
      comment.user.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not allowed"
      });
    }

    comment.status = "removed";
    await comment.save();

    await Post.findByIdAndUpdate(comment.post, {
      $inc: {
        commentsCount: -1
      }
    });

    res.status(200).json({
      success: true,
      message: "Comment removed successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment
};