const express = require("express");

const router = express.Router();

const {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  toggleLike,
  getPopularPosts
} = require("../controllers/post.controller");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getPosts);

router.get("/popular", getPopularPosts);

router.get("/:id", getPostById);

router.post("/", authMiddleware, createPost);

router.post("/:id/like", authMiddleware, toggleLike);

router.delete("/:id", authMiddleware, deletePost);

module.exports = router;