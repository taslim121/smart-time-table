import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  abrv : {
    type : String,
    trim: true,
    required: true,
    unique: true,
  },
  
});

export default mongoose.model("Teacher", teacherSchema);