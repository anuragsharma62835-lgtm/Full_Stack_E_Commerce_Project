const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, countInStock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      countInStock,
      user: req.user._id,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 15;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    // ✅ Sort Logic
    let sortOption = { createdAt: -1 };

    if (req.query.sort === "price_asc") {
      sortOption = { price: 1 };
    }

    if (req.query.sort === "price_desc") {
      sortOption = { price: -1 };
    }

    const count = await Product.countDocuments(keyword);

    const products = await Product.find(keyword)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortOption);

    res.json({
      success: true,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getsdminsllproducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getsdminsllproducts,
};