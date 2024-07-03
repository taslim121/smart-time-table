import { Link } from "react-router-dom";
import SliderUtil from "../../components/SliderUtil.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllTablesQuery } from "../../redux/api/table";
const Header = () => {
    const {data} = useGetAllTablesQuery();
    const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
    <nav className="w-full h-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0 border-2 p-2 border-white-500 border-opacity-50 shadow">
      <Link
        to="/"
        className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
      >
        Home
      </Link>
      <Link
      to = "/timetables"
        className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
      >
        TimeTables
      </Link>
    </nav>

    <div className=" w-full md:w-[80%] mr-0 md:mr-2 pr-7">
      <SliderUtil data={data} />
    </div>
  </div>
);
};

export default Header;