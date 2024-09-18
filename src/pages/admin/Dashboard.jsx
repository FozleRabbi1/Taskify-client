/* eslint-disable no-unused-vars */
import { FaArrowRight, FaBars, FaRegFile } from "react-icons/fa";
import SearchBar from "../../shared/SearchBar";
import { IoBagCheck, IoBagOutline } from "react-icons/io5";
import { BsFileCheckFill } from "react-icons/bs";
import { BiNotepad, BiSolidUserDetail } from "react-icons/bi";
import ApexChart from "./ApexChart/ApexChart";
import { useState } from "react";
import Tab from "./DashboardTab/Tab";
import { ProjectsApi } from "../../redux/fetures/prjects/ProjectsApi";
import { TodosApi } from "../../redux/fetures/todos/todos";
import { Checkbox, Table } from "antd";
import moment from "moment";
import FooterHeadline from './../../shared/FooterHeadline';



const Dashboard = () => {
    const { data, isLoading: totalLoading } = ProjectsApi.useTotalDataCountQuery()
    const { data: todoData, isLoading } = TodosApi.useGetAllTodosQuery();
    const [checkedTodos, { isLoading: checkedLoading }] = TodosApi.useCheckedTodosMutation()

    const projectDataArray = data?.data?.projectData && Object.values(data?.data?.projectData);
    const tasksDataArray = data?.data?.allTasksData && Object.values(data?.data?.allTasksData);
    const todosDataArray = data?.data?.todoData && Object.values(data?.data?.todoData);

    const totalSeries = projectDataArray?.reduce((acc, item) => acc + item)
    const totalSeries2 = tasksDataArray?.reduce((acc, item) => acc + item)


    const tableData =
        todoData?.data?.map(({ _id, UpdatedAt, title, Description, Priority, title2, checked }) => ({
            key: _id,
            UpdatedAt,
            title,
            Description,
            Priority,
            title2,
            checked
        })) || [];
    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };


    const checkedHandlear = async (e) => {
        await checkedTodos({ id: e })
    };

    const columns = [
        {
            title: <span style={titleStyle}>Todo</span>,
            dataIndex: "title",
            render: (text, record) => (
                <span className="text-gray-400 opacity-90 text-[16px] font-semibold flex">
                    <Checkbox onClick={() => checkedHandlear(record.key)} checked={record.checked === true} ></Checkbox>
                    <div className="ml-4">
                        <h2 className={`text-xl text-gray-600 ${record.checked ? "line-through" : ""} `}>{record.title}</h2>
                        {moment(record?.title2).format('MMMM DD, YYYY h:mm:ss A')}
                    </div>
                </span>
            ),
        },
    ];


    const cardsData = [
        { _id: 1, title: "Total Projects", count: 253, icon: IoBagCheck, textColor: "text-blue-500" },
        { _id: 2, title: "Total Task", count: 253, icon: BsFileCheckFill, textColor: "text-green-500" },
        { _id: 3, title: "Total Users", count: 253, icon: BiSolidUserDetail, textColor: "text-yellow-500" },
        { _id: 4, title: "Total Clients", count: 253, icon: BiSolidUserDetail, textColor: "text-red-500" },
    ]

    const chartJsonData = [
        { _id: 1, title: "On Going", icon: IoBagOutline, textColor: "text-blue-500", },
        { _id: 2, title: "Completed", icon: IoBagOutline, textColor: "text-green-500", },
        { _id: 3, title: "Started", icon: IoBagOutline, textColor: "text-yellow-500", },
        { _id: 4, title: "In Review", icon: IoBagOutline, textColor: "text-red-500", },
        { _id: 5, title: "Default", icon: IoBagOutline, textColor: "text-green-700", },
    ];
    const chartJsonDataTitleArray = chartJsonData?.map(item => item.title)


    const chartJsonData2 = [
        { _id: 1, title: "On Going", icon: BiNotepad, textColor: "text-blue-500", },
        { _id: 2, title: "Completed", icon: BiNotepad, textColor: "text-green-500", },
        { _id: 3, title: "Started", icon: BiNotepad, textColor: "text-yellow-500", },
        { _id: 4, title: "In Review", icon: BiNotepad, textColor: "text-red-500", },
        { _id: 5, title: "Default", icon: BiNotepad, textColor: "text-green-700", },
    ];

    const chartJsonDataTitleArray2 = chartJsonData2?.map(item => item.title)

    const chartJsonData3 = [
        { _id: 1, title: "Done", icon: FaRegFile, textColor: "text-blue-500", },
        { _id: 2, title: "Pending", icon: FaRegFile, textColor: "text-green-500", },
    ];
    const chartJsonDataTitleArray3 = chartJsonData3?.map(item => item.title)



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

                {
                    totalLoading | isLoading ? <div className="h-[40vh] flex justify-center items-center"> <h2 className="text-xl font-semibold">Loading...</h2> </div>
                        :
                        <div className="grid grid-cols-3 gap-10" >

                            <div className="bg-white px-10 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-500 my-2">Project Statistics</h2>

                                <div className="w-[300px]">
                                    <ApexChart series={projectDataArray} labels={chartJsonDataTitleArray} />
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
                                            projectDataArray?.map(item => (
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
                                    <ApexChart series={tasksDataArray} labels={chartJsonDataTitleArray2} />
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
                                            tasksDataArray?.map(item => (
                                                <li key={item._id} className="mb-5 size-10 p-2 font-semibold text-gray-500 "> {item}</li>
                                            ))
                                        }

                                        <li className="mb-2 size-10 p-2 font-semibold text-gray-500"> {totalSeries2}</li>

                                    </ul>

                                </div>
                            </div>

                            <div className="bg-white pl-10 rounded-lg h-[60vh] overflow-hidden ">
                                <h2 className="text-lg font-semibold text-gray-500 my-2">Todos Overview</h2>
                                <div className="w-[300px]">
                                    <ApexChart series={todosDataArray} labels={chartJsonDataTitleArray3} />
                                </div>

                                <div className="mt-4 h-[60%] overflow-auto">
                                    <div className="overflow-x-auto py-10">
                                        <Table
                                            loading={isLoading || checkedLoading}
                                            columns={columns}
                                            dataSource={tableData}
                                            scroll={{ x: 'max-content' }}
                                            pagination={false}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>

                }

            </div>

            <div className="py-5" >
                <Tab />
                <FooterHeadline />

            </div>


        </div>
    );
};

export default Dashboard;