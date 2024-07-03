import { useFetchTeachersQuery } from "../redux/api/teacher.js";

const findSubject = (table, day, timeSlot) => {
  const { data: teachers } = useFetchTeachersQuery(); 
  if (!table || !day || !timeSlot || !teachers) {
    return null;
  }

  const dayTimetable = table.timetable[day];
  if (!dayTimetable) {
    return null;
  }

  const specificSlot = dayTimetable.find(slot => slot.time_slot === timeSlot);
  if (!specificSlot) {
    return null;
  }
  const teacherId = specificSlot.teacher;
  const teacher = teachers.find(teacher => teacher._id === teacherId);
  const subjectWithNewlines = specificSlot.subject.replace(/\\n/g, '\n');
  const subjectLines = subjectWithNewlines.split('\n');

  return (
    <div>
      {subjectLines.map((line, index) => (
        <div key={index} className=" flex justify-center items-center  text-xl">{line}</div>
      ))}
      {teacher && (
        <div className="text-lg">{teacher.name}</div>
      )}
    </div>
  );
};

export { findSubject };
