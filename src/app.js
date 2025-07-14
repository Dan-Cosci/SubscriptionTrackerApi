import express from "express";

import { PORT } from "./config/env.js";
import authRouter from  "./routes/auth.routes.js";
import userRouter from  "./routes/user.routes.js";
import subscriptionRouter from  "./routes/subscription.routes.js";
import connectDb from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workFlowRouter from "./routes/workFlow.routes.js";


// Initialize express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);
app.use(morgan("dev"));
app.use(arcjetMiddleware);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workFlowRouter);
  
// Health check route
app.listen(PORT||5001, async()=>{
  console.log(`Server running on PORT:http://localhost:${PORT}`);
  await connectDb();
});

export default app;