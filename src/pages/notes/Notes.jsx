import { FaPlus } from "react-icons/fa";
import SearchBar from "../../shared/SearchBar";
import { useState } from "react";
import { Modal } from "antd";
import TSForm from "../../components/form/TSForm";
import TSInput from "../../components/form/TSInput";

const Notes = () => {

    const [open, setOpen] = useState(false);


    const onSubmit = async (data) => {
        console.log(data);

    };

    return (
        <div>

            <SearchBar />

            <div>
                <div className="flex justify-end mt-10">
                    <button onClick={() => setOpen(true)} className="bg-blue-600  px-4 py-2 text-white rounded-md "  >  <FaPlus />   </button>
                </div>




                <div className="p-5 bg-white rounded-md mt-10 ">
                    <h2>Notes List</h2>
                </div>


            </div>

            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={600}
                footer={false}
            >
                <div>

                    <TSForm onSubmit={onSubmit} className="w-full">
                        <TSInput type="text" name="title" label="Title" placeholder="Please Inter Title"></TSInput>

                        <div className="flex justify-end">
                            <button onClick={() => { setOpen(false) }} type="submit" className="bg-blue-600 px-3 py-2 text-md font-semibold text-white rounded-md" >submit</button>
                        </div>
                    </TSForm>

                </div>
            </Modal>

        </div>
    );
};

export default Notes;