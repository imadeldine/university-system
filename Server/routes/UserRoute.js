import express from "express";
const router = express.Router();

import UserController from "../Controllers/UserController.js";

router.get("/", UserController.getUsers);
router.post("/", UserController.addUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.resetPassword);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);


export default router;
