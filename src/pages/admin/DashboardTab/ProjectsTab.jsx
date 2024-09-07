/* eslint-disable react/no-unescaped-entities */

import { Table } from "antd";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";


const ProjectsTab = () => {
    const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery({})

    const tableData = data?.data?.map(({ _id,id, title, users, clients, status, priority, budget, tags, createdAt, updatedAt }) => ({
        key: _id,
        id,
        title,
        users,
        clients,
        status,
        priority,
        budget,
        tags,
        createdAt,
        updatedAt,
      }));
    
      const columns = [
        {title : "Id", dataIndex : "id"},
        {
          title: "Title",
          dataIndex: "title",
        },
        {
            title: "Users",
            dataIndex: "users",
            render: (users) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                {users.map((url, index) => (
                  <img key={index} src={url} alt={`User ${index + 1}`} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                ))}
              </div>
            ),
          },
          {
            title: "Clients",
            dataIndex: "clients",
            render: (clients) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                {clients.map((url, index) => (
                  <img key={index} src={url} alt={`Client ${index + 1}`} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                ))}
              </div>
            ),
          },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "Priority",
          dataIndex: "priority",
        },
        {
          title: "Budget",
          dataIndex: "budget",
        },
        {
          title: "Tags",
          dataIndex: "tags",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
        },
        {
          title: "Updated At",
          dataIndex: "updatedAt",
        },
      ];

    return (
        <div>
            <h2 className="text-2xl text-gray-500 font-bold">Admin's Projects</h2>

            <Table
                loading={isLoading}
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: "sorter-icon" }}
            />


        </div>
    );
};

export default ProjectsTab;