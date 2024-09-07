import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import App from "../App";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/Auth/Login";
import { routeGenerator } from "../utils/routeGenerator";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
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
    }
])

export default routes;