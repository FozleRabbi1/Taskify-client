import { FaEdit } from "react-icons/fa";
import { TodosApi } from "../../../redux/fetures/todos/todos";
import { Checkbox, Table } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";

const Todos = () => {
    const { data, isLoading } = TodosApi.useGetAllTodosQuery();
    const [open, setOpen] = useState(false);
    const [updateId, setUpdateId] = useState("");

    const tableData =
        data?.data?.map(({ _id, UpdatedAt, title, Description, Priority, title2 }) => ({
            key: _id,
            UpdatedAt,
            title,
            Description,
            Priority,
            title2,
        })) || [];

    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };

    const handleUpdateData = (id) => {
        setOpen(true);
        setUpdateId(id);
    };

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const columns = [
        {
            title: <span style={titleStyle}>Todo</span>,
            dataIndex: "title",
            render: (text, record) => (
                <span className="text-gray-400 opacity-90 text-[16px] font-semibold flex">
                    <Checkbox onChange={onChange}></Checkbox>
                    <div className="ml-4">
                        <h2 className="text-xl text-gray-600">{record.title}</h2>
                        {moment(record?.title2).format('MMMM DD, YYYY h:mm:ss A')}
                    </div>
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Priority</span>,
            dataIndex: "Priority",
            render: (Priority) => (
                <span className="text-gray-500 opacity-90 text-[16px] font-semibold flex items-center">
                    {Priority}
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Description</span>,
            dataIndex: "Description",
            render: (Description) => (
                <span className="text-gray-500 opacity-90 text-[16px] font-semibold flex items-center">
                    {Description}
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Updated At</span>,
            dataIndex: "UpdatedAt",
            render: (UpdatedAt) => (
                <span className="text-gray-500 opacity-90 text-[16px] font-semibold flex items-center">
                    {moment(UpdatedAt).format('MMMM DD, YYYY h:mm:ss A')}
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Action</span>,
            dataIndex: "action",
            render: (text, record) => (
                <div className="">
                    <button
                        title="Update"
                        onClick={() => handleUpdateData(record.key)}
                        className="text-xl mr-6 text-blue-500"
                    >
                        <FaEdit className="text-xl text-blue-500" />
                    </button>
                    <button title="Delete">
                        <RiDeleteBin5Line className="text-xl mr-6 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>This is the todo page</h2>

            <div className="overflow-x-auto py-10">
                <Table
                    bordered
                    loading={isLoading}
                    columns={columns}
                    dataSource={tableData}
                    scroll={{ x: 'max-content' }}
                    pagination={false} 
                />
            </div>
        </div>
    );
};

export default Todos;
