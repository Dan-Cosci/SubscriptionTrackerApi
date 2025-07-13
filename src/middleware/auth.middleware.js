import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js"; // Ensure you have the correct path to your config file
import User from "../models/user.model.js"; // Ensure you have the correct path to your User model

const authorize = async (req, res, next) => {
  
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied"
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found, authorization denied"
      });
    }

    req.user = user; // Attach user to request object
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      error: error.message || "An error occurred"
    });
  }
};

export default authorize;