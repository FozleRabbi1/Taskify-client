import { FaPlus } from "react-icons/fa";
import SearchBar from "../../shared/SearchBar";
import { useRef, useState } from "react";
import { Modal, Select } from "antd";
import TSForm from "../../components/form/TSForm";
import TSInput from "../../components/form/TSInput";
import JoditEditor from 'jodit-react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NotesApi } from "../../redux/fetures/notes/NotesApi";
import { toast } from "react-toastify";
import FooterHeadline from "../../shared/FooterHeadline";


const Notes = () => {
    const [createNotes] = NotesApi.useCreateNotesMutation()
    const { data } = NotesApi.useGetAllNotesQuery()


    console.log(data?.data);


    const propertyOptions = ["Red", "Green", "Yellow"].map((item) => ({
        value: item,
        label: item,
    }));


    const editor = useRef(null)
    const [content, setContent] = useState("")
    const [color, setSelectColor] = useState("")
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState('');

    const randomRotation = Math.floor(Math.random() * 6);
    const positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
    const finalRotation = randomRotation * positiveOrNegative;


    const onSubmit = async (data) => {
        const formData = {
            title: data.title,
            contentData: content,
            color,
            finalRotation

        }
        const res = createNotes(formData);
        if (res) {
            toast.success("Note Create Successfully")
        }
    };



    return (
        <div>

            <SearchBar />

            <div>
                <div className="flex justify-end mt-10">
                    <button onClick={() => setOpen(true)} className="bg-blue-600  px-4 py-2 text-white rounded-md "  >  <FaPlus />   </button>
                </div>

                <div className="p-5 bg-white rounded-md mt-10">
                    <div className="grid grid-cols-3 gap-10 px-10 py-14">


                        {
                            data?.data?.map(item => {
                                return (
                                    <div key={item._id} className="transform transition-transform duration-300 hover:scale-105">
                                        <div
                                            className={`p-5 shadow-lg hover:shadow-2xl transform transition-transform duration-300 ${item.color === "Green" ? "bg-green-200" : item.color === "Red" ? "bg-red-200" : "bg-yellow-200"}`}
                                            style={{
                                                transform: `rotate(${item.finalRotation}deg)`
                                            }}
                                        >
                                            <div
                                                className="hover:scale-110 transform transition-transform duration-300"
                                                style={{
                                                    transform: `rotate(${item.finalRotation}deg)`,
                                                }}
                                            >
                                                <h2 className="text-xl font-semibold text-gray-600">{item.title}</h2>
                                                <div className="content">
                                                    <div dangerouslySetInnerHTML={{ __html: item?.contentData }} />
                                                </div>
                                                {item?.createdAt && (
                                                    <h2 className="text-lg font-semibold text-black">
                                                        CreatedAt: <span className="text-blue-600">{item?.createdAt}</span>
                                                    </h2>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="pb-10">
                <FooterHeadline/>
                </div>


            </div>

            <Modal
                title="Create Note"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={false}
            >
                <div>

                    <TSForm onSubmit={onSubmit} className="w-full">
                        <TSInput type="text" name="title" label="Title" placeholder="Please Inter Title"></TSInput>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                        />
                        <Select
                            placeholder="select Color"
                            className="mt-5"
                            style={{ width: '100%', textAlign: 'center' }}
                            type="text"
                            name="color"
                            label="Color"
                            options={propertyOptions}
                            onChange={value => setSelectColor(value)}
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

export default Notes;