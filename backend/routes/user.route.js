const { register, login,addBio,editBio  } = require("../controllers/user.controller.js");
const {protect} = require("../middleware/protect.middleware.js")
const User = require("../models/user.model.js");
const Skill = require("../models/skill.model.js");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/addBio",protect,addBio)
router.put("/editBio",protect,editBio)

// Get user profile by ID
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('name branch semester bio linkedinUrl githubUrl email');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const skills = await Skill.find({ user: userId });
    
    res.status(200).json({
      success: true,
      user,
      skills
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
