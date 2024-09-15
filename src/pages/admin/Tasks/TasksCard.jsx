import { Select } from "antd";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
import moment from "moment";

const TasksCard = () => {
    const { data } = ProjectsApi.useGetAllProjectsQuery(undefined);

    const defaultData = data?.data?.filter(item => item.status === "Default")
    const Completed = data?.data?.filter(item => item.status === "Completed")
    const Started = data?.data?.filter(item => item.status === "Started")
    const InReview = data?.data?.filter(item => item.status === "In Review")
    const OnGoing = data?.data?.filter(item => item.status === "On Going")

    const statusOptions = ["On Going", "Started", "Default", "In Review", "Completed"].map((item) => ({
        value: item,
        label: item,
    }));

    const propertyOptions = ["Default", "High", "Medium", "Low"].map((item) => ({
        value: item,
        label: item,
    }));

    return (
        <div>

            <div className="grid grid-cols-5 gap-5 ">

                <div>
                    <h2 className="text-lg font-bold opacity-80">Default</h2>
                    {
                        defaultData?.map(item => (
                            <div key={item._id} className="bg-white rounded-md mb-5 shadow-lg px-4 py-5" >
                                <h2 className="text-blue-600 text-lg font-semibold opacity-90">{item.title}</h2>

                                <h2>{item.priority}</h2>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Users</h2>
                                    <div className="flex">
                                        {
                                            item.users.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Clients</h2>
                                    <div className="flex">
                                        {
                                            item.clients.length === 0 ? <h2 className="bg-blue-600 text-white px-2 rounded" >Not Assigned</h2> :

                                                item.clients.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)

                                        }

                                    </div>
                                </div>
                                <h2 className="text-lg  mt-2 opacity-80">Status</h2>
                                <Select
                                    placeholder={item.status}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={statusOptions}
                                />
                                <h2 className="text-lg  mt-2 opacity-80">Priority</h2>
                                <Select
                                    placeholder={item.priority}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={propertyOptions}
                                />
                                <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center mt-2">
                                    {moment(item.startsAt).format('MMMM DD, YYYY')}
                                </span>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <h2 className="text-xl font-bold opacity-80">Completed</h2>
                    {
                        Completed?.map(item => (
                            <div key={item._id} className="bg-white rounded-md mb-5 shadow-lg px-4 py-5" >
                                <h2 className="text-blue-600 text-lg font-semibold opacity-90">{item.title}</h2>

                                <h2>{item.priority}</h2>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Users</h2>
                                    <div className="flex">
                                        {
                                            item.users.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Clients</h2>
                                    <div className="flex">
                                        {
                                            item.clients.length === 0 ? <h2 className="bg-blue-600 text-white px-2 rounded" >Not Assigned</h2> :

                                                item.clients.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)

                                        }

                                    </div>
                                </div>
                                <h2 className="text-lg  mt-2 opacity-80">Status</h2>
                                <Select
                                    placeholder={item.status}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={statusOptions}
                                />
                                <h2 className="text-lg  mt-2 opacity-80">Priority</h2>
                                <Select
                                    placeholder={item.priority}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={propertyOptions}
                                />
                                <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center mt-3">
                                    {moment(item.startsAt).format('MMMM DD, YYYY')}
                                </span>
                                <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center mt-3">
                                    {moment(item.endsAt).format('MMMM DD, YYYY')}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h2 className="text-xl font-bold opacity-80">Started</h2>
                    {
                        Started?.map(item => (
                            <div key={item._id} className="bg-white rounded-md mb-5 shadow-lg px-4 py-5" >
                                <h2 className="text-blue-600 text-lg font-semibold opacity-90">{item.title}</h2>

                                <h2>{item.priority}</h2>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Users</h2>
                                    <div className="flex">
                                        {
                                            item.users.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Clients</h2>
                                    <div className="flex">
                                        {
                                            item.clients.length === 0 ? <h2 className="bg-blue-600 text-white px-2 rounded" >Not Assigned</h2> :

                                                item.clients.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)

                                        }

                                    </div>
                                </div>
                                <h2 className="text-lg  mt-2 opacity-80">Status</h2>
                                <Select
                                    placeholder={item.status}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={statusOptions}
                                />
                                <h2 className="text-lg  mt-2 opacity-80">Priority</h2>
                                <Select
                                    placeholder={item.priority}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={propertyOptions}
                                />
                                <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center mt-2">
                                    {moment(item.startsAt).format('MMMM DD, YYYY')}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h2 className="text-xl font-bold opacity-80">In Review</h2>
                    {
                        InReview?.map(item => (
                            <div key={item._id} className="bg-white rounded-md mb-5 shadow-lg px-4 py-5" >
                                <h2 className="text-blue-600 text-lg font-semibold opacity-90">{item.title}</h2>

                                <h2>{item.priority}</h2>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Users</h2>
                                    <div className="flex">
                                        {
                                            item.users.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Clients</h2>
                                    <div className="flex">
                                        {
                                            item.clients.length === 0 ? <h2 className="bg-blue-600 text-white px-2 rounded" >Not Assigned</h2> :

                                                item.clients.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)

                                        }

                                    </div>
                                </div>
                                <h2 className="text-lg  mt-2 opacity-80">Status</h2>
                                <Select
                                    placeholder={item.status}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={statusOptions}
                                />
                                <h2 className="text-lg  mt-2 opacity-80">Priority</h2>
                                <Select
                                    placeholder={item.priority}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={propertyOptions}
                                />
                                <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center mt-3">
                                    {moment(item.startsAt).format('MMMM DD, YYYY')}
                                </span>
                                <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center mt-3">
                                    {moment(item.endsAt).format('MMMM DD, YYYY')}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h2 className="text-xl font-bold opacity-80">On Going</h2>
                    {
                        OnGoing?.map(item => (
                            <div key={item._id} className="bg-white rounded-md mb-5 shadow-lg px-4 py-5" >
                                <h2 className="text-blue-600 text-lg font-semibold opacity-90">{item.title}</h2>

                                <h2>{item.priority}</h2>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Users</h2>
                                    <div className="flex">
                                        {
                                            item.users.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg  mt-2 opacity-80">Clients</h2>
                                    <div className="flex">
                                        {
                                            item.clients.length === 0 ? <h2 className="bg-blue-600 text-white px-2 rounded" >Not Assigned</h2> :

                                                item.clients.map(i => <img className="size-8 rounded-full" key={i._id} src={i} alt="" />)

                                        }

                                    </div>
                                </div>
                                <h2 className="text-lg  mt-2 opacity-80">Status</h2>
                                <Select
                                    placeholder={item.status}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={statusOptions}
                                />
                                <h2 className="text-lg  mt-2 opacity-80">Priority</h2>
                                <Select
                                    placeholder={item.priority}
                                    style={{ width: '100%', textAlign: 'center' }}
                                    options={propertyOptions}
                                />
                                <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center mt-2">
                                    {moment(item.startsAt).format('MMMM DD, YYYY')}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    );
};

export default TasksCard;