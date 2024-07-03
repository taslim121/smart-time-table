import express from "express";
const router = express.Router();

// Controllers
import {
  createTeacher,
  updateTeacher,
  removeTeacher,
  listTeachers,
  readTeacher,
} from "../controllers/TeacherController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createTeacher);
router.route("/:id").put(authenticate, authorizeAdmin, updateTeacher);
router.route("/:id").delete(authenticate, authorizeAdmin, removeTeacher);
router.route("/teachers").get(listTeachers);
router.route("/:id").get(readTeacher);

export default router;