import { Button, Layout, Menu } from "antd";
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

    return (
        <Sider
            className="h-screen w-[300px] sticky top-0 left-0 bg-white p-1.5"
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
            theme="light"
        >
            <NavLink to="/dashboard" className="block w-full mt-5 text-2xl text-center uppercase font-bold ">
                <span className="text text-[50px] font-extrabold -mr-2 " >T</span> askify
            </NavLink>

            <Button size="large" type="primary" className="w-full my-5 flex items-center justify-center">
                Main Workspace  <AiOutlineRight className="" />
            </Button>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sideBarItems}
                className="text-left font-bold "
            />

        </Sider>
    );
};

export default SideBar;
