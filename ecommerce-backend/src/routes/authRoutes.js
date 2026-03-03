const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  deleteUser,
} = require("../controllers/authController");

const passport = require("../config/passport");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/admin", protect, adminOnly, getUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = req.user.token;
      const { email, name } = req.user.user;

      // const redirectURL = `http://localhost:5173/google-success?token=${token}&name=${name}&email=${email}`;
      const redirectURL = `https://full-stack-e-commerce-project-pearl.vercel.app/google-success?token=${token}&name=${name}&email=${email}`;
      return res.redirect(redirectURL);
    } catch (error) {
      console.error(error);
      // return res.redirect("http://localhost:5173/login");
      return res.redirect("https://full-stack-e-commerce-project-pearl.vercel.app/login");
    }
  },
);

module.exports = router;
