import { createSlice } from "@reduxjs/toolkit";

const tablesSlice = createSlice({
    name: 'tables',
    initialState : {
        tablesFilter : {
            searchTerm: "",
            selectedYear: "",
            selectedDept : "",
            selectedSort :[],
        },
        filteredTables: [],
        tableYears:[],
        uniqueYear: [],
        tableDept:[],
        uniqueDept: [],
    },

    reducers: {
        setTablesFilter: (state, action) => {
          state.tablesFilter = { ...state.tablesFilter, ...action.payload };
        },
        setFilteredTables: (state, action) => {
            state.filteredTables = action.payload;
          },
        setTableYears: (state, action) => {
            state.tableYears = action.payload;
          },
        setTableDept: (state, action) => {
            state.tableDept = action.payload;
          },
        setUniqueDept: (state, action) => {
            state.uniqueDept = action.payload;
          },
        setUniqueYear: (state, action) => {
            state.uniqueYear = action.payload;
          },
        
    },
});

export const {
    setFilteredTables,
    setTableDept,
    setTablesFilter,
    setTableYears,
    setUniqueDept,
    setUniqueYear,
} = tablesSlice.actions;

export default tablesSlice.reducer;