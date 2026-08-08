const express = require("express");

const router = express.Router();

const {
  createReport,
  getReports,
  updateReport
} = require("../controllers/report.controller");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/",
  authMiddleware,
  createReport
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getReports
);

router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateReport
);

module.exports = router;