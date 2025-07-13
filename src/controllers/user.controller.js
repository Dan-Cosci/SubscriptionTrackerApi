import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(); 
    res.status(200).json({
      success: true,
      data: users
    });    
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 

    res.status(200).json({
      success: true,
      data: user
    });    
  } catch (error) {
    next(error);
  }
};
