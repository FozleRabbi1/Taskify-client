/* eslint-disable react/no-unescaped-entities */
import { Button, Modal, Select, Table } from "antd";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
import moment from "moment";
import { useState } from "react";
import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";

const ProjectsTab = () => {
    const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [activeStars, setActiveStars] = useState([]);
    const [open, setOpen] = useState(false);

    const handleStarClick = (key) => {
        setActiveStars((prevActiveStars) =>
            prevActiveStars.includes(key)
                ? prevActiveStars.filter((starKey) => starKey !== key)
                : [...prevActiveStars, key]
        );
    };

    const statusOptions = ["On Going", "Started", "Default", "In Rewiew"].map((item) => ({
        value: item,
        label: item,
    }));

    const statusOptions2 = ["Default"].map((item) => ({
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

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleAddPageSize = () => {
        const newPageSize = pageSize + 5;
        setPageSize(newPageSize);
        if (!availablePageSizes.includes(newPageSize)) {
            setAvailablePageSizes([...availablePageSizes, newPageSize]);
        }
    };



    const columns = [
        { title: <span style={titleStyle}>Id</span>, dataIndex: "id", width: 100 },

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
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Users</span>,
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
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Clients</span>,
            dataIndex: "clients",
            render: (clients) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {clients?.length !== 0 ? (
                        <div className="flex items-center">
                            {clients.map((url, index) => (
                                <img key={index} src={url} alt={`Client ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                            ))}
                            <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                <FaRegEdit className="text-xl text-blue-600" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h2 className="bg-blue-600 text-white font-medium px-2 rounded-md uppercase opacity-80 flex items-center">Not Assigned</h2>
                            <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                <FaRegEdit className="text-xl text-blue-600" />
                            </Button>
                        </div>
                    )}
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Status</span>,
            dataIndex: "status",
            render: (status) => (
                <div className="">
                    <Select
                        placeholder={status}
                        style={{ width: '180px', textAlign: 'center' }}
                        options={statusOptions}
                    />
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Priority</span>,
            dataIndex: "priority",
            render: (priority) => (
                <div className="">
                    <Select
                        placeholder={priority}
                        style={{ width: '180px', textAlign: 'center' }}
                        options={statusOptions2}
                    />
                </div>
            ),
        },
        {
            title: <span style={titleStyle}>Budget</span>,
            dataIndex: "budget",
            render: (budget) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {budget}
                    </span>
                </div>
            ),

        },
        {
            title: <span style={titleStyle}>Tags</span>,
            dataIndex: "tags",
            // render: (tags) => tags.join(', '),
            render: (tags) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {tags.join(', ')}
                    </span>
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Starts At</span>,
            dataIndex: "createdAt",
            // render: (date) => moment(date).format('MMMM DD, YYYY'),
            render: (date) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {moment(date).format('MMMM DD, YYYY')}
                    </span>
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Ends At</span>,
            dataIndex: "updatedAt",
            render: (date) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {moment(date).format('MMMM DD, YYYY')}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2 className="text-2xl text-gray-500 font-bold">Admin's Projects</h2>

            <div className="overflow-x-auto">
                {/* <Table
                    bordered
                    loading={isLoading}
                    columns={columns}
                    dataSource={tableData}
                    showSorterTooltip={{ target: "sorter-icon" }}
                    rowSelection={rowSelection}
                    scroll={{ x: 'max-content' }}
                    
                /> */}

                <Table
                    bordered
                    loading={isLoading}
                    columns={columns}
                    dataSource={tableData}
                    rowSelection={rowSelection}
                    scroll={{ x: 'max-content' }}
                    // pagination={{
                    //     pageSize: pageSize,
                    //     total: tableData?.length,
                    //     showSizeChanger: true,
                    // }}
                    // pagination={{
                    //     current: currentPage,
                    //     pageSize: pageSize,
                    //     total: tableData?.length,
                    //     showSizeChanger: true,
                    //     onChange: handlePageChange,
                    //     onShowSizeChange: handlePageChange,
                    // }}

                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: tableData?.length,
                        showSizeChanger: true,
                        pageSizeOptions: availablePageSizes.map(size => size.toString()),
                        onChange: handlePageChange,
                        onShowSizeChange: handlePageChange,
                    }}
                />
                <div className="flex justify-end">
                    <Button onClick={handleAddPageSize} type="primary" className="mt-4">
                        Add Page Size
                    </Button>
                </div>
            </div>

            <Modal
                title="Up Coming"
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
            </Modal>
        </div>
    );
};

export default ProjectsTab;
