import { Link } from "react-router-dom";
import "./index.css"
const TableCard = ({ table }) => {
  return (
    <div key={table._id} className="relative group m-[2rem] ">
      <Link to={`/tables/${table._id}` } className=" w-[13rem] h-[10rem] rounded ml-2 mr-2 p-5 transition duration-300 ease-in-out transform group-hover:opacity-50  flex justify-center items-center text-3xl font-bold rounded-md bg-gradient-to-b from-green-500 to-lime-400">
        {table.classroom}
      </Link>

      {/* <p className="absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {table.classroom}
      </p>  */}
    </div>
  );
};

export default TableCard;