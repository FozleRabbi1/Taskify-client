import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import App from "../App";
import Dashboard from "../pages/admin/Dashboard";
// import Dashboard from "../pages/admin/Dashboard"


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
])

export default routes;