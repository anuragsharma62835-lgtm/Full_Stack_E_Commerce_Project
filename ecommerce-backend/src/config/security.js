const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const applySecurityMiddleware = (app) => {
  app.use(helmet());
  app.use(cors());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests, please try again later",
    },
  });

  app.use(limiter);
};

module.exports = applySecurityMiddleware;