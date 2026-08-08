const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: "active" })
      .populate("user", "name email picture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      status: "active"
    }).populate("user", "name email picture");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
      });
    }

    const post = await Post.create({
      user: req.user._id,
      title,
      content,
      imageUrl: imageUrl || ""
    });

    const populatedPost = await Post.findById(post._id)
      .populate("user", "name email picture");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const isOwner =
      post.user.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to remove this post"
      });
    }

    post.status = "removed";
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post removed successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const toggleLike = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      status: "active"
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const userId = req.user._id.toString();
    post.likes = post.likes || [];

    const alreadyLiked = post.likes.some(
      id => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        id => id.toString() !== userId
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likesCount: post.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPopularPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          status: "active"
        }
      },
      {
        $addFields: {
          engagementScore: {
            $add: [
              { $size: { $ifNull: ["$likes", []] } },
              { $multiply: [{ $ifNull: ["$commentsCount", 0] }, 2] }
            ]
          }
        }
      },
      {
        $sort: {
          engagementScore: -1
        }
      },
      {
        $limit: 10
      }
    ]);

    await Post.populate(posts, {
      path: "user",
      select: "name email picture"
    });

    res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  toggleLike,
  getPopularPosts
};