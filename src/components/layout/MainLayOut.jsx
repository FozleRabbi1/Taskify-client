import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const { Content } = Layout;

const MainLayout = () => {

    return (
        <div className="">
            <Layout style={{ height: "100vh" }}> 
                <SideBar /> 
                <Layout style={{ overflow: "auto" }}>
                    <Content className="mx-6 my-3 " style={{ margin: "", minHeight: 360 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>

        </div>
    );
};

export default MainLayout;
