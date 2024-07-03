const findSubjectId = (table, day, timeSlot) => {
    if (!table || !day || !timeSlot) {
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
  
    return specificSlot._id ;
  };
  
  export default findSubjectId;