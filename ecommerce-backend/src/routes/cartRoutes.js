const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/:productId", protect, removeFromCart);
router.delete("/", protect, clearCart);

module.exports = router;