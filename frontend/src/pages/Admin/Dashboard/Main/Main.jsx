import { useGetUsersQuery } from "../../../../redux/api/userSlice.js"
import { useGetAllTablesQuery } from "../../../../redux/api/table.js";
import SecondaryCard from "./SecondaryCard.jsx";
const Main = () => {
    const { data: visitors } = useGetUsersQuery();
    const { data: AllTables } = useGetAllTablesQuery();

  return (
    <div>
        <section className="flex justify-around">
            <div className="ml-[14rem] mt-10">
                <div className="-translate-x-4 flex">
                    <SecondaryCard
                    pill="Users"
                    content={visitors?.length}
                    info="Total No.Users on this app"
                    gradient="from-teal-500 to-lime-400"
                />
                 <SecondaryCard
              pill="Tables"
              content={AllTables?.length}
              info="No. of TimeTables"
              gradient="from-green-500 to-lime-400"
            />

                </div>
            </div>
          
          
        </section>
    </div>
  )
}

export default Main