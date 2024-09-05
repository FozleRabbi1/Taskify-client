import { Layout, Menu } from "antd";
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
            style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div
                style={{
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "gray",
                }}
            >
                <h2 style={{ color: "white" }}>Taskify</h2>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sideBarItems}
            />
        </Sider>
    );
};

export default SideBar;
