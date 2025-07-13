import mongoose from "mongoose";

import { DB_URI,NODE_ENV } from "../config/env.js";

// checking if the database string exist
if(!DB_URI){
  throw new Error("Please define a DATABSE URI inside the enviornment variables");
}

const connectDb = async ()=>{
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to DATABASE in ${NODE_ENV} mode`);
  } catch (error) {
    console.log('Error connecting: '+error);
    process.exit(1);  
  }
};
export default connectDb;