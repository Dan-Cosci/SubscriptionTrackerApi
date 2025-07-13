import { Router } from "express";

import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', authorize, getUser)

userRouter.post('/', (req,res)=>{
  res.status(201).send({message:'CREATE new user'})
});
userRouter.put('/:id', (req,res)=>{
  res.status(200).send({message:'UPDATE user'})
});
userRouter.delete('/:id', (req,res)=>{
  res.status(200).send({message:'DELETE user'})
});

export default userRouter;