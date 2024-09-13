/* eslint-disable react/no-unescaped-entities */
import { Button, Checkbox, Col, DatePicker, Modal, Row, Select, Space, Table } from "antd";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
import { useState } from "react";
import { FaEdit, FaFile, FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaUserLarge } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RiArrowDownSLine, RiDeleteBin5Line, RiDeleteBin6Line, RiFoldersLine } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import TSForm from "../../../components/form/TSForm";
import TSInput from "../../../components/form/TSInput";
import TSSelect from "../../../components/form/TSSelect";
import { tagsArray, tagStyles } from "../../../constant/constant";
import moment from "moment";
import { UsersApi } from "../../../redux/fetures/Users/usersApi";

const ProjectsTab = () => {

    const [isFavouriteProject] = ProjectsApi.useIsFavouriteProjectMutation()
    const [updateProjectsInFo] = ProjectsApi.useUpdateProjectsInFoMutation()
    const [duplicateProjects] = ProjectsApi.useDuplicateProjectsMutation()
    const [deleteProject] = ProjectsApi.useDeleteProjectMutation()
    const [updateSingleProjects] = ProjectsApi.useUpdateSingleProjectsMutation()
    const { data: userData } = UsersApi.useGetAllUsersQuery({})
    const [params, setParams] = useState(undefined);
    const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery(params);
    // const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);
    const [ids, setides] = useState([])
    const [modalData, setModalData] = useState({})
    const [isHideTableColom, setIsHideTableColom] = useState(false)

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

    const usersOptions = userData?.data.map((item) => ({
        value: item?.image,
        label: `${item?.name?.firstName} ${item?.name?.lastName}`,
    }));


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


    //========================================================== update data

    const [users, setUser] = useState([])
    const [tags, setTags] = useState([])
    const [updateId, setUpdateId] = useState("")
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const onSubmit = async (data) => {
        const updateData = {
            id: updateId,
            data: {
                budget: data.budget,
                priority: data.property,
                status: data.status,
                title: data.title,
                users: users,
                tags,
            }
        }
        updateSingleProjects(updateData);
        setOpenUpdateModal(false)
    };

    const handleChange = (value) => {
        setUser(value);
    };
    const handleTagChange = (value) => {
        setTags(value);
    };

    const handleModal = (record) => {
        setOpenUpdateModal(true)
        setModalData(record)
        setUpdateId(record.key)
    }

    //========================================================== update data




    const singleDataDelete = (id) => {
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


    const [isInclude, setIsInclude] = useState(['Id', 'Title', 'User', "Client", "status", "priority", "budget", "tags", "startsAt", "endsAt", "action"])

    const onChange = (checkedValues) => {
        setIsInclude(checkedValues);
    };


    // ============================================================= Duplicate Data, Function 
    const [duplicateOpen, setOpenDuplicate] = useState(false);
    const [confirmLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const showModal = (record) => {
        setSelectedRecord(record);
        setOpenDuplicate(true);
    };

    const handleCancel = () => {
        setOpenDuplicate(false);
        setSelectedRecord(null);
    };

    const handleDuplicateSubmit = (e) => {
        e.preventDefault();
        const heading = e.target.elements[0].value;
        const duplicateInfo = {
            id: selectedRecord._id,
            title: heading
        }
        duplicateProjects(duplicateInfo)
        e.target.reset();
        setOpenDuplicate(false);
        setSelectedRecord(null);
    };
    // ============================================================= Duplicate Data, Function 


    const columns = [

        isInclude.includes("Id") && { title: <span style={titleStyle}>Id</span>, dataIndex: "id", width: 100 },

        isInclude.includes("Title") && {
            title: <span style={titleStyle}>Title</span>,
            dataIndex: "title",
            render: (title, record) => (
                <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
                    {title}
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
                    <AiOutlineMessage className="text-red-500" />
                </span>
            ),
        },
        isInclude.includes("User") && {
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
        isInclude.includes("Client") && {
            title: <span style={titleStyle}>Clients</span>,
            dataIndex: "clients",
            render: (clients) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {clients?.length !== 0 ? (
                        <div className="flex items-center">
                            {clients.map((url, index) => (
                                <img className={`border-2 border-gray-300 ${index >= 1 ? "-ml-5" : ""} hover:z-10 hover:-mt-2 hover:shadow-md duration-300 cursor-pointer`} key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                            ))}
                            <Button onClick={() => setOpenUpdateModal(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                <FaRegEdit className="text-xl text-blue-600" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h2 className="bg-blue-600 text-white font-medium px-2 rounded-md uppercase opacity-80 flex items-center">Not Assigned</h2>
                            <Button onClick={() => setOpenUpdateModal(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                <FaRegEdit className="text-xl text-blue-600" />
                            </Button>
                        </div>
                    )}
                </div>
            ),
            // width: 200,
        },
        isInclude.includes("status") && {
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
        isInclude.includes("priority") && {
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
        isInclude.includes("budget") && {
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
        isInclude.includes("tags") && {
            title: <span style={titleStyle}>Tags</span>,
            dataIndex: "tags",
            render: (tags) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {tags.map((item, index) => (
                            <span
                                key={index}
                                className={`mr-2 border rounded px-1 ${tagStyles[item] || ""}`}
                            >
                                {item}
                            </span>
                        ))}
                    </span>
                </div>
            ),
            // width: 200,
        },
        isInclude.includes("startsAt") && {
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
        isInclude.includes("endsAt") && {
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
        isInclude.includes("action") && {
            title: <span style={titleStyle}>Action</span>,
            dataIndex: "action",
            render: (text, record) => (
                <div className="">
                    <button title="Update" onClick={() => setOpenUpdateModal(true)} className="text-xl mr-6 text-blue-500">
                        <FaEdit className="text-xl text-blue-500" />
                    </button>

                    <button onClick={() => singleDataDelete(record.key)} title="Delete">
                        <RiDeleteBin5Line className="text-xl mr-6 text-red-500" />
                    </button>

                    <button onClick={() => showModal(record)} title="Duplicate">
                        <RiFoldersLine className="text-xl mr-6 text-yellow-500" />
                    </button>

                    <button title="Quick View">
                        <CiCircleInfo className="text-xl text-blue-600" />
                    </button>
                </div>
            )
        }

    ].filter(Boolean);

    const handleDelete = () => {
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
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

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


    return (
        <div>

            <h2 className="text-2xl text-gray-500 font-bold">Admin's Projects</h2>

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
                    <button onClick={() => handleDelete()} className="my-5 border border-red-600 text-red-600 flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-red-600 duration-300 ">
                        <RiDeleteBin6Line className="mr-1" /> Delete Selected
                    </button>

                    <button onClick={() => handleDelete()} className="my-5 border border-blue-600 text-blue-600 flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-blue-600 duration-300 ">
                        <FaFile className="mr-1" /> Save Coloumn Visibility
                    </button>
                </div>

                <div className="mt-4 flex items-center">
                    <input
                        type="search"
                        className="my-5 border  flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80  "
                        placeholder="Search"
                        autoComplete="off"
                        onChange={(e) => searchHandlear(e.target.value)}
                    />

                    <div className="relative">

                        <div onClick={() => { setIsHideTableColom(!isHideTableColom) }} className="bg-gray-500 p-2 ml-2 rounded cursor-pointer">
                            <RiArrowDownSLine className="text-white text-xl" />
                        </div>

                        <div className={`absolute top-12 right-0 bg-white shadow-lg z-50 w-[150px] px-4 py-2 ${isHideTableColom ? "block" : "hidden"} `}>

                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                onChange={onChange}
                                defaultValue={['Id', 'Title', 'User', "Client", "status", "priority", "budget", "tags", "startsAt", "endsAt", "action"]}
                            >
                                <Row>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="Id">Id</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="Title">Title</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="User">User</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="Client">Client</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="status">status</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="priority">priority</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="budget">budget</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="tags">tags</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="startsAt">startsAt</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="endsAt">endsAt</Checkbox>
                                    </Col>
                                    <Col span={24} className="mb-2" >
                                        <Checkbox value="action">Action</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>

                        </div>
                    </div>

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
                centered
                open={openUpdateModal}
                // onOk={() => setOpen(false)}
                onCancel={() => setOpenUpdateModal(false)}
                width={1000}
                footer={null}
            >
                <div>
                    <div>
                        <h2 className="font-semibold text-xl mb-5 opacity-80">Update Projects</h2>
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
                                                    placeholder="Please select Users"
                                                    defaultValue={[]}
                                                    onChange={handleChange}
                                                    options={usersOptions}
                                                />

                                            </Space>
                                        </Col>
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <label className="text-[14px] uppercase"> Select Tags </label>
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
                                                    placeholder="Please select Tags"
                                                    defaultValue={[]}
                                                    onChange={handleTagChange}
                                                    options={tagsOptions}
                                                />

                                            </Space>
                                        </Col>

                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSSelect
                                                name="property"
                                                label="Property"
                                                options={propertyOptions}
                                                placeholder="Select Property"
                                            >
                                            </TSSelect>
                                        </Col>

                                    </Row>

                                    <div className="flex justify-end">
                                        <Button htmlType="submit" className="mt-5">Update</Button>
                                    </div>
                                </TSForm>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>


            <Modal
                title="Warning"
                open={duplicateOpen}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <form onSubmit={handleDuplicateSubmit}>
                    <p className="my-5 text-[16px] opacity-80 font-semibold ">Are You Sure You Want to Duplicate?</p>
                    <label htmlFor="" className=" opacity-80 font-semibold"> Update Title </label>
                    <input type="text" placeholder={selectedRecord?.title} required className="w-full border mt-2 px-2 py-2 rounded" />

                    <div className="flex justify-end">
                        <button type="submit" className=" bg-blue-700 px-6 py-2 mt-4 font-semibold text-white text-md rounded-md ">Yes</button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default ProjectsTab;