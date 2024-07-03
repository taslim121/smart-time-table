import React from 'react';
import { useParams, Link } from "react-router-dom";
import { useSpecificTableQuery } from "../../redux/api/table.js";
import FindClassroom from "../../components/classroom.jsx";
import { findSubject } from "../../components/findSubject.jsx";
import "./index.css";

const TableDetails = () => {
    const { id: tableId } = useParams();
    const { data: table } = useSpecificTableQuery(tableId);

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

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <>
            <div>
                <Link
                    to="/"
                    className="text-white font-semibold hover:underline ml-[10rem]"
                >
                    Go Back
                </Link>
            </div>
            <div className="text-white font-bold text-5xl p-5 flex justify-center">
                {FindClassroom(tableId)}
            </div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-7 gap-5">
                    {/* Render header row */}
                    <div className="bg-black p-4 flex justify-center items-center relative text-white shadow" style={{
                                 background:
                                   "radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%)"
                               }}>
                        DAY/TIME
                    </div>
                    {timeSlots.map((timeSlot, index) => (
                        <div key={index} className="bg-black p-4 flex justify-center items-center relative text-white shadow" style={{
                            background:
                              "radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%)"
                          }}>
                            {timeSlot}
                        </div>
                    ))}

                    {/* Render data rows */}
                    {days.map((day, index) => (
                        <React.Fragment key={index}>
                            <div className="bg-black p-4 flex justify-center items-center relative text-white shadow" style={{
                                 background:
                                   "radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%)"
                               }}>
                                {day}
                            </div>
                            {timeSlots.map((timeSlot, innerIndex) => (
                               <div
                               key={innerIndex}
                               className="bg-black p-4 flex justify-center items-center relative text-white shadow"
                               style={{
                                 background:
                                   "radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%)"
                               }}
                             >
                               {findSubject(table, day, timeSlot)}
                             </div>
                             
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TableDetails;
