import { Tabs } from 'antd';



const Tab = () => {
    const onChange = (key) => {
        console.log(key);
    };

    const tabLabel = ["Projects", "Tasks"]

    return (
        <Tabs
            onChange={onChange}
            type="card"
            items={tabLabel?.map((item, i) => {
                const id = String(i + 1);
                return {
                    label: item,
                    key: id,
                    children: `Content of Tab Pane ${id}`,
                };
            })}
        />
    );
};

export default Tab;