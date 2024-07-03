import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tablesRoutes from "./routes/tablesRouter.js";
import teacherRoutes from "./routes/teacherRouter.js"

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/timetables", tablesRoutes);
app.use("/api/teacher",teacherRoutes);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));