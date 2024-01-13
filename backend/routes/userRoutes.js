const express = require("express");
const router = express.Router();
const { register, login, getUsers, deleteUser } = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/users", isAuthenticated, isAdmin, getUsers);
router.delete("/users/:deletedUserId", isAuthenticated, isAdmin, deleteUser);

module.exports = router;
