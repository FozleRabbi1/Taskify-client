import { Button, Popover } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiHandWavingFill } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";

const SearchBar = () => {
    const text = (
        <div className="flex flex-col gap-2">
            <span  > <input type="checkbox" /> Item 1 </span>
            <span  > <input type="checkbox" /> Item 2</span>
            <span  > <input type="checkbox" /> Item 3</span>
        </div>
    ) ;

    return (
        <div className="search-bar flex justify-between items-center bg-white px-5 py-3 rounded-lg">

            <div className="flex items-center ">
                <AiOutlineSearch className="mr-3 text-lg text-gray-400" />
                <input className="text-lg" type="text" placeholder="Search" />
            </div>


            <div className="flex justify-end items-center ">
                <h2 className="bg-red-500 text-md font-semibold px-2 text-white rounded-md uppercase ">demo mode</h2>

                <IoIosNotificationsOutline className="text-3xl mx-2 font-extrabold text-gray-500" />
                <Popover  placement="rightTop" title={text}>
                    <Button className="border border-blue-500 px-2 py-1"> <TfiWorld /> English <FaAngleRight /> </Button>
                </Popover>

                <h2  className="flex items-center mx-2 font-semibold text-gray-500 ">Hi <PiHandWavingFill className="text-3xl mx-2 font-extrabold text-yellow-500" /> Admin</h2>
                <div className="border size-10 rounded-full relative">
                    <img className=" rounded-full w-full h-full" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjPWQTnePNQOhGoSq8Sv0hdxWo0QOU_Ys-6djgmxz3f7vYE_QqTANwmbRCU7TADxAQ6-dedxQ07miTw15vMFfBqOPxrZTid5BtVW8d55uP4Rl_z4jpHGUD8VjktnfAo5RMdLQ0ai7wJwOI/s570/Shazim+uddin+pp+image+with+stroke.jpg" alt="" />
                    <span className="bg-green-700 size-3 block rounded-full m-1 absolute -bottom-2 right-0 border border-white"></span>
                </div>
            </div>


        </div>
    );
};

export default SearchBar;