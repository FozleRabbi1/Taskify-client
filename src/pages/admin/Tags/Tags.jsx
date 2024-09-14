import { Button, Col, Modal, Row, Table } from "antd";
import { TagsApi } from "../../../redux/fetures/tags/TagsApi";
import SearchBar from "../../../shared/SearchBar";
import { useState } from "react";
import TSInput from "../../../components/form/TSInput";
import TSForm from "../../../components/form/TSForm";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Tags = () => {

    const [params, setParams] = useState(undefined);
    const { data, isLoading } = TagsApi.useGetAllTagsQuery(params)
    const [updateSingleTags] = TagsApi.useUpdateSingleTagsMutation()
    const [deleteTags] = TagsApi.useDeleteTagsMutation()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [ids, setides] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);
    const [open, setOpen] = useState(false);
    const [updateId, setUpdateId] = useState("")

    const tableData = data?.data?.map(({ _id, id, title, preview }) => ({
        key: _id,
        _id,
        id,
        title,
        preview
    })) || [];
    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };

    const handleSingleTagDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't remove `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTags({ idArray: id });
            }
        });
    }

    const handleUpdateData = (id) => {
        setOpen(true)
        setUpdateId(id)
    }

    const onSubmit = async (data) => {
        let updateData = {
            id: updateId,
            data: {
                title: data.title ? data.title : undefined,
                preview: data.preview ? data.preview : undefined,
            }
        };

        const filteredData = Object.fromEntries(
            Object.entries(updateData.data).filter(([, value]) => value !== undefined && value !== null)
        );
        updateData = { ...updateData, data: filteredData };
        updateSingleTags(updateData);
        setOpen(false);
    };

    const columns = [
        { title: <span style={titleStyle}>Id</span>, dataIndex: "id", width: 100 },
        {
            title: <span style={titleStyle}>Title</span>,
            dataIndex: "title",
            render: (title) => (
                <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
                    {title}
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Preview</span>,
            dataIndex: "preview",
            render: (preview, record, rowIndex) => (
                <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
                    {
                        <span className={` px-2 rounded-md opacity-80 ${rowIndex % 2 === 0 ? "bg-blue-700 text-white" : "bg-green-700 text-white"}`} > {preview} </span>
                    }
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Action</span>,
            dataIndex: "action",
            render: (text, record) => (
                <div className="">

                    <button title="Update" onClick={() => handleUpdateData(record.key)} className="text-xl mr-6 text-blue-500">
                        <FaEdit className="text-xl text-blue-500" />
                    </button>

                    <button title="Delete">
                        <RiDeleteBin5Line onClick={() => handleSingleTagDelete(record.key)} className="text-xl mr-6 text-red-500" />
                    </button>
                </div>
            ),
        }
    ];

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't remove `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTags({ idArray: ids });
            }
        });
    }

    const handleAddPageSize = () => {
        const newPageSize = pageSize + 5;
        setPageSize(newPageSize);
        if (!availablePageSizes.includes(newPageSize)) {
            setAvailablePageSizes([...availablePageSizes, newPageSize]);
        }
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
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

    const searchHandlear = (v) => {
        const searchField = {
            ["searchTerm"]: v
        }
        setParams(searchField);
    }

    return (
        <div>
            <SearchBar />

            <div className="mt-10 bg-white p-5 rounded-lg">

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button onClick={() => handleDelete()} className="my-5 border border-red-600 text-red-600 flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-red-600 duration-300 ">
                            <RiDeleteBin6Line className="mr-1" /> Delete Selected
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
            </div>

            <h2 className="pb-10 pt-5 mt-6 text-[15px] text-gray-500 font-semibold">© 2024 , Made with ❤️ by <span className="text-blue-500 mr-4">Infinitie Technologies</span> v1.0.10</h2>

            <Modal
                title="Update Tags"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={null}
            >

                <div>
                    <div>
                        <Row align="middle">
                            <Col span={24}>
                                <TSForm onSubmit={onSubmit} className="w-full">
                                    <Row gutter={[16, 16]} className="w-full flex">
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput type="text" name="title" label="Title" placeholder="Please Inter Title"></TSInput>
                                        </Col>

                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput type="text" name="preview" label="Preview" placeholder="Please Inter preview"></TSInput>
                                        </Col>

                                    </Row>
                                    <div className="flex justify-end">
                                        <Button htmlType="submit">Update</Button>
                                    </div>
                                </TSForm>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
        </div>


    );
};

export default Tags;

