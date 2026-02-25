const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getAnalytics,
  adminLogin,
  adminRegister,
} = require("../controllers/adminController");

router.get("/analytics", protect, adminOnly, getAnalytics);
router.post("/login", adminLogin);
router.post("/register", adminRegister);

module.exports = router;