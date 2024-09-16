import SearchBar from "../../../shared/SearchBar";
import ProjectsTab from "../DashboardTab/ProjectsTab";


const ManageProjects = () => {
    return (
        <div className="">
            <SearchBar />

            <div className="mt-10 bg-white p-5 rounded-md">
                <ProjectsTab />
            </div>

        </div>
        
    );
};

export default ManageProjects;