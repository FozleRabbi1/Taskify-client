import { Button, Popover } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiHandWavingFill } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { useAppDispatch } from "../redux/hooks";
import { logOut, selectCurrentUser } from "../redux/fetures/auth/authSlice";
import { useSelector } from "react-redux";

const SearchBar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [data, setData] = useState({})
    // console.log(data.data.image);
    

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/auth/${currentUser?.email}`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [currentUser?.email])



    const dispatch = useAppDispatch();
    const handleLOgout = () => {
        dispatch(logOut());
    };
    const [isOpen, setIsOpen] = useState(false)
    const text = (
        <div className="flex flex-col gap-2">
            <span  > <input type="checkbox" /> Item 1 </span>
            <span  > <input type="checkbox" /> Item 2</span>
            <span  > <input type="checkbox" /> Item 3</span>
        </div>
    );



    return (
        <div className="search-bar flex justify-between items-center bg-white px-5 py-3 rounded-lg">

            <div className="flex items-center ">
                <AiOutlineSearch className="mr-3 text-lg text-gray-400" />
                <input className="text-lg" type="text" placeholder="Search" />
            </div>


            <div className="flex justify-end items-center ">
                <h2 className="bg-red-500 text-md font-semibold px-2 text-white rounded-md uppercase ">demo mode</h2>

                <IoIosNotificationsOutline className="text-3xl mx-2 font-extrabold text-gray-500" />
                <Popover placement="rightTop" title={text}>
                    <Button className="border border-blue-500 px-2 py-1"> <TfiWorld /> English <FaAngleRight /> </Button>
                </Popover>

                <h2 className="flex items-center mx-2 font-semibold text-gray-500 ">Hi <PiHandWavingFill className="text-3xl mx-2 font-extrabold text-yellow-500" /> Admin</h2>


                {/* <Popover content={content} title="" trigger="click" className="cursor-pointer" placement="rightBottom"> */}

                <div className="relative">
                    <div onClick={() => setIsOpen(!isOpen)} className="border size-10 rounded-full relative cursor-pointer">
                        <img className=" rounded-full w-full h-full" src={data?.data?.image} alt="" />
                        <span className="bg-green-700 size-3 block rounded-full m-1 absolute -bottom-2 right-0 border border-white"></span>
                    </div>

                    <div className={`absolute ${isOpen ? "block" : "hidden"} bg-white py-3 px-5 -ml-[100px] `}>
                        <div>
                            <img className="size-10 rounded-full" src={data?.data?.image} alt="" />
                        </div>
                        <h2>admin</h2>

                        <button onClick={handleLOgout} className="border border-red-600 py-[2px] px-3">Log-Out</button>
                    </div>
                </div>

                {/* </Popover> */}
            </div>


        </div>
    );
};

export default SearchBar;