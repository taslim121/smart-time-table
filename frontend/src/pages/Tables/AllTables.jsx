import { useGetAllTablesQuery } from "../../redux/api/table.js";
import TableCard from "./TableCard.jsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilteredTables,
  setTablesFilter,
} from "../../redux/features/tables/tableSlice.js";
import banner from "../../assets/banner.jpg";

const AllTables = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllTablesQuery();
  const { tablesFilter, filteredTables } = useSelector((state) => state.tables);
  const { selectedYear, selectedDept, searchTerm } = tablesFilter;

  const TableYears = data?.map((table) => table.year);
  const uniqueYears = Array.from(new Set(TableYears));

  const TableDept = data?.map((table) => table.department);
  const uniqueDepts = Array.from(new Set(TableDept));

  useEffect(() => {
    if (data) {
      dispatch(setFilteredTables(data));
    }
  }, [data, dispatch]);

  const handleYearChange = (year) => {
    const filteredData = data.filter((table) => {
      return table.year === year && (selectedDept === "" || table.department === selectedDept);
    });
    dispatch(setTablesFilter({ selectedYear: year, selectedDept: selectedDept, searchTerm: searchTerm }));
    dispatch(setFilteredTables(filteredData));
  };
  
  const handleDeptChange = (department) => {
    const filteredData = data.filter((table) => {
      return table.department === department && (selectedYear === "" || table.year === selectedYear);
    });
    dispatch(setTablesFilter({ selectedYear: selectedYear, selectedDept: department, searchTerm: searchTerm }));
    dispatch(setFilteredTables(filteredData));
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    dispatch(setTablesFilter({ selectedYear: selectedYear, selectedDept: selectedDept, searchTerm: searchTerm }));

    const filteredData = data.filter((table) => table.classroom.toLowerCase().includes(searchTerm.toLowerCase()));
    dispatch(setFilteredTables(filteredData));
  };

  const handleReset = () => {
    dispatch(setTablesFilter({ selectedYear: "", selectedDept: "", searchTerm: "" }));
    dispatch(setFilteredTables(data));
  };
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <section>
        <div className="relative h-[40rem] w-screen mb-10 flex items-center justify-center bg-cover " style={{ backgroundImage: `url(${banner})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
          <div className="relative z-10 text-center text-white mt-[10rem]">
            <h1 className="text-8xl font-bold mb-4">The TimeTables Hub</h1>
            <p className="text-2xl">The TimeTables Hub: Navigating through the Schedules and Departments</p>
          </div>
          <section className="absolute -bottom-[5rem]">
            <input
              type="text"
              className="w-[100%] h-[5rem] border px-10 outline-none rounded"
              placeholder="Search Timetable"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
              <select
                className="border p-2 rounded ml-4 text-black"
                value={selectedYear || ""}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="">Year</option>
                {uniqueYears.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded ml-4 text-black"
                value={selectedDept || ""}
                onChange={(e) => handleDeptChange(e.target.value)}
              >
                <option value="">Department</option>
                {uniqueDepts.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {(selectedYear || selectedDept) && (
                <button
                  className="border p-2 rounded ml-4 text-black bg-white"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </section>
          </section>
        </div>
        <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
          {filteredTables?.map((table) => (
            <TableCard key={table._id} table={table} />
          ))}
        </section>
      </section>
    </div>
  );
};

export default AllTables;
