const Skill = require('../models/skill.model.js');
const User = require('../models/user.model.js');
// create new skill 

const createSkill = async (req, res) => {
  try {
    let { title, description, learntFrom, resources } = req.body;
    const userId = req.user.id;

    // Trim and validate non-empty strings
    if (!title || typeof title !== "string" || title.trim() === "")
      return res.status(400).json({ message: "Invalid or missing title" });

    if (!description || typeof description !== "string" || description.trim() === "")
      return res.status(400).json({ message: "Invalid or missing description" });

    if (learntFrom && (typeof learntFrom !== "string" || learntFrom.trim() === "")) {
      learntFrom = undefined; // Ignore empty strings
    }

    // Validate each resource (must be a valid link)
    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    const validResources = Array.isArray(resources)
      ? resources.filter((r) => typeof r === "string" && r.trim() !== "" && urlRegex.test(r.trim()))
      : [];

    const skill = new Skill({
      user: userId,
      title: title.trim(),
      description: description.trim(),
      ...(learntFrom ? { learntFrom: learntFrom.trim() } : {}),
      ...(validResources.length > 0 ? { resources: validResources } : {}),
    });

    await skill.save();
    res.status(201).json({ message: "Skill created", skill });
  } catch (error) {
    console.error("Skill creation failed:", error);
    res.status(500).json({ message: error.message });
  }
};



const getUserSkills = async (req, res) => {
    try {
      const userId = req.user.id;
      const skills = await Skill.find({ user: userId });
      const userDetails = await User.findById(userId)
      
      res.status(200).json({
        success: true,
        skills,
        userDetails
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const updateSkill = async (req, res) => {
    try {
      const skillId = req.params.id;
      const userId = req.user.id;
  
      let { title, description, learntFrom, resources } = req.body;
  
      const updates = {};
      const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  
      if (title && typeof title === "string" && title.trim() !== "") {
        updates.title = title.trim();
      }
  
      if (description && typeof description === "string" && description.trim() !== "") {
        updates.description = description.trim();
      }
  
      if (learntFrom && typeof learntFrom === "string" && learntFrom.trim() !== "") {
        updates.learntFrom = learntFrom.trim();
      }
  
      if (Array.isArray(resources)) {
        const validResources = resources.filter(
          (r) => typeof r === "string" && r.trim() !== "" && urlRegex.test(r.trim())
        );
        if (validResources.length > 0) {
          updates.resources = validResources;
        }
      }
  
      const skill = await Skill.findOneAndUpdate(
        { _id: skillId, user: userId },
        updates,
        { new: true }
      );
  
      if (!skill) {
        return res.status(404).json({ success: false, message: 'Skill not found or unauthorized' });
      }
  
      res.status(200).json({ success: true, message: 'Skill updated', skill });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  

const deleteSkill = async (req, res) => {
    try {
      const skillId = req.params.id;
      const userId = req.user.id;
  
      const skill = await Skill.findOneAndDelete({ _id: skillId, user: userId });
  
      if (!skill) {
        return res.status(404).json({ success: false, message: 'Skill not found or unauthorized' });
      }
  
      res.status(200).json({ success: true, message: 'Skill deleted' });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


module.exports = {
    createSkill,
    getUserSkills,
    updateSkill,
    deleteSkill
}
  