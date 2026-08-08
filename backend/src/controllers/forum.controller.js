const ForumTopic = require("../models/ForumTopic");
const ForumPost = require("../models/ForumPost");

const getTopics = async (req, res) => {
  try {
    const topics = await ForumTopic.find()
      .populate("createdBy", "name picture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createTopic = async (req, res) => {
  try {
    const {
      title,
      description,
      category
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required"
      });
    }

    const topic = await ForumTopic.create({
      title,
      description,
      category,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getTopicPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find({
      topic: req.params.topicId,
      status: "active"
    })
      .populate("user", "name picture")
      .sort({ createdAt: 1 });

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

const createForumPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Content is required"
      });
    }

    const topic = await ForumTopic.findById(
      req.params.topicId
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Forum topic not found"
      });
    }

    const forumPost = await ForumPost.create({
      topic: topic._id,
      user: req.user._id,
      content: content.trim()
    });

    const populatedPost = await ForumPost.findById(
      forumPost._id
    ).populate("user", "name picture");

    res.status(201).json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTopics,
  createTopic,
  getTopicPosts,
  createForumPost
};