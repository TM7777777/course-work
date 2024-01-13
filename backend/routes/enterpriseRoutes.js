const express = require("express");
const router = express.Router();
const {
  getEnterprises,
  createEnterprise,
  getEnterprise,
  updateEnterprise,
  deleteEnterprise,
  getEnterpriseTotalIncome,
} = require("../controllers/enterpriseController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get("/enterprises", isAuthenticated, getEnterprises);
router.post("/enterprise", isAuthenticated, createEnterprise);
router.get("/enterprise/:enterpriseId", isAuthenticated, getEnterprise);
router.put("/enterprise/:enterpriseId", isAuthenticated, updateEnterprise);
router.delete("/enterprise/:enterpriseId", isAuthenticated, deleteEnterprise);
router.get("/enterprise-total-income", isAuthenticated, getEnterpriseTotalIncome);

module.exports = router;
