import Dashboard from "../pages/admin/Dashboard";
import FavouriteProjects from "../pages/admin/Projects/FavouriteProjects";
import ManageProjects from "../pages/admin/Projects/ManageProjects";


export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        name: "Projects",
        children: [
            {
                name: "Manage Projects",
                path: "manage-projects",
                element: <ManageProjects />,
            },
            {
                name: "Favourite Projects",
                path: "favourite-projects",
                element: <FavouriteProjects />,
            },

        ],
    },
    {
        name: "Projects 2",
        children: [
            {
                name: "Manage Projects 2",
                path: "manage-projects",
                element: <ManageProjects />,
            },
            {
                name: "Favourite Projects 2",
                path: "favourite-projects",
                element: <FavouriteProjects />,
            },

        ],
    },
]