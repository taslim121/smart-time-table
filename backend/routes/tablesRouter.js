import express from "express";
const router = express.Router();

import{createTable,getAllTables,getSpecificTable,updateTable,updateSubject, deleteTable} from "../controllers/tableController.js"

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.get("/all-time-tables", getAllTables,authenticate);
router.get("/specific-timetable/:id", getSpecificTable,authenticate);

router.post("/create-table", authenticate, authorizeAdmin, createTable);

router.put("/update-timetable/:id", authenticate,authorizeAdmin, updateTable);
router.delete("/delete-timetable/:id",authenticate,authorizeAdmin,deleteTable);
router.put("/update-timetable/:id/:day/:subjectId", authenticate, authorizeAdmin, updateSubject);

export default router;

