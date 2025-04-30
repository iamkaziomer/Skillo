const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const Skill = require('../models/skill.model.js');

const getAllUserCards = async (req, res) => {
  try {
    // Get the token from the request header (Authorization: Bearer <token>)
    const token = req.headers.authorization.split(" ")[1]; // "Bearer <token>"
    
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Decode the token to extract the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id; // Access the correct field (id) from the token

    console.log('Decoded JWT:', decoded); // Debugging log for JWT payload
    console.log('Current User ID:', currentUserId); // Debugging log for userId

    // Fetch all users (excluding the current user)
    const users = await User.find({}).select('name branch semester bio').lean();
    
    // Fetch all skills
    const skills = await Skill.find({}).select('user title description learntFrom resources').lean();
    
    console.log('Fetched Users:', users);
    console.log('Fetched Skills:', skills);

    // Create a map of skills for each user
    const userSkillsMap = {};
    skills.forEach(skill => {
      if (!userSkillsMap[skill.user]) {
        userSkillsMap[skill.user] = [];
      }
      userSkillsMap[skill.user].push(skill);
    });

    console.log('User-Skills Map:', userSkillsMap);

    // Filter out the current user's profile
    const profiles = users
      .filter(user => {
        const userIdString = user._id.toString(); // Convert _id to string
        console.log('Comparing:', userIdString, currentUserId); // Debugging log for comparison
        return userIdString !== currentUserId; // Explicitly compare as strings
      })
      .map(user => ({
        ...user,
        skills: userSkillsMap[user._id] || []
      }));

    console.log('Profiles:', profiles);

    res.status(200).json({ success: true, profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUserCards };
