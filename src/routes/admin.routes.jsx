import FavouriteProjects from "../pages/admin/Projects/FavouriteProjects";
import ManageProjects from "../pages/admin/Projects/ManageProjects";
import Dashboard from "../pages/admin/Dashboard"
import Tags from "../pages/admin/Tags/tags";
import Todos from "../pages/admin/Todos/Todos";
import Tasks from "../pages/admin/Tasks/Tasks";
import Notes from "../pages/notes/Notes";


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
            {
                name: "Tags",
                path: "tags",
                element: <Tags />,
            },

        ],
    },
    {
        name: "Tasks",
        path: "tasks",
        element: <Tasks />,
    },
    {
        name: "Todos",
        path: "todo",
        element: <Todos />,
    },
    {
        name: "Notes",
        path: "nots",
        element: <Notes />,
    },
  
]