import Teacher from "../models/Teacher.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createTeacher = asyncHandler(async (req, res) => {
  try {
    const { name, abrv } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingTeacher = await Teacher.findOne({ name });

    if (existingTeacher) {
      return res.json({ error: "Already exists" });
    }

    const teacher = await new Teacher({ name,abrv }).save();
    res.json(teacher);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateTeacher = asyncHandler(async (req, res) => {
  try {
    const { name,abrv } = req.body;
    const { id } = req.params;

    const teacher = await Teacher.findOne({ _id: id });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    teacher.name = name;
    teacher.abrv = abrv;

    const updatedTeacher = await Teacher.save();
    res.json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Teacher.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval server error" });
  }
});

const listTeachers = asyncHandler(async (req, res) => {
  try {
    const all = await Teacher.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readTeacher = asyncHandler(async (req, res) => {
  try {
    const Teacher = await Teacher.findOne({ _id: req.params.id });
    res.json(Teacher);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export { createTeacher, updateTeacher, removeTeacher, listTeachers, readTeacher };