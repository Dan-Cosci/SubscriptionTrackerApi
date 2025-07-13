import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: [true,"User Name is required"],
    trim: true,
    minLenght: 2,
    maxLenght: 50
  },
  email:{
    type: String,
    required: [true,"Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.+/, 'Insert a proper email']
  },
  password:{
    type: String,
    required: [true,"Password is required"],
    minLenght: 6,
  }
},
{
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;