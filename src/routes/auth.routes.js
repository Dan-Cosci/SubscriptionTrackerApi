import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

// Routes for authentication
authRouter.post('/sign-up',signUp);
authRouter.post('/sign-in',signIn); 
authRouter.post('/sign-out',signOut);


// path: /api/v1/auth/sign-up
export default authRouter