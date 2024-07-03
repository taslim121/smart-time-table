import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTableMutation } from "../../redux/api/table.js";
import { toast } from "react-toastify";

const CreateTable = () => {
  const navigate = useNavigate();
  const [classroomName, setClassroomName] = useState("");
  const [classYear, setClassYear] = useState("");
  const [deptName, setDeptName] = useState("");
  const [timeSlots, setTimeSlots] = useState(Array(6).fill(""));

  const [createTableMutation, { isLoading }] = useCreateTableMutation();

  const handleTimeSlotChange = (index, value) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = value;
    setTimeSlots(newTimeSlots);
  };

  const handleCreateTable = async (e) => {
    e.preventDefault();
    try {
      if (!classroomName) {
        toast.error("Please enter classroom name");
        return;
      }

      const timetable = {
        Monday: timeSlots.map(slot => ({ time_slot: slot, subject: "", teacher: null })),
        Tuesday: timeSlots.map(slot => ({ time_slot: slot, subject: "", teacher: null })),
        Wednesday: timeSlots.map(slot => ({ time_slot: slot, subject: "", teacher: null })),
        Thursday: timeSlots.map(slot => ({ time_slot: slot, subject: "", teacher: null })),
        Friday: timeSlots.map(slot => ({ time_slot: slot, subject: "", teacher: null })),
        Saturday: timeSlots.map(slot => ({ time_slot: slot, subject: "", teacher: null })),
      };

      const emptyTableData = {
        classroom: classroomName,
        year: classYear,
        department: deptName,
        timetable: timetable,
      };

      const response = await createTableMutation(emptyTableData);

      const tableId = response.data._id;
      navigate(`/admin/tables/update/${tableId}`);

      toast.success("Table created successfully");
    } catch (error) {
      console.error("Failed to create table:", error);
      toast.error("Failed to create table");
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form onSubmit={handleCreateTable}>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Time Table</p>
        <div className="mb-4">
          <label className="block">Classroom Name:</label>
          <input
            type="text"
            id="classroomName"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Year:</label>
          <input
            type="text"
            id="classYear"
            value={classYear}
            onChange={(e) => setClassYear(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Department Name:</label>
          <input
            type="text"
            id="deptName"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="flex">
          {[0, 1, 2].map((index) => (
            <div key={index} className="mb-4 mr-4">
              <label className="block">{`Time Slot ${index + 1}:`}</label>
              <input
                type="text"
                value={timeSlots[index]}
                onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                className="border px-2 py-1 w-[calc(100%-1rem)]"
              />
            </div>
          ))}
        </div>
        <div className="flex">
          {[3, 4, 5].map((index) => (
            <div key={index} className="mb-4 mr-4">
              <label className="block">{`Time Slot ${index + 1}:`}</label>
              <input
                type="text"
                value={timeSlots[index]}
                onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                className="border px-2 py-1 w-[calc(100%-1rem)]"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Table"}
        </button>
      </form>
    </div>
  );
};

export default CreateTable;
