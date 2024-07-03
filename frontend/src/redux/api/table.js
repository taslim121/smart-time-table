import {apiSlice} from "./apiSlice.js"
import { TABLE_URL } from "../constants.js"

export const tableApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllTables: builder.query({
            query:() =>({
                url:`${TABLE_URL}/all-time-tables`,
            })
        }),
      createTable: builder.mutation({
        query:(newTable) =>({
            url:`${TABLE_URL}/create-table`,
            method: 'POST',
            body: newTable
        })
    }),
    specificTable : builder.query({
        query: (id) => `${TABLE_URL}/specific-timetable/${id}`,
    }),
    updateTable : builder.query({
        query : ({id,updatedTable}) => ({
            url : `${TABLE_URL}/update-timetable/${id}`,
            method : 'PUT',
            body : updatedTable

        })
    }),
    updateSubject : builder.mutation({
        query: ({ tableId, day, subjectId, updatedSubject }) => ({
            url: `${TABLE_URL}/update-timetable/${tableId}/${day}/${subjectId}`,
            method: 'PUT',
            body: updatedSubject,
        })
    }),
    deleteTable : builder.mutation({
        query : (id) =>({
            url: `${TABLE_URL}/delete-timetable/${id}`,
            method: "DELETE",
        }),
    }),


    }),
});

export const {useGetAllTablesQuery,useSpecificTableQuery,useCreateTableMutation,useUpdateSubjectMutation,useDeleteTableMutation} = tableApiSlice;
