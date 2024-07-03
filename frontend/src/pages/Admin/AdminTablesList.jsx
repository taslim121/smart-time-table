import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllTablesQuery } from "../../redux/api/table";

const AdminTablesList = () => {
  const { data: tables } = useGetAllTablesQuery();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [filteredTables, setFilteredTables] = useState([]);

  useEffect(() => {
    setFilteredTables(tables);
  }, [tables]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    filterTables(year, selectedDept);
  };

  const handleDeptChange = (department) => {
    setSelectedDept(department);
    filterTables(selectedYear, department);
  };

  const filterTables = (year, department) => {
    let filteredData = tables;
    if (year) {
      filteredData = filteredData.filter((table) => table.year === year);
    }
    if (department) {
      filteredData = filteredData.filter((table) => table.department === department);
    }
    setFilteredTables(filteredData);
  };

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Tables ({filteredTables?.length})
          </div>

          <div className="flex justify-center items-center mt-4">
            <select
              className="border p-2 rounded ml-4 text-black"
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="">Select Year</option>
              {/* Assuming unique years are available in tables data */}
              {tables && Array.from(new Set(tables.map((table) => table.year))).map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className="border p-2 rounded ml-4 text-black"
              value={selectedDept}
              onChange={(e) => handleDeptChange(e.target.value)}
            >
              <option value="">Select Department</option>
              {/* Assuming unique departments are available in tables data */}
              {tables && Array.from(new Set(tables.map((table) => table.department))).map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap justify-around items-center p-[2rem]">
            {filteredTables?.map((table) => (
              <Link key={table._id}
                to={`/admin/tables/update/${table._id}`}
                className="block mb-4 overflow-hidden">
                <div className="flex">
                  <div
                    key={table._id}
                    className="max-w-sm  m-[1rem] rounded overflow-hidden shadow-lg "
                  >
                    <div className="flex justify-center items-center h-16 w-full p-4 border-2 border-white rounded-md "> {table.classroom}</div>

                    <div className="mt-[2rem] mb-[1rem]">
                      <Link
                        to={`/admin/tables/update/${table._id}`}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update Table
                      </Link>
                    </div>
                  </div>
                </div>

              </Link>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminTablesList;
