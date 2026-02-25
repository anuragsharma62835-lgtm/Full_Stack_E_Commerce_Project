const productRoutes = require("./productRoutes");
const userRoutes = require("./authRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const cartRoutes = require("./cartRoutes");

const setupRoutes = (app) => {
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/cart", cartRoutes);
};

module.exports = setupRoutes;