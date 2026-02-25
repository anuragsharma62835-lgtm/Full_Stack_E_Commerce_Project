const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
// const sendEmail = require("../config/nodemailer");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // await sendEmail({
    //   to: email,
    //   subject: "Welcome to Our E-Commerce Platform",
    //   text: `Hi ${name}, welcome to our platform. Your account has been created successfully.`,
    //   html: `
    //     <h2>Welcome, ${name}!</h2>
    //     <p>Your account has been created successfully.</p>
    //     <p>You can now explore products, place orders, and enjoy our services.</p>
    //     <br/>
    //     <p>Thank you for joining us.</p>
    //   `,
    // });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // await sendEmail({
    //   to: email,
    //   subject: "Login Notification",
    //   text: `Hi ${user.name}, your account was just accessed.`,
    //   html: `
    //     <p>Hello ${user.name},</p>
    //     <p>Your account has been successfully logged in.</p>
    //     <p>If this was not you, please reset your password immediately.</p>
    //   `,
    // });

    res.json({
      message: "login +",
      details: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isAdmin) {
      return res.status(400).json({
        message: "Cannot delete admin user",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};