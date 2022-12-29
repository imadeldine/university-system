import express from "express";
const router = express.Router();

import StudentController from "../controllers/StudentController.js";

router.get("/", StudentController.getStudents);
router.get("/:id", StudentController.getStudent);
router.post("/", StudentController.addStudent);
router.delete("/:id", StudentController.deleteStudent);
router.put("/:id", StudentController.updateStudent);

export default router;
