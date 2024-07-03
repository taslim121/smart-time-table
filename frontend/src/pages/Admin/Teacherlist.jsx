import { useState } from "react";
import {
    useCreateTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
    useFetchTeachersQuery,
} from "../../redux/api/teacher";

import { toast } from "react-toastify";
import TeacherForm from "../../components/TeacherForm";
import Modal from "../../components/Modal";
import React from 'react'

const Teacherlist = () => {
    const { data: teachers, refetch } = useFetchTeachersQuery();
  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [updatingAbrv, setUpdatingAbrv] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const handleCreateTeacher = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Teacher name is required");
      return;
    }

    try {
      const result = await createTeacher({ name,abrv }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        setAbrv("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating Teacher failed, try again.");
    }
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();

    if (!updateTeacher) {
      toast.error("Teacher name is required");
      return;
    }

    try {
      const result = await updateTeacher({
        id: selectedTeacher._id,
        updateTeacher: {
          name: updatingName,
          abrv: updatingAbrv,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedTeacher(null);
        setUpdatingName("");
        setUpdatingAbrv("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      const result = await deleteTeacher(selectedTeacher._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedTeacher(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Teacher deletion failed. Tray again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Teachers</h1>
        <TeacherForm
          name={name}
          abrv = {abrv}
          setName={setName}
          setAbrv = {setAbrv}
          handleSubmit={handleCreateTeacher}
        />

        <br />

        <div className="flex flex-wrap">
          {teachers?.map((teacher) => (
            <div key={teacher._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedTeacher(teacher);
                    setUpdatingName(teacher.name);
                    setUpdatingAbrv(teacher.abrv);
                  }
                }}
              >
                {teacher.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <TeacherForm
            name={updatingName}
            abrv = {updatingAbrv}
            setName={(value) => setUpdatingName(value)}
            setAbrv = {(value) => setUpdatingAbrv(value)}
            handleSubmit={handleUpdateTeacher}
            buttonText="Update"
            handleDelete={handleDeleteTeacher}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Teacherlist;