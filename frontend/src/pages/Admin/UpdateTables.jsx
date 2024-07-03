import { useState } from "react";
import React from 'react';
import { useParams, Link ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSpecificTableQuery,useDeleteTableMutation } from "../../redux/api/table.js";
import {findSubject} from "../../components/findSubject.jsx";
import findSubjectId from "../../components/findSubjectId.jsx";
import useFindClassroom from "../../components/classroom.jsx";
import "./index.css";

const UpdateTables = () => {
  const { id: tableId } = useParams();
  const navigate = useNavigate();
    const { data: table } = useSpecificTableQuery(tableId);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [deleteTable] = useDeleteTableMutation();
    const handleDeleteTable = async () => {
      try {
        toast.success("Table deleted successfully");
        await deleteTable(tableId);
        navigate("/admin/tables-list");
      } catch (error) {
        console.error("Failed to delete Table:", error);
        toast.error(`Failed to delete Table: ${error?.message}`);
      }
    };
    const getTimeSlots = (tableData) => {
      if (tableData && tableData.timetable && tableData.timetable.Monday) {
          return tableData.timetable.Monday.map(slot => slot.time_slot);
      }
      return [
          "09:30 - 10:30",
          "10:30 - 11:30",
          "11:30 - 1:30",
          "1:30 - 2:30",
          "2:30 - 3:30",
          "3:30 - 4:30"
      ];
  };

  const timeSlots = getTimeSlots(table);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
  return (
    <>
      <div>
        <Link
          to="/admin/tables-list"
          className="  text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>
      <div className=" text-white font-bold text-5xl p-5 flex justify-center">
      {useFindClassroom(tableId)}
      </div>
      <div className="flex justify-center items-center">
    <div className="grid grid-cols-7 gap-5">
      {/* Render header row */}
      <div className="bg-black p-4 flex justify-center items-center relative text-white shadow">
        DAY/TIME
      </div>
      {timeSlots.map((timeSlot, index) => (
        <div
          key={index}
          className="bg-black p-4 flex justify-center items-center relative text-white shadow"
        >
          {timeSlot}
        </div>
      ))}

      {/* Render data rows */}
      {days.map((day, dayIndex) => (
        <React.Fragment key={dayIndex}>
          <div className="bg-black p-4 flex justify-center items-center relative text-white shadow">
            {day}
          </div>
          {timeSlots.map((timeSlot, innerIndex) => {
            const cellIndex = dayIndex * timeSlots.length + innerIndex;
            return (
              <div
                key={innerIndex}
                className="bg-black p-4 flex justify-center items-center relative text-white shadow"
                style={{ whiteSpace: 'pre-line' }}
                onMouseEnter={() => setHoveredCell(cellIndex)}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {findSubject(table, day, timeSlot)}
                {hoveredCell === cellIndex && (
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ zIndex: 1 }}
                  >
                    <Link
                      to={`/admin/tables/update/${tableId}/${day}/${findSubjectId(table,day,timeSlot)}`}
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  </div>
  <div className="flex justify-center py-10">
    <button
          type="button"
          onClick={handleDeleteTable}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2 text-3xl"
         
        >
          Delete Table
        </button>
        </div>
    </>
  )
}

export default UpdateTables