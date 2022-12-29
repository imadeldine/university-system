import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your firstname"],
    maxlength: [20, "Your name cannot exceed 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your lastname"],
    maxlength: [20, "Your name cannot exceed 20 characters"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please enter your date of birth"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
    maxlength: [50, "Your address cannot exceed 50 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
    maxlength: [20, "Your phone number cannot exceed 20 characters"],
  },
  countryCode: {
    type: String,
    required: [true, "Please enter your country code"],
    maxlength: [5, "Your country code cannot exceed 5 characters"],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const Students = mongoose.model("students", studentSchema);
export default Students;
