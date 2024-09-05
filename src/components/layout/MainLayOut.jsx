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

                    <Content style={{ margin: "" }}>
                        <div
                            style={{
                                padding: 20,
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
