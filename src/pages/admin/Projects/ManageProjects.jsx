import { useState } from "react";
import SearchBar from "../../../shared/SearchBar";
import ProjectsTab from "../DashboardTab/ProjectsTab";
import { Button, Col, DatePicker, Modal, Row, Select, Space } from "antd";
import TSForm from "../../../components/form/TSForm";
import TSInput from "../../../components/form/TSInput";
import TSSelect from "../../../components/form/TSSelect";
import { propertyOptions, statusOptions, tagsOptions } from "../../../utils/optionsUtils";
import { UsersApi } from "../../../redux/fetures/Users/usersApi";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";


const ManageProjects = () => {
    const { data: userData } = UsersApi.useGetAllUsersQuery({})
    const [addProject] = ProjectsApi.useAddProjectMutation()

    const usersOptions = userData?.data.map((item) => ({
        value: item?.image,
        label: `${item?.name?.firstName} ${item?.name?.lastName}`,
    }));


    //========================================================== add project data  
    const [users, setUser] = useState([]);
    const [clients, setClients] = useState([]);
    const [tags, setTags] = useState([]);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [getStartsAt, setStartsAt] = useState(""); 
    const [getEndsAt, setEndsAt] = useState("");   

    const onSubmit = async (data) => {
        const startsAtFormattedDate = getStartsAt; 
        const endsAtFormattedDate = getEndsAt;     

        if (!startsAtFormattedDate || !endsAtFormattedDate) {
            console.error("Invalid date format"); 
            return;  
        }

        let updateData = {
            data: {
                budget: data.budget,
                priority: data.property,  
                status: data.status,
                title: data.title,
                users: users,
                clients: clients,
                tags: tags,
                startsAt: getStartsAt?.dateString,
                endsAt: getEndsAt?.dateString,
            },
        };

        const res = addProject(updateData);
        if (res) {
            toast.success("Successfully Added your project");
        }
        setOpenUpdateModal(false);
    };

    const handleChange = (value) => {
        setUser(value);
    };

    const handleCkientsChange = (value) => {
        setClients(value);
    };
    const handleTagChange = (value) => {
        setTags(value);
    };

    const handleModal = () => {
        setOpenUpdateModal(true)
    }

    //========================================================== add Project data




    return (
        <div className="">
            <SearchBar />

            <div className="flex justify-end mt-10">
                <button onClick={() => handleModal()} className="bg-green-600 px-4 py-2 rounded-md text-md text-white" > <FaPlus /> </button>
            </div>

            <div className="mt-10 bg-white p-5 rounded-md ">
                <ProjectsTab />
            </div>


            {/* ===================== Added Projects Modal =============================*/}

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
                        <h2 className="font-semibold text-xl mb-5 opacity-80">Add Projects</h2>
                        <Row align="middle">
                            <Col span={24}>
                                <TSForm onSubmit={onSubmit} className="w-full">
                                    <Row gutter={[16, 16]} className="w-full flex">
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput type="text" name="title" label="Title" placeholder="Inter Your Title" ></TSInput>
                                        </Col>
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSSelect
                                                name="status"
                                                label="Status"
                                                options={statusOptions}
                                                placeholder="select Status"
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
                                            <label className="text-[14px] uppercase"> Select Clients </label>
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
                                                    placeholder="Please select clients"
                                                    defaultValue={[]}
                                                    onChange={handleCkientsChange}
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

                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <label htmlFor="" className="text-[17px] mb-1 block">startsAt</label>
                                            <DatePicker
                                                className="w-full"
                                                showTime
                                                onChange={(value, dateString) => {
                                                    setStartsAt({ value, dateString })
                                                }}
                                            />
                                        </Col>

                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <label htmlFor="" className="text-[17px] mb-1 block">endsAt</label>
                                            <DatePicker
                                                className="w-full"
                                                showTime
                                                onChange={(value, dateString) => {
                                                    setEndsAt({ value, dateString })
                                                }}
                                            />
                                        </Col>





                                    </Row>

                                    <div className="flex justify-end">
                                        <Button htmlType="submit" className="mt-5">Add</Button>
                                    </div>
                                </TSForm>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
            
            {/* ===================== Added Projects Modal =============================*/}






        </div>

    );
};

export default ManageProjects;