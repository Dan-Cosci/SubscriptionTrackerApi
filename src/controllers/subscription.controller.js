import Subscription from "../models/subscription.model.js";

import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";


export const CreateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    });

    await workflowClient.trigger({
      url: `${SERVER_URL}`
    });

    res.status(201).json({ success: true, data: subscription });

  } catch (error) {
    next(error);
  }
}

export const GetUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these subscriptions"
      });
    }


    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions
    });

  } catch (error) {
    next(error);
  }
};