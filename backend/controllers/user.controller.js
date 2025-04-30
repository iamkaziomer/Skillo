const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken');





const register = async (req,res)=>{
    try {
        const {name,email,password,branch,semester} = req.body
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            branch,
            semester
        })
        const user = await newUser.save()

        res.status(201).json({message:"user created", user})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"invalid credentials"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})


        res.status(200).json({message:"login successful", user,token})
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addBio = async (req,res)=>{
    try {
        const {bio} = req.body
        const userId = req.user.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(!bio || bio.length>150){
            return res.status(400).json({message:"Bio is required and should be less than 150 characters"})
        }
        user.bio = bio
        await user.save()
        res.status(200).json({message:"Bio updated successfully", user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const editBio = async (req,res)=>{
    try {
        const {bio} = req.body
        const userId = req.user.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not fouund"})
        }
        if(!bio || bio.length>150){
            return res.status(400).json({message:"Bio is required and should be less than 150 characters"})

        }
        user.bio = bio
        user.save();
        res.status(200).json({message:"Bio updated successfully", user})
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
}

module.exports = {register,login, addBio,editBio}