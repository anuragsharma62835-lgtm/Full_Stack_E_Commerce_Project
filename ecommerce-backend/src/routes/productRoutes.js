const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getsdminsllproducts,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const Product = require("../models/productModel");

router.get("/", getProducts);
router.get("/ok", protect, adminOnly, getsdminsllproducts);
router.get("/:id", getProductById);

router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

router.get("/products/similar/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similar = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.json(similar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;