/* eslint-disable no-unused-vars */
import { FaArrowRight, FaBars, FaRegFile } from "react-icons/fa";
import SearchBar from "../../shared/SearchBar";
import { IoBagCheck, IoBagOutline } from "react-icons/io5";
import {  BsFileCheckFill } from "react-icons/bs";
import { BiSolidUserDetail } from "react-icons/bi";
import ApexChart from "./ApexChart/ApexChart";
import { useState } from "react";
import Tab from "./DashboardTab/Tab";



const Dashboard = () => {
    const [series, setSeries] = useState([44, 55, 41, 30]);
    const [series2, setSeries2] = useState([60, 70, 80, 100]);
    const [series3, setSeries3] = useState([60,100]);
    const totalSeries = series.reduce((acc, item)=> acc + item)
    const totalSeries2 = series2.reduce((acc, item)=> acc + item)
    const totalSeries3 = series3.reduce((acc, item)=> acc + item)


    const cardsData = [
        { _id: 1, title: "Total Projects", count: 253, icon: IoBagCheck, textColor: "text-blue-500" },
        { _id: 2, title: "Total Task", count: 253, icon: BsFileCheckFill, textColor: "text-green-500" },
        { _id: 3, title: "Total Users", count: 253, icon: BiSolidUserDetail, textColor: "text-yellow-500" },
        { _id: 4, title: "Total Clients", count: 253, icon: BiSolidUserDetail, textColor: "text-red-500" },
    ]

    const chartJsonData = [
        { _id: 1, title: "Started", icon: IoBagOutline, textColor: "text-blue-500", },
        { _id: 2, title: "Default", icon: IoBagOutline, textColor: "text-green-500", },
        { _id: 3, title: "On Going", icon: IoBagOutline, textColor: "text-yellow-500", },
        { _id: 4, title: "In Review", icon: IoBagOutline, textColor: "text-red-500", },
    ];
    const chartJsonDataTitleArray = chartJsonData?.map(item => item.title)
    
    const chartJsonData2 = [
        { _id: 1, title: "Started", icon: FaRegFile , textColor: "text-blue-500", },
        { _id: 2, title: "Default", icon: FaRegFile , textColor: "text-green-500", },
        { _id: 3, title: "On Going", icon: FaRegFile , textColor: "text-yellow-500", },
        { _id: 4, title: "In Review", icon: FaRegFile , textColor: "text-red-500", },
    ];
    const chartJsonDataTitleArray2 = chartJsonData2?.map(item => item.title)
    
    const chartJsonData3 = [
        { _id: 1, title: "Done", icon: FaRegFile , textColor: "text-blue-500", },
        { _id: 2, title: "Pending", icon: FaRegFile , textColor: "text-green-500", },
    ];
    const chartJsonDataTitleArray3 = chartJsonData3?.map(item => item.title)


    const chartTitle = [
        { _id: 1, title: "Project Statistics" },
        { _id: 2, title: "Task Statistics" },
        { _id: 3, title: "Todos Overview" },
    ]

    return (
        <div>
            <SearchBar />

            <div>
                <div className="grid grid-cols-4 my-5 gap-5">
                    {
                        cardsData?.map(item => (
                            <div key={item._id} className="bg-white p-5 rounded-lg"  >
                                {item.icon && <item.icon size={40} className={`mb-4 ${item.textColor} `} />}
                                <h2 className="text-lg font-semibold text-gray-500">{item.title}</h2>
                                <h3 className="text-2xl font-semibold text-gray-600">{item.count}</h3>
                                <button className="flex items-center"> <FaArrowRight className="mr-2 my-2" /> view more</button>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <div className="grid grid-cols-3 gap-10" >

                    <div className="bg-white px-10 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-500 my-2">Project Statistics</h2>
                        <div className="w-[300px]">
                            <ApexChart series={series} labels={chartJsonDataTitleArray} />
                        </div>
                        <div className="flex justify-between mt-4">
                            <ul>
                                {
                                    chartJsonData.map(item => (
                                        <li key={item._id} className="flex items-center mb-5 font-bold text-gray-500">
                                            {item.icon && <item.icon size={20} className={`size-10 p-2 bg-blue-50 rounded-lg mr-3 ${item.textColor}`} />} {item.title}
                                        </li>
                                    ))
                                }
                                <li className="flex items-center mb-2 font-bold text-gray-500"> <FaBars size={20} className={`size-10 p-2 bg-blue-50 rounded-lg mr-3`} />  total</li>
                            </ul>
                            <ul>
                                {
                                    series.map(item => (
                                        <li key={item._id} className="mb-5 size-10 p-2 font-semibold text-gray-500 "> {item}</li>
                                    ))
                                }
                                <li className="mb-2 size-10 p-2 font-semibold text-gray-500"> {totalSeries}</li>

                            </ul>
                        </div>
                    </div>


                    <div className="bg-white px-10 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-500 my-2">Task Statistics</h2>
                        <div className="w-[300px]">
                        <ApexChart series={series2} labels={chartJsonDataTitleArray2} />
                        </div>
                        <div className="flex justify-between mt-4">
                            <ul>
                                {
                                    chartJsonData2.map(item => (
                                        <li key={item._id} className="flex items-center mb-5 font-bold text-gray-500">
                                            {item.icon && <item.icon size={20} className={`size-10 p-2 bg-blue-50 rounded-lg mr-3 ${item.textColor}`} />} {item.title}
                                        </li>
                                    ))
                                }
                                <li className="flex items-center mb-2 font-bold text-gray-500"> <FaBars size={20} className={`size-10 p-2 bg-blue-50 rounded-lg mr-3`} />  total</li>
                            </ul>
                            <ul>
                                {
                                    series.map(item => (
                                        <li key={item._id} className="mb-5 size-10 p-2 font-semibold text-gray-500 "> {item}</li>
                                    ))
                                }
                                <li className="mb-2 size-10 p-2 font-semibold text-gray-500"> {totalSeries2}</li>

                            </ul>
                        </div>
                    </div>

                    <div className="bg-white px-10 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-500 my-2">Task Statistics</h2>
                        <div className="w-[300px]">
                        <ApexChart series={series2} labels={chartJsonDataTitleArray3} />
                        </div>
                        <div className="mt-4">
                           <ul>
                            <li> <input type="checkbox" className="mb-2 size-5 p-2 font-semibold text-gray-500" /> Item </li>
                            <li> <input type="checkbox" className="mb-2 size-5 p-2 font-semibold text-gray-500" /> Item </li>
                            <li> <input type="checkbox" className="mb-2 size-5 p-2 font-semibold text-gray-500" /> Item </li>
                            <li> <input type="checkbox" className="mb-2 size-5 p-2 font-semibold text-gray-500" /> Item </li>
                           </ul>
                        </div>
                    </div>



                </div>
            </div>


            <div className="py-5" >
                <Tab/>
                <h2 className="mb-4 mt-6 text-[15px] text-gray-500 font-semibold">© 2024 , Made with ❤️ by <span className="text-blue-500 mr-4">Infinitie Technologies</span> v1.0.10</h2>

            </div>





        </div>
    );
};

export default Dashboard;