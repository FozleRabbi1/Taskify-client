import FavouriteProjects from "../pages/admin/Projects/FavouriteProjects";
import ManageProjects from "../pages/admin/Projects/ManageProjects";
import Dashboard from "../pages/admin/Dashboard"
import Tags from "../pages/admin/Tags/tags";
import Todos from "../pages/admin/Todos/Todos";
import Tasks from "../pages/admin/Tasks/Tasks";
import Notes from "../pages/notes/Notes";
import { FaFileUpload, FaHome } from "react-icons/fa";
import { BsBagHeartFill } from "react-icons/bs";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { BiNotepad } from "react-icons/bi";
import { MdOutlineContactMail } from "react-icons/md";
import ManageContacts from "../pages/contacts/ManageContacts";
import ContactTypes from "../pages/contacts/ContactTypes";


export const adminPaths = (todosData) => [
  {
    logo: <FaHome className="text-red-500" />,
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    logo: <BsBagHeartFill className="text-green-500" />,
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
    logo: <FaFileUpload className="text-blue-500" />,
    name: "Tasks",
    path: "tasks",
    element: <Tasks />,
  },
  {
    logo: <HiMiniBars3BottomLeft className="text-gray-600" />,
    notification: (
      <span className={`text-md ${todosData !== 0 ? "bg-red-600" : "bg-green-600"} text-white font-bold rounded flex justify-center items-center size-5`}>
        {todosData || 0}
      </span>
    ),
    name: "Todos",
    path: "todo",
    element: <Todos />,
  },
  {
    logo: <BiNotepad className="text-blue-700" />,
    name: "Notes",
    path: "nots",
    element: <Notes />,
  },
  {
    logo: <MdOutlineContactMail className="text-green-500" />,
    name: "Contacts",
    children: [
      {
        name: "Manage Contacts",
        path: "manage-contacts",
        element: <ManageContacts />,
      },
      {
        name: "Our Employees",
        path: "our-employees",
        element: <ContactTypes />,
      }
    ],
  },
];