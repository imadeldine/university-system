import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongoose");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectDB;
