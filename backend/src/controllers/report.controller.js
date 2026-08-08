const Report = require("../models/Report");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ForumPost = require("../models/ForumPost");

const createReport = async (req, res) => {
  try {
    const {
      post,
      comment,
      forumPost,
      reason,
      description
    } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Report reason is required"
      });
    }

    const targetCount =
      [post, comment, forumPost].filter(Boolean).length;

    if (targetCount !== 1) {
      return res.status(400).json({
        success: false,
        message: "Report exactly one piece of content"
      });
    }

    const report = await Report.create({
      reportedBy: req.user._id,
      post,
      comment,
      forumPost,
      reason,
      description
    });

    if (post) {
      await Post.findByIdAndUpdate(post, {
        $inc: {
          reportsCount: 1
        }
      });
    }

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .populate("post")
      .populate("comment")
      .populate("forumPost")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateReport = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "reviewed",
      "removed",
      "dismissed"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report status"
      });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    if (status === "removed") {
      if (report.post) {
        await Post.findByIdAndUpdate(
          report.post,
          { status: "removed" }
        );
      }

      if (report.comment) {
        await Comment.findByIdAndUpdate(
          report.comment,
          { status: "removed" }
        );
      }

      if (report.forumPost) {
        await ForumPost.findByIdAndUpdate(
          report.forumPost,
          { status: "removed" }
        );
      }
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createReport,
  getReports,
  updateReport
};