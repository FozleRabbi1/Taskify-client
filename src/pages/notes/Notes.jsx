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



    const onSubmit = async (data) => {
        const formData = {
            title: data.title,
            content,
            color

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
                                const randomRotation = Math.floor(Math.random() * 6);
                                const positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
                                const finalRotation = randomRotation * positiveOrNegative;

                                return (
                                    <div
                                        key={item._id}
                                        className={`p-3 ${item.color === "Green" ? "bg-green-200" : item.color === "Red" ? "bg-red-200" : "bg-yellow-200"}`}
                                        style={{ transform: `rotate(${finalRotation}deg)` }}
                                    >
                                        <h2 className="text-xl font-semibold text-gray-600">{item.title}</h2>
                                        <div className="content">
                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                        </div>
                                        {item?.createdAt && (
                                            <h2 className="text-lg font-semibold text-black">
                                                CreatedAt: <span className="text-blue-600">{item?.createdAt}</span>
                                            </h2>
                                        )}
                                    </div>
                                );
                            })
                        }


                        {/* {
                            data?.data?.map(item => {
                                const randomRotation = Math.floor(Math.random() * 5);

                                return (
                                    <div
                                        key={item._id}
                                        className={`p-3 shadow-md ${item.color === "Green" ? "bg-green-200" : item.color === "Red" ? "bg-red-200" : "bg-yellow-200"}`}
                                        style={{ transform: `rotate(${randomRotation}deg)` }} 
                                    >
                                        <h2 className="text-xl font-semibold text-gray-600">{item.title}</h2>
                                        <div className="content">
                                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                        </div>
                                        {item?.createdAt && (
                                            <h2 className="text-lg font-semibold text-black">
                                                CreatedAt: <span className="text-blue-600">{item?.createdAt}</span>
                                            </h2>
                                        )}
                                    </div>
                                );
                            })
                        } */}



                        {/* {
                            data?.data?.map(item => <div key={item._id} className={`rotate-3 p-3 ${item.color === "Green" ? "bg-green-200" : item.color === "Red" ? "bg-red-200" : "bg-yellow-200"}`}>
                                <h2 className="text-xl font-semibold text-gray-600">{item.title}</h2>
                                <div className="content">
                                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                </div>
                                {
                                    item?.createdAt && <h2 className="text-lg font-semibold text-black"> createdAt : <span className="text-blue-600">{item?.createdAt} </span></h2>
                                }

                            </div>)
                        } */}
                    </div>
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