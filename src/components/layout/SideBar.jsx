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
            style={{ height: "100vh", width: "300px", position: "sticky", top: "0", left: "0", backgroundColor: "white", padding: "5px" }}
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
        >

            <Button size="large" className="block w-full mt-5">
                <span className="text" >T</span> askify
            </Button>

            <Button size="large" className="block w-full mt-5">
                Main Workspace
            </Button>

            <Menu
                theme=""
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sideBarItems}
            // inlineIndent={10}
            />
        </Sider>
    );
};

export default SideBar;
