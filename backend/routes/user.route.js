const { register, login,addBio,editBio  } = require("../controllers/user.controller.js");
const {protect} = require("../middleware/protect.middleware.js")
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/addBio",protect,addBio)
router.put("/editBio",protect,editBio)

module.exports = router;
