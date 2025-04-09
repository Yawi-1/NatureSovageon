const router = require("express").Router();
const { signup, login, logout } = require("../controllers/auth.controller");
const checkAuth = require('../middlewares/isAuthenticated')
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth, (req, res) => {
    res.status(200).json({
      message: "User authenticated",
      success: true,
      user: req.user,
    });
  });
module.exports = router;