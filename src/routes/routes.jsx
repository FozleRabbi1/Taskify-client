import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import App from "../App";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/Auth/Login";
import { routeGenerator } from "../utils/routeGenerator";
import SockitIo from "../pages/sockitIo/SockitIo";
import Register from "../pages/Auth/Registration";
import Products from "../pages/products/Products";
import Success from "../pages/success/Success";
import Failed from "../pages/failed/Failed";
import Chat from "../pages/sockitIo/Chat";
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
        children: routeGenerator(adminPaths("")),
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    },
    {
        path: "/sockit",
        element: <Chat/>,
    },
    {
        path: "/products",
        element: <Products/>,
    },
    {
        path: "/success",
        element: <Success/>,
    },
    {
        path: "/failed",
        element: <Failed/>,
    },
])

export default routes;