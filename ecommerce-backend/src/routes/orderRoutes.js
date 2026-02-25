const express = require("express");
const router = express.Router();

const {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/admin", protect, adminOnly, getOrders);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, adminOnly, updateOrderToDelivered);

module.exports = router;