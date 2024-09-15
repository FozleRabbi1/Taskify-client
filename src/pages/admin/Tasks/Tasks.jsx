import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "../../../shared/SearchBar";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from "react";
import TasksCard from "./TasksCard";
import TaskTab from "../DashboardTab/TaskTab";

const Tasks = () => {

    const [layOut, setLayout] = useState(true)


    return (
        <div className="">

            <SearchBar />

            <div className="flex justify-end mt-10">
                <button className="bg-blue-600 text-2xl px-2 py-1 text-white rounded-md " onClick={() => { setLayout(!layOut) }} > {layOut ? <LuLayoutDashboard /> : <GiHamburgerMenu />}   </button>
            </div>

            <div className="my-10 bg-white p-5 rounded-xl ">

                {
                    layOut ? <TasksCard/> : <TaskTab />
                }


            </div>

            <h2 className="pb-10 text-[15px] text-gray-500 font-semibold">© 2024 , Made with ❤️ by <span className="text-blue-500 mr-4">Infinitie Technologies</span> v1.0.10</h2>

        </div>
    );
};

export default Tasks;