import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const { Content } = Layout;

const MainLayout = () => {

    return (
        <div>
            <Layout style={{ height: "100%" }}>
                <SideBar></SideBar>
                <Layout>

                    <Content style={{ margin: "24px 16px 0" }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            <Outlet></Outlet>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default MainLayout;
