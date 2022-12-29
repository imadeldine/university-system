import express from "express";
import dotenv from "dotenv";
import connectDB from "./database.js";
import cors from "cors";
import User from "./Server/routes/UserRoute.js";
import Student from "./Server/routes/StudentRoute.js";

const app = express();
dotenv.config({
  path: "./config.env",
});
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API is healthy...");
});

app.use("/api/user", User);
app.use("/api/student", Student);

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page Not Found! Please enter a valid URL to proceed",
  });
});
