const express = require("express");
const router = express.Router();

const {createSkill,
    getUserSkills,
    updateSkill,
    deleteSkill} = require('../controllers/skill.controller.js')
const { protect } = require("../middleware/protect.middleware.js");


router.post("/create", protect, createSkill);
router.get("/get", protect, getUserSkills);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
