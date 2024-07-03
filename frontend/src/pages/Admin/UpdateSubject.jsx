import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateSubjectMutation, useSpecificTableQuery } from "../../redux/api/table.js";
import { useFetchTeachersQuery } from "../../redux/api/teacher.js";
import { toast } from "react-toastify";

const UpdateSubject = () => {
    const { tableId, day, subjectId } = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [teacher, setTeacher] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateSubjectMutation] = useUpdateSubjectMutation();
    const { data: table } = useSpecificTableQuery(tableId);
    const { data: teachers, isLoading: isLoadingTeachers } = useFetchTeachersQuery();

    // Set teacher when teachers data is available
    useEffect(() => {
        if (teachers && teachers.length > 0) {
            // Check if current teacher is in the list of available teachers
            if (!teachers.find(t => t._id === teacher)) {
                // If not, set the first teacher as default
                setTeacher(teachers[0]._id);
            }
        }
    }, [teachers, teacher]);

    useEffect(() => {
        if (table) {
            const dayTimetable = table.timetable[day];
            if (dayTimetable && subjectId) {
                const specificSlot = dayTimetable.find(slot => slot._id === subjectId);
                if (specificSlot) {
                    setSubject(specificSlot.subject);
                    if (specificSlot.teacher) {
                        setTeacher(specificSlot.teacher);
                    }
                } else {
                    console.log('Subject not found');
                }
            }
        }
    }, [tableId, day, subjectId, isLoading]);

    const handleUpdateSubject = async () => {
        if (!subject) {
            toast.error("Please enter a subject name");
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                tableId: tableId,
                day: day,
                subjectId: subjectId,
                updatedSubject: { subject: subject, teacher: teacher }
            };

            await updateSubjectMutation(payload);

            toast.success("Slot updated successfully");
            navigate(`/admin/tables/update/${tableId}`);
        } catch (error) {
            console.error("Failed to update subject:", error);
            toast.error("Failed to update subject");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container flex justify-center items-center mt-4">
            <form>
                <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Subject</p>
                <div className="mb-4">
                    <label className="block">Subject Name:
                        <input
                            type="text"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="border px-2 py-1 w-full"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">Teacher:
                        <select
                            name="teacher"
                            value={teacher}
                            onChange={(e) => setTeacher(e.target.value)}
                            className="border px-2 py-1 w-full text-black"
                        >
                            <option value="">Select a teacher</option>
                            {teachers &&
                                teachers.map(teacher => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.name}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>
                <button
                    type="button"
                    onClick={handleUpdateSubject}
                    className="bg-teal-500 text-white px-4 py-2 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Slot"}
                </button>
            </form>
        </div>
    );
};

export default UpdateSubject;
