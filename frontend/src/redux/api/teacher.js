import { apiSlice } from "./apiSlice.js";
import { TEACHER_URL } from "../constants.js";

export const teacherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createTeacher: builder.mutation({
        query: (newTeacher) => ({
          url: `${TEACHER_URL}`,
          method: "POST",
          body: newTeacher,
        }),
      }),
  
      updateTeacher: builder.mutation({
        query: ({ id, updateTeacher }) => ({
          url: `${TEACHER_URL}/${id}`,
          method: "PUT",
          body: updateTeacher,
        }),
      }),
  
      deleteTeacher: builder.mutation({
        query: (id) => ({
          url: `${TEACHER_URL}/${id}`,
          method: "DELETE",
        }),
      }),
  
      fetchTeachers: builder.query({
        query: () => `${TEACHER_URL}/teachers`,
      }),
    }),
  });
  
  export const {
    useCreateTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
    useFetchTeachersQuery,
  } = teacherApiSlice;