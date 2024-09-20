import { Tabs } from 'antd';
import ProjectsTab from './ProjectsTab';
import TaskTab from './TaskTab';
import { BsBagHeartFill } from 'react-icons/bs'; // Import the Projects icon
import { FaFileUpload } from 'react-icons/fa'; // Import the Tasks icon

const Tab = () => {
    const onChange = (key) => {
        console.log(key);
    };

    const tabLabel = ["Projects", "Tasks"];

    return (
        <Tabs
            className='bg-white rounded-lg  p-2'
            onChange={onChange}
            type="card"
            items={tabLabel.map((item, i) => {
                const id = String(i + 1);

                const content = item === "Projects" ? (
                    <div className=' p-5 '>
                        <ProjectsTab />
                    </div>
                ) : (
                    <div className=' p-5'>
                        <TaskTab />
                    </div>
                );

                // Define label with icons for Projects and Tasks tabs
                const label = item === "Projects" ? (
                    <span className="flex items-center text-[17px]">
                        <BsBagHeartFill className="mr-2 text-green-500 text-[19px]" /> {item}
                    </span>
                ) : item === "Tasks" ? (
                    <span className="flex items-center  text-[17px]">
                        <FaFileUpload className="mr-2 text-blue-500 text-[19px]" /> {item}
                    </span>
                ) : (
                    item
                );

                return {
                    label: label, // Assign the label with the respective icon
                    key: id,
                    children: content,
                };
            })}
        />
    );
};

export default Tab;
