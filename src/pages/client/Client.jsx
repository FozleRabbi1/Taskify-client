import { Button, Checkbox, Col, Row, Table } from "antd";
import { UsersApi } from "../../redux/fetures/Users/usersApi";
import SearchBar from "../../shared/SearchBar";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiArrowDownSLine, RiDeleteBin5Line } from "react-icons/ri";

const Client = () => {
    const [isHideTableColom, setIsHideTableColom] = useState(false)
    const { data, isLoading } = UsersApi.useGetAllUsersQuery()
    const [ids, setides] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const tableData = data?.data?.client.map(({ _id, Id, name, email, role, number, image, projects }) => ({
        key: _id,
        Id,
        name,
        email,
        role,
        number,
        image,
        projects
    })) || [];

    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };
    const [isInclude, setIsInclude] = useState(["Id", "name", "role", "number", "image", "projects", "action"])
    const onChange = (checkedValues) => {
        setIsInclude(checkedValues);
    };

    
   


    const columns = [

        isInclude.includes("Id") && {
            title: <span style={titleStyle} >Id</span>, dataIndex: "Id",
            render: (Id) => (
                <p className="font-semibold text-[16px] opacity-80 text-center uppercase w-[50%] rounded">{Id}</p>
            )

        },
        isInclude.includes("name") && {
            title: <span style={titleStyle}>User</span>,
            dataIndex: "name",
            render: (name, record) => (

                <div className="flex items-center">
                    <img src={record?.image} className="size-12 rounded-full" alt="" />
                    <div className="ml-3">
                        <span className="text-gray-600 opacity-90 text-[17px] font-semibold flex items-center">
                            {`${name.firstName} ${name.lastName}`}

                        </span>
                        <p className="text-[16px] text-gray-400 ">{record.email}</p>
                    </div>
                </div>
            ),
        },
        isInclude.includes("role") && {
            title: <span style={titleStyle}>Role</span>,
            dataIndex: "role",
            render: (role) => (
                <h2 className={`font-semibold text-[16px] opacity-80 text-center uppercase w-[50%] rounded ${role === "Admin" ? "text-sky-600 bg-sky-100 " : role === "user" ? "text-black bg-gray-100" : ""} `} >{role}</h2>
            ),
        },
        isInclude.includes("number") && {
            title: <span style={titleStyle}>Phone Number</span>,
            dataIndex: "number",
            render: (number) => (
                <h2 className="text-[15px] font-semibold opacity-80 ">{`${number ? number : "-"}`}</h2>
            ),
        },
        isInclude.includes("projects") && {
            title: <span style={titleStyle}>Assigned</span>,
            dataIndex: "projects",
            render: (projects) => (
                <div className="flex justify-center items-center flex-col  opacity-80">
                    <h2 className="text-[14px] font-semibold text-white bg-blue-600 px-3 rounded-xl ">{projects}</h2>
                    <p className="text-[15px]">Projects</p>
                </div>
            ),
        },
        isInclude.includes("action") && {
            title: <span style={titleStyle}>Action</span>,
            dataIndex: "action",
            render: () => (
                <div className="">

                    <button title="Update"
                        // onClick={() => handleModal(record, record?.key)}
                        className="text-xl mr-6 text-blue-500">
                        <FaEdit className="text-xl text-blue-500" />
                    </button>

                    <button
                        // onClick={() => singleDataDelete(record.key)}
                        title="Delete">
                        <RiDeleteBin5Line className="text-xl mr-6 text-red-500" />
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

            <div className="my-10">
                <div className="relative flex justify-end">

                    <div onClick={() => { setIsHideTableColom(!isHideTableColom) }} className="bg-gray-500 p-2 ml-2 rounded cursor-pointer">
                        <RiArrowDownSLine className="text-white text-xl" />
                    </div>

                    <div className={`absolute top-12 right-0 bg-white shadow-lg z-50 w-[150px] px-4 py-2 ${isHideTableColom ? "block" : "hidden"} `}>

                        <Checkbox.Group
                            style={{
                                width: '100%',
                            }}
                            onChange={onChange}
                            defaultValue={["Id", "name", "role", "number", "image", "projects", "action"]}
                        >
                            <Row>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="Id">Id</Checkbox>
                                </Col>
                                <Col span={24} className="mb-2" >
                                    <Checkbox value="name">User</Checkbox>
                                </Col>

                                <Col span={24} className="mb-2" >
                                    <Checkbox value="role">Role</Checkbox>
                                </Col>

                                <Col span={24} className="mb-2" >
                                    <Checkbox value="number">Number</Checkbox>
                                </Col>

                                <Col span={24} className="mb-2" >
                                    <Checkbox value="projects">Assigned</Checkbox>
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
    );
};

export default Client;