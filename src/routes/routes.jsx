import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import App from "../App";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
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