const express = require("express");
const router = express.Router();
const { signup, signin, findMe } = require("../controllers/user.controller");
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/me").post(findMe);

module.exports = router;
