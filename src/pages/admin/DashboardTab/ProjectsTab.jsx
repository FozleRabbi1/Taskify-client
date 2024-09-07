/* eslint-disable react/no-unescaped-entities */

import { Button, Modal, Select, Table } from "antd";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
import moment from "moment";
import { useState } from "react";
import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";


const ProjectsTab = () => {
    const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery({})
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [activeStars, setActiveStars] = useState([]);

    const handleStarClick = (key) => {
        setActiveStars(prevActiveStars =>
            prevActiveStars.includes(key)
                ? prevActiveStars.filter(starKey => starKey !== key)
                : [...prevActiveStars, key]
        );
    };

    const statusOptions = ["On Going", "Started", "Default"].map((item) => ({
        value: item,
        label: item,
    }));


    const tableData = data?.data?.map(({ _id, id, title, users, clients, status, priority, budget, tags, createdAt, updatedAt }) => ({
        key: _id,
        id,
        title,
        users,
        clients,
        status,
        priority,
        budget,
        tags,
        createdAt,
        updatedAt,
    }));

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };
    const [open, setOpen] = useState(false);

    const columns = [
        { title: <span style={titleStyle}>Id</span>, dataIndex: "id" },

        {
            title: <span style={titleStyle}>Title</span>,
            dataIndex: "title",
            render: (title, record) => (
                <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
                    {title}
                    {activeStars.includes(record.key) ? (
                        <FaStar
                            onClick={() => handleStarClick(record.key)}
                            className="text-yellow-500 mx-2 cursor-pointer"
                        />
                    ) : (
                        <FaRegStar
                            onClick={() => handleStarClick(record.key)}
                            className="text-yellow-500 mx-2 cursor-pointer"
                        />
                    )}
                    <AiOutlineMessage className="text-red-500" />
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>users</span>,
            dataIndex: "users",
            render: (users) => (
                <div style={{ display: 'flex', gap: '8px' }} className="flex items-center">
                    {users.map((url, index) => (
                        <img key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />


                    ))}
                    <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                        <FaRegEdit className="text-xl text-blue-600" />
                    </Button>
                </div>
            ),
        },
        {
            title: <span style={titleStyle}>Clients</span>,
            dataIndex: "clients",
            render: (clients) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {
                        clients?.length !== 0 ?
                            <div className="flex items-center">
                                {clients.map((url, index) => (
                                    <img key={index} src={url} alt={`Client ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                ))}
                                <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                    <FaRegEdit className="text-xl text-blue-600" />
                                </Button>

                            </div>
                            :
                            <div className="flex items-center">
                                <h2 className="bg-blue-600 text-white font-medium px-2 rounded-md uppercase opacity-80 flex items-center  "> Not Assigned </h2>
                                <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                    <FaRegEdit className="text-xl text-blue-600" />
                                </Button>
                            </div>
                    }
                </div>
            ),
        },
        // {
        //     title: <span style={titleStyle}>Status</span>,
        //     dataIndex: "status",
        //     render: (status) => (
        //         <div>
        //             <Select
        //                 placeholder={status}
        //                 style={{ width: '180px', textAlign : "center" }}
        //                 options={statusOptions}
        //                 className="text-red-500"
        //             />
        //         </div>
        //     ),
        // },
        // {
        //     title: <span style={titleStyle}>Status</span>,
        //     dataIndex: "status",
        //     render: (status) => (
        //         <div>
        //             <Select
        //                 placeholder={status}
        //                 style={{ width: '180px', textAlign: 'center' }}
        //                 options={statusOptions}
        //                 className="custom-select" // Add a custom class
        //             />
        //         </div>
        //     ),
        // },
        {
            title: <span style={titleStyle}>Priority</span>,
            dataIndex: "priority",
        },
        {
            title: <span style={titleStyle}>Budget</span>,
            dataIndex: "budget",
        },
        {
            title: <span style={titleStyle}>Tags</span>,
            dataIndex: "tags",
        },
        {
            title: <span style={titleStyle}>Starts At</span>,
            dataIndex: "createdAt",
            render: (date) => moment(date).format('MMMM DD, YYYY'),
        },
        {
            title: <span style={titleStyle}>Ends at</span>,
            dataIndex: "updatedAt",
            render: (date) => moment(date).format('MMMM DD, YYYY'),
        },
    ];

    return (
        <div>
            <h2 className="text-2xl text-gray-500 font-bold mb-4">Admin's Projects</h2>

            <Table
                bordered
                loading={isLoading}
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: "sorter-icon" }}
                rowSelection={rowSelection}

            />

            <Modal
                title="Up Comming"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>


        </div>
    );
};

export default ProjectsTab;