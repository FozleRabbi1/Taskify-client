import { FaEdit, FaPlus } from "react-icons/fa";
import { ContactsApi } from "../../redux/fetures/contacts/ContactsApi";
import SearchBar from "../../shared/SearchBar";
import { useState } from "react";
import { Button, Checkbox, Col, DatePicker, Modal, Row, Select, Table } from "antd";
import TSForm from "../../components/form/TSForm";
import TSInput from "../../components/form/TSInput";
import { clientOptions, contentStatusOptions, contentTypeOptions, projectsOptions } from "../../utils/optionsUtils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { RiArrowDownSLine, RiDeleteBin5Line, RiFoldersLine } from "react-icons/ri";
import moment from "moment";

const ManageContacts = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [createContact] = ContactsApi.useCreateContactMutation();
    const { data, isLoading } = ContactsApi.useGetAllContactsQuery();
    const [isHideTableColom, setIsHideTableColom] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [ids, setides] = useState([])   // ======= for multiple delete
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState("")
    const [project, setProject] = useState("")
    const [contract, setContract] = useState("")
    const [contractStatus, setContractStatus] = useState("")
    const [startAt, setStartsAt] = useState("")
    const [endsAt, setEndsAt] = useState("")


    const onSubmit = async (data) => {
        const contactData = {
            ...data,
            client: user,
            project,
            type: contract,
            startAt,
            endsAt,
            createdBy: currentUser?.role,
            status: contractStatus
        }

        const res = await createContact(contactData)
        if (res?.data?.success) {
            toast.success(res?.data.message)
        }
    };

    const onChangeStartsAt = (date, dateString) => {
        setStartsAt(dateString);
    };

    const onChangeEndsAt = (date, dateString) => {
        setEndsAt(dateString);
    };


    const tableData = data?.data?.map(({ _id, id, title, client, project, type, startAt, endsAt, budget, status, createdBy, }) => ({
        key: _id,
        _id,
        id,
        title,
        client,
        project,
        type,
        startAt,
        endsAt,
        budget,
        status,
        createdBy,
    })) || [];
    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };

    const [isInclude, setIsInclude] = useState(['Id', 'Title', "Client", "status", "project", "budget", "type", "startAt", "endsAt", "createdBy", "action"])
    const onChange = (checkedValues) => {
        setIsInclude(checkedValues);
    };



    const columns = [

        isInclude.includes("Id") && { title: <span style={titleStyle}>Id</span>, dataIndex: "id", width: 100 },
        isInclude.includes("Title") && {
            title: <span style={titleStyle}>Title</span>,
            dataIndex: "title",

        },
        isInclude.includes("Client") && {
            title: <span style={titleStyle}>Clients</span>,
            dataIndex: "client",

            // width: 200,
        },
        isInclude.includes("status") && {
            title: <span style={titleStyle}>Status</span>,
            dataIndex: "status",

        },
        isInclude.includes("project") && {
            title: <span style={titleStyle}>Project</span>,
            dataIndex: "project",

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
        isInclude.includes("type") && {
            title: <span style={titleStyle}>Type</span>,
            dataIndex: "type",
        },
        isInclude.includes("createdBy") && {
            title: <span style={titleStyle}>Created By</span>,
            dataIndex: "createdBy",
        },
        isInclude.includes("startAt") && {
            title: <span style={titleStyle}>Starts At</span>,
            dataIndex: "startAt",
            render: (date) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {moment(date).format('MMMM DD, YYYY')}
                    </span>
                </div>
            ),
        },
        isInclude.includes("endsAt") && {
            title: <span style={titleStyle}>Ends At</span>,
            dataIndex: "endsAt",
            render: (date) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {moment(date).format('MMMM DD, YYYY')}
                    </span>
                </div>
            ),

        },
        isInclude.includes("action") && {
            title: <span style={titleStyle}>Action</span>,
            dataIndex: "action",
            render: () => (
                <div className="">
                    <button title="Update" className="text-xl mr-6 text-blue-500">
                        <FaEdit className="text-xl text-blue-500" />
                    </button>

                    <button title="Delete">
                        <RiDeleteBin5Line className="text-xl mr-6 text-red-500" />
                    </button>

                    <button title="Duplicate">
                        <RiFoldersLine className="text-xl mr-6 text-yellow-500" />
                    </button>
                </div>
            )
        }

    ].filter(Boolean);


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






    return (
        <div>
            <SearchBar />

            <div className="flex justify-end mt-10">
                <button onClick={() => setOpen(true)} className="bg-blue-600  px-4 py-2 text-white rounded-md "  >  <FaPlus />   </button>
            </div>

            <div className="w-full  flex justify-end my-10 ">
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
                            defaultValue={['Id', 'Title', "Client", "status", "project", "budget", "type", "startAt", "endsAt", "createdBy", "action"]}
                        >
                            <Row>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="Id">Id</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="Title">Title</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="Client">Client</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="status">status</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="project">Project</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="budget">budget</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="type">Type</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="startAt">start At</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="endsAt">endsAt</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="createdBy">Created By</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="action">Action</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>

                    </div>
                </div>
            </div>

            <div>

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

            </div>


            {/* ===================================================== Add Contacts Info ============================= */}

            <Modal

                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={false}
            >
                <div>

                    <h2 className="text-xl font-semibold mb-4 opacity-90 " >Create Contract</h2>

                    <TSForm onSubmit={onSubmit} className="w-full">
                        <Row gutter={[16, 16]} className="w-full flex justify-between">

                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }} className="" >
                                <TSInput type="text" name="title" label="Title" placeholder="Please Inter Title"></TSInput>
                            </Col>

                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }} className="" >
                                <TSInput type="number" name="budget" label="budget" placeholder="Please Inter Budget"></TSInput>
                            </Col>

                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }} className="" >
                                <label htmlFor="" className="text-[16px] mb-2 block -mt-4">Starts At</label>
                                <DatePicker className="w-full h-[40px]" onChange={onChangeStartsAt} />
                            </Col>

                            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }} className="" >
                                <label htmlFor="" className="text-[16px] mb-2 block -mt-4">Ends At</label>
                                <DatePicker className="w-full h-[40px]" onChange={onChangeEndsAt} />
                            </Col>

                        </Row>


                        <label htmlFor="" className="text-[16px] my-2 block">Select Users</label>
                        <Select
                            placeholder="Select User"
                            style={{ width: '98.5%', height: "40px" }}
                            options={clientOptions}
                            onChange={(value) => setUser(value)}
                        />

                        <label htmlFor="" className="text-[16px] mt-5 mb-2 block">Select Projects</label>
                        <Select
                            placeholder="Select Project"
                            style={{ width: '98.5%', height: "40px" }}
                            options={projectsOptions}
                            onChange={(value) => setProject(value)}
                        />


                        <label htmlFor="" className="text-[16px] mt-5 mb-2 block">Select Contract Type</label>
                        <Select
                            placeholder="Select Contract"
                            style={{ width: '98.5%', height: "40px" }}
                            options={contentTypeOptions}
                            onChange={(value) => setContract(value)}
                        />

                        <label htmlFor="" className="text-[16px] mt-5 mb-2 block">Select Contract Status</label>
                        <Select
                            placeholder="Select Contract Status"
                            style={{ width: '98.5%', height: "40px" }}
                            options={contentStatusOptions}
                            onChange={(value) => setContractStatus(value)}
                        />


                        <div className="flex justify-end mt-5">
                            <button onClick={() => { setOpen(false) }} type="submit" className="bg-blue-600 px-3 py-2 text-md font-semibold text-white rounded-md" >Create</button>
                        </div>

                    </TSForm>

                </div>
            </Modal>


        </div>
    );
};

export default ManageContacts;