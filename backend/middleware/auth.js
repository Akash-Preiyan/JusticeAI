import jwt from "jsonwebtoken";
import Models from "../models/Schemas.js"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRETS;

const auth = async (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;
    if(!authHeader){
      return res.status(401).json({
        message: "Invalid Token"
      })
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await Models.User.findById(decoded.id).select("-password");

    if(!user){
      return res.status(401).json({
        message: "User not found"
      })
    }

    req.user = user;

    next();
  }catch(error){
    console.log(error);
    return res.status(401).json({
      message: "Invalid Token"
    })
  }
}

export default  auth ;