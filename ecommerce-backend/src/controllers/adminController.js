const User = require("../models/User");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAnalytics = async (req, res, next) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueData] =
      await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.aggregate([
          { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
        ]),
      ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      isAdmin: true,
    });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isAdmin: admin.isAdmin,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isAdmin: admin.isAdmin,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics, adminLogin, adminRegister };