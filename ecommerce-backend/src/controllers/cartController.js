
const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.json({
        messgge: "empty plese shop something",
        items: [],
      });
    }

    res.json({ items: cart.items });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID required",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex((item) => {
      const itemProductId = item.product?._id || item.product;
      return String(itemProductId) === String(productId);
    });

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += 1;
    } else {
      cart.items.push({
        product: productId,
        qty: 1,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json({
      items: cart.items,
    });
  } catch (error) {
    console.error("ADD CART ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.json({ items: [] });
    }

    cart.items = cart.items.filter((item) => {
      const itemProductId = item.product?._id || item.product;
      return String(itemProductId) !== String(productId);
    });

    await cart.save();
    await cart.populate("items.product");

    res.json({ items: cart.items });
  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.deleteOne({ user: req.user._id });

    res.json({
      message: "Cart cleared",
      items: cart?.items || [],
    });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};