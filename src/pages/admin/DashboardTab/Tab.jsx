import { Tabs } from 'antd';
import ProjectsTab from './ProjectsTab';
import TaskTab from './TaskTab';

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
                    <div className='h-[70vh] p-5'>
                        <TaskTab />
                    </div>
                );

                return {
                    label: item,
                    key: id,
                    children: content,
                };
            })}
        />
    );
};

export default Tab;
