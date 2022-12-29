import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    maxlength: [20, "Your name cannot exceed 20 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  firstName:{
    type: String,
    required: [true, "Please enter your firstname"],
    maxlength: [20, "Your name cannot exceed 20 characters"],
  },
  lastName:{
    type: String,
    required: [true, "Please enter your lastname"],
    maxlength: [20, "Your name cannot exceed 20 characters"],
  },
  creationDate:{
    type: Date,
    default: Date.now
  }

});

const Users = mongoose.model("users", userSchema);
export default Users;
