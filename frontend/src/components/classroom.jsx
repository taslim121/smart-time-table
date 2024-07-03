import { useEffect, useState } from "react";
import { useGetAllTablesQuery } from "../redux/api/table";

const useFindClassroom = (tableId) => {
  const [classroom, setClassroom] = useState("");
  const { data: allTables, isLoading, isError } = useGetAllTablesQuery();

  useEffect(() => {
    if (!isLoading && !isError && allTables) {
      const foundTable = allTables.find((table) => table._id === tableId);
      if (foundTable) {
        setClassroom(foundTable.classroom);
      }
    }
  }, [allTables, isLoading, isError, tableId]);

  return classroom;
};

export default useFindClassroom;
