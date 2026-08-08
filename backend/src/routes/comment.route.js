const express = require("express");

const router = express.Router();

const {
  getComments,
  createComment,
  deleteComment
} = require("../controllers/comment.controller");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/post/:postId", getComments);

router.post(
  "/post/:postId",
  authMiddleware,
  createComment
);

router.delete(
  "/:id",
  authMiddleware,
  deleteComment
);

module.exports = router;