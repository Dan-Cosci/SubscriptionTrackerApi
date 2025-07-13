import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { 
  CreateSubscription, 
  GetUserSubscriptions 
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=>{res.status(200).send({message:"GET all subscriptions"})});
subscriptionRouter.get('/:id',(req,res)=>{res.status(200).send({message:"GET subscription details"})});
subscriptionRouter.post('/', authorize, CreateSubscription);
subscriptionRouter.put('/:id',(req,res)=>{res.status(200).send({message:"UPDATE subscription"})});
subscriptionRouter.delete('/:id',(req,res)=>{res.status(200).send({message:"DELETE subscription"})});
subscriptionRouter.get('/user/:id',authorize, GetUserSubscriptions);
subscriptionRouter.put('/:id/cancel',(req,res)=>{res.status(200).send({message:"CANCEL subscription"})});
subscriptionRouter.get('/upcoming-renewals',(req,res)=>{res.status(200).send({message:"GET upcoming renewals"})});

export default subscriptionRouter;