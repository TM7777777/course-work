const express = require("express");
const router = express.Router();
const {
  getPerformanceIndicators,
  createPerformanceIndicator,
  deletePerformanceIndicator,
} = require("../controllers/performanceIndicatorController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

router.get("/performance_indicators", isAuthenticated, getPerformanceIndicators);
router.post("/performance_indicator", isAuthenticated, isAdmin, createPerformanceIndicator);
router.delete(
  "/performance_indicator/:indicatorId",
  isAuthenticated,
  isAdmin,
  deletePerformanceIndicator,
);

module.exports = router;
