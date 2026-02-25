const Order = require("../models/orderModel");
// const sendEmail = require("../config/nodemailer");

const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const { name, phone, address, city, postalCode, country } =
      shippingAddress || {};

    if (!name || !phone || !address) {
      return res.status(400).json({
        message: "Please provide complete shipping details",
      });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress: {
        name,
        phone,
        address,
        city,
        postalCode,
        country,
      },
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    // await sendEmail({
    //   to: req.user.email,
    //   subject: "Order Confirmation",
    //   text: `Hi ${name}, your order has been placed successfully.`,
    //   html: `
    //     <h2>Order Confirmed</h2>
    //     <p>Hello ${name},</p>
    //     <p>Your order has been successfully placed.</p>
    //     <p>We will notify you once your order is shipped.</p>
    //     <br/>
    //     <p>Thank you for shopping with us.</p>
    //   `,
    // });

    res.status(201).json({
      message: "Order placed successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error("ADD ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error("UPDATE PAID ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error("UPDATE DELIVERED ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
};