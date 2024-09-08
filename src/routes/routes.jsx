import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import App from "../App";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/Auth/Login";
import { routeGenerator } from "../utils/routeGenerator";
import SockitIo from "../pages/sockitIo/SockitIo";
// import SockitIo from "../pages/sockitIo/SockitIo";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
   
    {
        path: "/dashboard",
        element: <App></App>,
        children : [
           {
            path : "",
            element : <Dashboard/>
           }
        ]
    },
    {
        path: "/admin",
        element: (
            <App></App>
        ),
        children: routeGenerator(adminPaths),
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path: "/sockit",
        element: <SockitIo/>,
    },
])

export default routes;