import User from "../models/UserModel.js";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({
        status: 200,
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async addUser(req, res) {
    const { username, password, firstName, lastName } = req.body;
    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All info must be provided",
      });
    }
    const userExist = await User.findOne({
      username: username,
    });
    if (userExist) {
      res.status(400).send("User already exists");
      return;
    }
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);
    try {
      const result = await User.create({
        username: username,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      });
      return res.status(201).json({
        status: 201,
        success: true,
        _id: result.id,
        result,
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await Bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid Credentials. Please try again",
      });
    }
  }

  async resetPassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password must be provided",
      });
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} does not exist`,
        });
      }
      const salt = await Bcrypt.genSalt(10);
      const hashedPassword = await Bcrypt.hash(password, salt);
      const result = await user.updateOne({
        password: hashedPassword,
      });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Password updated successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `User with id ${id} does not exist`,
        });
      }
      const result = await user.delete();
      return res.status(200).json({
        status: 200,
        success: true,
        message: `User with id ${id} deleted permanently`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async logout(req, res) {
    res.clearCookie("token");
    res.json({
      message: "Logged out successfully",
    });
  }

}
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const userController = new UserController();
export default userController;
