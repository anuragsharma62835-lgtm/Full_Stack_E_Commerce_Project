const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const compression = require("compression");
require("./config/passport");

const applySecurityMiddleware = require("./config/security");
const setupRoutes = require("./routes/index");
const { protect } = require("./middlewares/authMiddleware");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(compression());

app.use(express.json());

applySecurityMiddleware(app);

app.use(morgan("dev"));

app.use(passport.initialize());

setupRoutes(app);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "E-Commerce API Running 🚀" });
});

app.use(errorHandler);

module.exports = app;