import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const timetableSchema = new mongoose.Schema({
  classroom: {
    type: String,
    required: true
  },
  year: { type: String, required: true },
  department: { type: String, required: true },
  timetable: {
    type: {
      Monday: [{
        time_slot: String,
        subject: String,
        teacher: { type: ObjectId, ref: "Teacher" },
      }],
      Tuesday: [{
        time_slot: String,
        subject: String,
        teacher: { type: ObjectId, ref: "Teacher" },// Adding teacher field
      }],
      Wednesday: [{
        time_slot: String,
        subject: String,
        teacher:{ type: ObjectId, ref: "Teacher" }, // Adding teacher field
      }],
      Thursday: [{
        time_slot: String,
        subject: String,
        teacher: { type: ObjectId, ref: "Teacher"}, // Adding teacher field
      }],
      Friday: [{
        time_slot: String,
        subject: String,
        teacher: { type: ObjectId, ref: "Teacher"}, // Adding teacher field
      }],
      Saturday: [{
        time_slot: String,
        subject: String,
        teacher: { type: ObjectId, ref: "Teacher" }, // Adding teacher field
      }]
    },
    required: true
  }
});


const Timetable = mongoose.model('Timetable', timetableSchema);

export  default Timetable;
