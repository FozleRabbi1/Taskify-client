import { FaPlus } from "react-icons/fa";
import { ContactsApi } from "../../redux/fetures/contacts/ContactsApi";
import SearchBar from "../../shared/SearchBar";
import { useState } from "react";
import { Col, DatePicker, Modal, Row, Select } from "antd";
import TSForm from "../../components/form/TSForm";
import TSInput from "../../components/form/TSInput";
import { clientOptions, contentTypeOptions, projectsOptions } from "../../utils/optionsUtils";

const ManageContacts = () => {
    const [createContact] = ContactsApi.useCreateContactMutation()

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState("")
    const [project, setProject] = useState("")
    const [contract, setContract] = useState("")
    const [startAt, setStartsAt] = useState("")
    const [endsAt, setEndsAt] = useState("")


    const onSubmit = async (data) => {
        console.log(data);
        console.log(user);
        console.log(project);
        console.log(contract);
        console.log(startAt);
        console.log(endsAt);
    };

    const onChangeStartsAt = (date, dateString) => {
        setStartsAt( dateString);
    };

    const onChangeEndsAt = (date, dateString) => {
        setEndsAt(dateString);
    };

    return (
        <div>
            <SearchBar />

            <div className="flex justify-end mt-10">
                <button onClick={() => setOpen(true)} className="bg-blue-600  px-4 py-2 text-white rounded-md "  >  <FaPlus />   </button>
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
                                <TSInput type="text" name="budget" label="budget" placeholder="Please Inter Budget"></TSInput>
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