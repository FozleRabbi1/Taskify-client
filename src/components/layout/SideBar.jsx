import { Button, Layout, Menu, Popover } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { AiOutlineRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const userRole = {
    ADMIN: "admin",
};

const SideBar = () => {
    const sideBarItems = sidebarItemGenerator(adminPaths, userRole.ADMIN);

    const text = (
        <div className="flex flex-col gap-2">
            <span  > <input type="checkbox" /> Item 1 </span>
            <span  > <input type="checkbox" /> Item 2</span>
            <span  > <input type="checkbox" /> Item 3</span>
        </div>
    );



    return (

        <Sider
            className="h-screen w-[300px] sticky top-0 left-0 bg-white p-1.5 z-10"
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
            theme="light"
        >
            <NavLink to="/dashboard" className="block w-full mt-5 text-2xl text-center uppercase font-bold ">
                <img  src="https://taskify.taskhub.company/storage/logos/zEy4tSCAFSMczWbOoxBZ3B43Nc9eeqMlNBXDrOzn.png" alt="" />
            </NavLink>

            <Popover placement="rightTop" type="primary" className="w-full my-5 flex items-center justify-center bg-blue-400 font-bold text-white" title={text} >
                <Button className="py-5">  Main Workspace <AiOutlineRight /> </Button>
            </Popover>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sideBarItems}
                className="text-left font-bold"
            />
        </Sider>

    );
};

export default SideBar;
