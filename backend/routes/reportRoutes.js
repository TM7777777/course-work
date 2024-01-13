const express = require("express");
const router = express.Router();
const { createReport } = require("../controllers/reportController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.post("/financial_report", isAuthenticated, createReport);

module.exports = router;
