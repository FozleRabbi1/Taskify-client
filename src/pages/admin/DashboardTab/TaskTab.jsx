/* eslint-disable react/no-unescaped-entities */
import { Button, Col, DatePicker, Modal, Row, Select, Space, Table } from "antd";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
import { useState } from "react";
import { FaEdit, FaFile, FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaUserLarge } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RiDeleteBin5Line, RiDeleteBin6Line, RiFoldersLine } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import TSForm from "../../../components/form/TSForm";
import TSInput from "../../../components/form/TSInput";
import TSSelect from "../../../components/form/TSSelect";
import { tagsArray } from "../../../constant/constant";
import moment from "moment";
import { TiDeleteOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";

const TaskTab = () => {

    const [isFavouriteProject] = ProjectsApi.useIsFavouriteProjectMutation()
    const [updateProjectsInFo] = ProjectsApi.useUpdateProjectsInFoMutation()
    const [duplicateProjects] = ProjectsApi.useDuplicateProjectsMutation()
    const [params, setParams] = useState(undefined);
    const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery(params);
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);
    const [ids, setides] = useState([])
    const [deleteProject,] = ProjectsApi.useDeleteProjectMutation()
    const [modalData, setModalData] = useState({})
    const currentUser = useSelector(selectCurrentUser);

    // const uniqueTags = [...new Set(data?.data?.flatMap(item => item.tags))];


    const handleStarClick = async (key, i) => {
        const isFavourite = {
            id: key,
            data: {
                isFavourite: i
            }
        }
        const res = await isFavouriteProject(isFavourite)
        if (res?.data?.success) {
            toast.success(res?.data?.message)
        }
    };

    const statusOptions = ["On Going", "Started", "Default", "In Review", "Completed"].map((item) => ({
        value: item,
        label: item,
    }));

    const propertyOptions = ["Default", "High", "Medium", "Low"].map((item) => ({
        value: item,
        label: item,
    }));

    const tagsOptions = tagsArray.map((item) => ({
        value: item,
        label: item,
    }));


    const tableData = data?.data?.map(({ _id, id, title, users, clients, status, priority, budget, tags, endsAt, startsAt, isFavourite }) => ({
        key: _id,
        _id,
        id,
        title,
        users,
        clients,
        status,
        priority,
        budget,
        tags,
        startsAt,
        endsAt,
        isFavourite
    })) || [];
    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };

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

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        const selectedIds = newSelectedRowKeys.map(key => {
            const selectedRow = tableData.find(row => row.key === key);
            return selectedRow ? selectedRow._id : null;
        }).filter(_id => _id !== null);
        setides(selectedIds);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const projectsInfoHandler = async (keyName, selectedStatus, id) => {
        const updatedData = {
            id,
            data: {
                keyName,
                selectedStatus
            }
        }
        const res = await updateProjectsInFo(updatedData)
        if (res?.data?.success) {
            toast.success(res?.data?.message)
        }
    };


    const handleModal = (record) => {
        setOpen(true)
        setModalData(record)
    }

    const singleDataDelete = (id) => {
        if (currentUser?.role !== "Admin") {
            toast.error("Only Admin Can Delete It")
            return
        }
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't remove This User`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject({ idArray: [id] });
            }
        });
    }

    const duplicateDataHandlear = (id) => {
        const duplicateInfo = {
            id,
            title: "new heading"
        }
        duplicateProjects(duplicateInfo)
    }

    const columns = [
        {
            title: <span style={titleStyle}>Task</span>,
            dataIndex: "title",
            render: (title) => (
                <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
                    {title}
                    <AiOutlineMessage className="text-red-500 ml-2" />
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Tags</span>,
            dataIndex: "tags",
            render: (tags, record) => (
                <div className="">
                    <span className="text-blue-500  text-[15px] font-semibold flex items-center">
                        {tags[0]}

                        {record.isFavourite ? (
                            <FaStar
                                onClick={() => handleStarClick(record.key, "favourite")}
                                className="text-yellow-500 mx-2 cursor-pointer"
                            />
                        ) : (
                            <FaRegStar
                                onClick={() => handleStarClick(record.key, "notFavourite")}
                                className="text-yellow-500 mx-2 cursor-pointer"
                            />
                        )}
                        {/* {tags.map((item, index) => (
                            <span
                                key={index}
                                // className={`mr-2 border rounded px-1 ${tagStyles[item] || ""}`}
                            >
                                {item}
                            </span>
                        ))} */}
                    </span>
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Users</span>,
            dataIndex: "users",
            render: (users, record) => (
                <div style={{ display: 'flex', gap: '8px' }} className="flex items-center">
                    {
                        users.length === 0 ? <FaUserLarge className="size-[30px] rounded-full text-gray-300" /> :
                            <>
                                {
                                    users.map((url, index) => (
                                        <img className={`border-2 border-gray-300 ${index >= 1 ? "-ml-5" : ""} hover:z-10 hover:-mt-2 hover:shadow-md duration-300 cursor-pointer`} key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                    ))
                                } </>
                    }
                    <Button onClick={() => handleModal(record)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
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
                                <img className={`border-2 border-gray-300 ${index >= 1 ? "-ml-5" : ""} hover:z-10 hover:-mt-2 hover:shadow-md duration-300 cursor-pointer`} key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
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
            render: (status, record) => (
                <div className="">
                    <Select
                        placeholder={status}
                        style={{ width: '180px', textAlign: 'center' }}
                        options={statusOptions}
                        onChange={(value) => projectsInfoHandler("status", value, record.key)}
                    />
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Priority</span>,
            dataIndex: "priority",
            render: (priority, record) => (
                <div className="">
                    <Select
                        placeholder={priority}
                        style={{ width: '180px', textAlign: 'center' }}
                        options={propertyOptions}
                        onChange={(value) => projectsInfoHandler("priority", value, record.key)}
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
            title: <span style={titleStyle}>Starts At</span>,
            dataIndex: "startsAt",
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
            dataIndex: "endsAt",
            render: (date) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {moment(date).format('MMMM DD, YYYY')}
                        {/* {date} */}
                    </span>
                </div>
            ),
        },
        {
            title: <span style={titleStyle}>Action</span>,
            dataIndex: "action",
            render: (text, record) => (
                <div className="">

                    <button title="Update" onClick={() => setOpen(true)} className="text-xl mr-6 text-blue-500">
                        <FaEdit className="text-xl text-blue-500" />
                    </button>

                    <button onClick={() => singleDataDelete(record.key)} title="Delete">
                        <RiDeleteBin5Line className="text-xl mr-6 text-red-500" />
                    </button>

                    <button onClick={() => duplicateDataHandlear(record?.key)} title="Duplicate"><RiFoldersLine className="text-xl mr-6 text-yellow-500" /></button>

                    <button title="Quick View"><CiCircleInfo className="text-xl text-blue-600" /></button>

                </div>
            ),
        }
    ];

    const handleDelete = () => {
        if(currentUser?.role !== "Admin"){
            toast.error("Only Admin Can Delete It")
            return
        }
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't remove This User`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject({ idArray: ids });
            }
        });
    }

    const onSubmit = async (data) => {
        console.log(data);

    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const filterByStatus = (fieldName, v) => {
        const status = {
            [fieldName]: v
        }
        setParams(status)
    }

    const searchHandlear = (v) => {
        const searchField = {
            ["searchTerm"]: v
        }
        setParams(searchField);
    }

    const handleDateChange = (dates, dateStrings, additionalParam) => {
        const searchField = {
            ["date"]: dateStrings,
            ["fieldName"]: additionalParam
        };
        setParams(searchField);
    };


    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    return (
        <div>
            <h2 className={`text-2xl text-gray-500 font-bold ${lastSegment === "tasks" ? "hidden" : ""} `}>Admin's Tasks</h2>

            <div className="grid grid-cols-3 gap-10">
                <div className="mt-4">
                    <Select
                        placeholder="Select Status"
                        style={{ width: '100%' }}
                        options={statusOptions}
                        onChange={(value) => filterByStatus("status", value)}
                    />
                </div>

                <div className="mt-4">
                    <Select
                        placeholder="Select Property"
                        style={{ width: '100%' }}
                        options={propertyOptions}
                        onChange={(value) => filterByStatus("priority", value)}
                    />
                </div>

                <div className="mt-4">
                    <Select
                        placeholder="Select Tag"
                        style={{ width: '100%' }}
                        options={tagsOptions}
                        onChange={(value) => filterByStatus("tags", value)}
                    />
                </div>

                <div className="mt-4">
                    <DatePicker.RangePicker
                        status="error"
                        style={{
                            width: '100%',
                            border: "1px solid gray",
                            color: "gray"
                        }}
                        placeholder="Start Date Between"
                        onChange={(dates, dateStrings) => handleDateChange(dates, dateStrings, "startsAt")}
                    />
                </div>

                <div className="mt-4">
                    <DatePicker.RangePicker
                        status="error"
                        style={{
                            width: '100%',
                            border: "1px solid gray",
                            color: "gray"
                        }}
                        placeholder="End Date Between"
                        onChange={(dates, dateStrings) => handleDateChange(dates, dateStrings, "endsAt")}
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <button onClick={() => handleDelete()} className="my-5 border border-red-600 text-red-600 flex justify-between items-center px-6 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-red-600 duration-300 ">
                        <RiDeleteBin6Line className="mr-1" /> Delete Selected
                    </button>

                    <button className="my-5 border border-blue-600 text-blue-600 flex justify-between items-center px-6 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-blue-600 duration-300 ">
                        <FaFile className="mr-1" /> Save Coloumn Visibility
                    </button>

                    <button onClick={() => { setParams({}) }} className="my-5 border border-gray-600 text-gray-600 flex justify-between items-center px-6 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-gray-600 duration-300 ">
                        <TiDeleteOutline className="mr-1" /> Clear Filter
                    </button>
                </div>

                <div className="mt-4">
                    <input
                        type="search"
                        className="my-5 border  flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80  "
                        placeholder="Search"
                        autoComplete="off"
                        onChange={(e) => searchHandlear(e.target.value)}
                    />
                </div>

            </div>

            <div className="overflow-x-auto">
                <Table
                    bordered
                    loading={isLoading}
                    columns={columns}
                    dataSource={tableData}
                    rowSelection={rowSelection}
                    scroll={{ x: 'max-content' }}
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
                title="Update Projecsts"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >

                <div>
                    <div>
                        <h2 className="text-center font-semibold text-4xl mb-2 text-green-500">Update Comming Soon</h2>
                        <Row align="middle">
                            <Col span={24}>
                                <TSForm onSubmit={onSubmit} className="w-full">
                                    <Row gutter={[16, 16]} className="w-full flex">
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput type="text" name="title" label="Title" placeholder={modalData.title}></TSInput>
                                        </Col>
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSSelect
                                                name="status"
                                                label="Status"
                                                options={statusOptions}
                                                placeholder={modalData.status}
                                            >
                                            </TSSelect>
                                        </Col>
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput type="text" name="budget" label="budget" placeholder="Please Inter Budget"></TSInput>
                                        </Col>
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <label className="text-[14px] uppercase"> Select Users </label>
                                            <Space
                                                style={{
                                                    width: '100%',
                                                    marginTop: "3px",
                                                    padding: "4px"
                                                }}
                                                direction="vertical"
                                            >
                                                <Select
                                                    size="large"
                                                    mode="multiple"
                                                    allowClear
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="Please select"
                                                    defaultValue={['a10', 'c12']}
                                                    onChange={handleChange}
                                                    options={options}
                                                />
                                            </Space>
                                        </Col>
                                    </Row>
                                    <Button htmlType="submit">Update</Button>
                                </TSForm>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default TaskTab;