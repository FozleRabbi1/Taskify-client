import { FaArrowRight } from "react-icons/fa";
import SearchBar from "../../shared/SearchBar";
import { IoBagCheck } from "react-icons/io5";
import { BsFileCheckFill } from "react-icons/bs";
import { BiSolidUserDetail } from "react-icons/bi";
import ApexChart from "./ApexChart/ApexChart";
import { useState } from "react";



const Dashboard = () => {
    const [chartData, setChartData] = useState([])


    const cardsData = [
        { _id: 1, title: "Total Projects", count: 253, icon: IoBagCheck, color: "green-500" },
        { _id: 2, title: "Total Task", count: 253, icon: BsFileCheckFill, color: "blue-500" },
        { _id: 3, title: "Total Users", count: 253, icon: BiSolidUserDetail, color: "yellow-500" },
        { _id: 4, title: "Total Clients", count: 253, icon: BiSolidUserDetail, color: "skay-500" },
    ]

    const chartJsonData = [
        { _id: 1, title: "Started" },
        { _id: 2, title: "Default" },
        { _id: 3, title: "On Going" },
        { _id: 4, title: "In Review" },
    ]

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
                                {item.icon && <item.icon size={40} className="mb-4" />}
                                <h2 className="text-lg font-semibold text-gray-500">{item.title}</h2>
                                <h3 className="text-2xl font-semibold text-gray-600">{item.count}</h3>
                                <button className="flex items-center"> <FaArrowRight className="mr-2" /> view more</button>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div>

                <div className="grid grid-cols-3 gap-10 " >
                    {
                        chartTitle.map(item => (
                            <div key={item._id} className="bg-white px-10">
                                <h2>{item.title}</h2>

                                <div className="w-[300px]">
                                    <ApexChart setChartData={setChartData} chartJsonData={chartJsonData} />
                                </div>


                                <div className="flex justify-between">
                                    
                                    <ul>
                                        {
                                            chartJsonData.map(item => (
                                                <li key={item._id}> {item.title}</li>
                                            ))
                                        }
                                    </ul>

                                    <ul>
                                        {
                                            chartData.map(item => (
                                                <li key={item._id}> {item}</li>
                                            ))
                                        }
                                    </ul>

                                </div>


                            </div>
                        ))
                    }



                    {/* <div className="bg-white">
                        <h2>Project Statistics</h2>
                        <div className="w-[300px]">
                            <ApexChart setChartData={setChartData} />
                        </div>

                        <ul>
                            {
                                chartJsonData.map(item => (
                                    <li key={item._id}> {item.title}</li>
                                ))
                            }
                        </ul>
                    </div>
                     */}

                </div>

            </div>





        </div>
    );
};

export default Dashboard;