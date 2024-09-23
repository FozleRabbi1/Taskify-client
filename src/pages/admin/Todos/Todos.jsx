/* eslint-disable no-unused-vars */
import { FaEdit } from "react-icons/fa";
import { TodosApi } from "../../../redux/fetures/todos/todos";
import { Button, Checkbox, Col, Modal, Row, Table } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line, RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
import SearchBar from "../../../shared/SearchBar";
import { toast } from "react-toastify";
import TSForm from "../../../components/form/TSForm";
import TSInput from "../../../components/form/TSInput";
import TSSelect from "../../../components/form/TSSelect";
import { todoPropertyOptions } from "../../../utils/optionsUtils";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";

const Todos = () => {
    const { data, isLoading } = TodosApi.useGetAllTodosQuery();
    const [checkedTodos, { isLoading: checkedLoading }] = TodosApi.useCheckedTodosMutation();
    const [updateTodos] = TodosApi.useUpdateTodosMutation()
    const [deleteTodos] = TodosApi.useDeleteTodosMutation()
    const [updateId, setUpdateId] = useState("");
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [ids, setides] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const currentUser = useSelector(selectCurrentUser);

    const tableData =
        data?.data?.map(({ _id, id, UpdatedAt, title, Description, Priority, title2, checked }) => ({
            key: _id,
            id,
            UpdatedAt,
            title,
            Description,
            Priority,
            title2,
            checked
        })) || [];
    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };


    // ==================================================  Checked Fun Start
    const checkedHandlear = async (e) => {
        const res = await checkedTodos({ id: e })
        if (res) {
            toast.success("status update successfully")
        }
    };
    // ==================================================  Checked Fun End


    // ==================================================  Update Fun Start
    const handleUpdateData = async (data) => {
        const formData = {
            title: data.title,
            Priority: data.Priority,
            Description: data.description
        };
        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value && value.trim() !== "")
        );
        const updateData = {
            id: updateId,
            formData: filteredFormData,
        };
        const res = await updateTodos(updateData);
        if (res?.data?.success) {
            toast.success(res?.data?.message);
        }
        setOpenUpdateModal(false)
    };
    const handleModal = (updateId) => {
        setUpdateId(updateId)
        setOpenUpdateModal(true)
    }
    // ==================================================    Update Fun End



    // =================================================== Delete Fun Start

    const handleDelete = () => {
        if(!ids.length){
            toast.warning("You Can't Select Any Project")
            return
        }
        if (currentUser?.role !== "Admin") {
            toast.error("Only Admin Can Delete It")
            return
        }
        Swal.fire({
            title: 'Are you sureee?',
            text: `You won't remove This User`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteTodos({ idArray: ids });

                if (res.data.success) {
                    toast.success(res.data.message)
                }
            }
        });
    };
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setides(newSelectedRowKeys)
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const deleteSingleData = (id) => {
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteTodos({ idArray: [id] });
                if (res.data.success) {
                    toast.success(res.data.message)
                }
            }
        });
    }
    // ============================================== Delete Fun End


    const columns = [
        {
            title: <span style={titleStyle}>Id</span>, dataIndex: "id",
            render: (id, record) => (
                <span className="text-gray-400 opacity-90 text-[18px] font-semibold flex justify-center items-center">
                    {id}
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Status</span>,
            render: (text, record) => (
                <span className="text-gray-400 opacity-90 text-[16px] font-semibold flex justify-center items-center">
                    <Checkbox onClick={() => checkedHandlear(record.key)} checked={record.checked === true} ></Checkbox>

                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Todo</span>,
            dataIndex: "title",
            render: (text, record) => (
                <span className="text-gray-400 opacity-90 text-[16px] font-semibold flex">
                    {/* <Checkbox onClick={() => checkedHandlear(record.key)} checked={record.checked === true} ></Checkbox> */}
                    <div className="ml-4">
                        <h2 className={`text-xl text-gray-600 ${record.checked ? "line-through" : ""} `}>{record.title}</h2>
                        {moment(record?.title2).format('MMMM DD, YYYY h:mm:ss A')}
                    </div>
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Priority</span>,
            dataIndex: "Priority",
            render: (Priority) => (
                <span className={`text-gray-500 opacity-90 text-[16px] font-semibold flex items-center justify-center rounded uppercase ${Priority === "high" ? "text-red-600 bg-red-200" : Priority === "medium" ? "text-yellow-600 bg-yellow-200" : "text-green-600 bg-green-200"}`}>
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
                        onClick={() => handleModal(record.key)}
                        className="text-xl mr-6 text-blue-500"
                    >
                        <FaEdit className="text-xl text-blue-500" />
                    </button>
                    <button onClick={() => deleteSingleData(record.key)} title="Delete">
                        <RiDeleteBin5Line className="text-xl mr-6 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>

            <SearchBar />

            <div>
                <button onClick={() => handleDelete()} className="my-5 border border-red-600 text-red-600 flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-red-600 duration-300 ">
                    <RiDeleteBin6Line className="mr-1" /> Delete Selected
                </button>
            </div>

            <div className="overflow-x-auto py-10">
                <Table
                    bordered
                    loading={isLoading || checkedLoading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={tableData}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>

            <div>
                <Modal
                    centered
                    open={openUpdateModal}
                    onCancel={() => setOpenUpdateModal(false)}
                    width={1000}
                    footer={null}
                >
                    <div>
                        <h2 className="font-semibold text-xl mb-5 opacity-80">Update Todo</h2>
                        <Row align="middle">
                            <Col span={24}>
                                <TSForm onSubmit={handleUpdateData} className="w-full">
                                    <Row gutter={[16, 16]} className="w-full flex">
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput
                                                type="text"
                                                name="title"
                                                label="Title"
                                                placeholder="Enter your title"
                                            />
                                        </Col>
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSSelect
                                                name="Priority"
                                                label="Priority"
                                                options={todoPropertyOptions}
                                                placeholder="Select Priority"
                                            />
                                        </Col>
                                        <Col span={24} >
                                            <TSInput
                                                type="text"
                                                name="description"
                                                label="Description"
                                                placeholder="Enter description"
                                            />
                                        </Col>
                                    </Row>

                                    <div className="flex justify-end">
                                        <Button htmlType="submit" className="mt-5">Update</Button>
                                    </div>
                                </TSForm>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>

        </div>
    );
};

export default Todos;
