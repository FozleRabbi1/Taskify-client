import { Button, Layout, Menu } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";

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
            <Button size="large" className="block w-full mt-5">
                <span className="text" >T</span> askify
            </Button>

            <Button size="large" className="block w-full mt-5">
                Main Workspace
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
