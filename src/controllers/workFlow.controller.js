import dayjs from "dayjs";

import { creatRequire } from "module";
const require = creatRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js";

const REMINDERS = [7,5,3,1];


export const sendReminders = serve(async (context) => {
  const {subscriptionId} = context.requestPayload;
  const subscription = await fetchSubscription(context,subscriptionId);
  
  if (!subscription|| subscription.status !== active) return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(`Subscription ${subscriptionId} is due for renewal.`);
    return;
  }

  for(const daysBefore of REMINDERS){
    const reminderDate = renewalDate.subtract(daysBefore,'day')

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    await triggerReminder(context,`Reminder ${daysBefore}, days before  `);
  }

});

const sleepUntilReminder = async (context,label,date)=>{
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label,date.toDate());
};

const triggerReminder = async (context,label) => {
  return await context.run(label, ()=>{
    console.log(`Triggering ${label} Reminder`);
  });
};

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", ()=>{
    return Subscription.findById(subscriptionId).populate("user","name email");
  });
}