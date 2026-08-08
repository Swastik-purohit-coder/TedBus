const express = require("express");

const router = express.Router();

const {
  getTopics,
  createTopic,
  getTopicPosts,
  createForumPost
} = require("../controllers/forum.controller");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getTopics);

router.post(
  "/",
  authMiddleware,
  createTopic
);

router.get(
  "/:topicId/posts",
  getTopicPosts
);

router.post(
  "/:topicId/posts",
  authMiddleware,
  createForumPost
);

module.exports = router;