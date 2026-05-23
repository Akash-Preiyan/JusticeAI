import express from "express";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import Models from "../models/Schemas.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import auth from "../middleware/auth.js"
dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRETS
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, role, password } = req.body;

    const existingUser = await Models.User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Models.User({ fullName, email, role, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { 
        id: user._id,
        name: user.fullName,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "3h" });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await Models.User.findOne({email});
    if(!user){
      console.log("User does not exist!")
      return res.status(400).json({message : "User does not exist!"});
    }
      

    const ismatch = await bcrypt.compare(password, user.password);
    if(!ismatch){
      console.log("Invalid email or password")
      return res.status(400).json({message : "Invalid email or password"});
    }
      

    const token = jwt.sign(
      { 
        id : user._id,
        name: user.fullName,
        role: user.role
      }, 
      JWT_SECRET, 
      { expiresIn: "3h"});
    res.json({token, user});
  } catch(err){
    console.error(err);
    res.status(500).json({message : `Error: ${err}`})
  }
});

router.get("/me", (req, res)=>{
  try{
    const authHeader = req.headers.authorization;
    if(!authHeader){
      return res.status(401).json({
        message: "No token provided"
      })
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );
    return res.status(200).json({
      fullName: decoded.name,
      role: decoded.role,
    })
  }catch(error){
    return res.status(400).json({
      message : "Invalid Token"
    })
  }
})


export default router;