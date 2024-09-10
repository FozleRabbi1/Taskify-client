/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
// import { Button, Col, DatePicker, Modal, Select, Table } from "antd";
// import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
// import moment from "moment";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { FaEdit, FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
// import { AiOutlineMessage } from "react-icons/ai";
// import { RiDeleteBin5Line, RiFoldersLine } from "react-icons/ri";
// import { CiCircleInfo } from "react-icons/ci";
// import { Row } from 'antd';

// const ProjectsTab = () => {
//     const [params, setParams] = useState(undefined)
//     const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery(params);
//     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//     const [activeStars, setActiveStars] = useState([]);
//     const [open, setOpen] = useState(false);
//     console.log(params);



//     const handleStarClick = (key) => {
//         setActiveStars((prevActiveStars) =>
//             prevActiveStars.includes(key)
//                 ? prevActiveStars.filter((starKey) => starKey !== key)
//                 : [...prevActiveStars, key]
//         );
//     };

//     const statusOptions = ["On Going", "Started", "Default", "In Rewiew"].map((item) => ({
//         value: item,
//         label: item,
//     }));

//     const statusOptions2 = ["Default"].map((item) => ({
//         value: item,
//         label: item,
//     }));

//     const tableData = data?.data?.map(({ _id, id, title, users, clients, status, priority, budget, tags, startsAt, endsAt }) => ({
//         key: _id,
//         id,
//         title,
//         users,
//         clients,
//         status,
//         priority,
//         budget,
//         tags,
//         startsAt,
//         endsAt,
//     }));

//     const onSelectChange = (newSelectedRowKeys) => {
//         setSelectedRowKeys(newSelectedRowKeys);
//     };


//     const rowSelection = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };
//     const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };

//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize, setPageSize] = useState(10);
//     const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);

//     const handlePageChange = (page, pageSize) => {
//         setCurrentPage(page);
//         setPageSize(pageSize);
//     };

//     const handleAddPageSize = () => {
//         const newPageSize = pageSize + 5;
//         setPageSize(newPageSize);
//         if (!availablePageSizes.includes(newPageSize)) {
//             setAvailablePageSizes([...availablePageSizes, newPageSize]);
//         }
//     };


//     const columns = [
//         { title: <span style={titleStyle}>Id</span>, dataIndex: "id", width: 100 },

//         {
//             title: <span style={titleStyle}>Title</span>,
//             dataIndex: "title",
//             render: (title, record) => (
//                 <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
//                     {title}
//                     {activeStars.includes(record.key) ? (
//                         <FaStar
//                             onClick={() => handleStarClick(record.key)}
//                             className="text-yellow-500 mx-2 cursor-pointer"
//                         />
//                     ) : (
//                         <FaRegStar
//                             onClick={() => handleStarClick(record.key)}
//                             className="text-yellow-500 mx-2 cursor-pointer"
//                         />
//                     )}
//                     <AiOutlineMessage className="text-red-500" />
//                 </span>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Users</span>,
//             dataIndex: "users",
//             render: (users) => (
//                 <div style={{ display: 'flex', gap: '8px' }} className="flex items-center">
//                     {users.map((url, index) => (
//                         <img key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
//                     ))}
//                     <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
//                         <FaRegEdit className="text-xl text-blue-600" />
//                     </Button>
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Clients</span>,
//             dataIndex: "clients",
//             render: (clients) => (
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                     {clients?.length !== 0 ? (
//                         <div className="flex items-center">
//                             {clients.map((url, index) => (
//                                 <img key={index} src={url} alt={`Client ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
//                             ))}
//                             <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
//                                 <FaRegEdit className="text-xl text-blue-600" />
//                             </Button>
//                         </div>
//                     ) : (
//                         <div className="flex items-center">
//                             <h2 className="bg-blue-600 text-white font-medium px-2 rounded-md uppercase opacity-80 flex items-center">Not Assigned</h2>
//                             <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
//                                 <FaRegEdit className="text-xl text-blue-600" />
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Status</span>,
//             dataIndex: "status",
//             render: (status) => (
//                 <div className="">
//                     <Select
//                         placeholder={status}
//                         style={{ width: '180px', textAlign: 'center' }}
//                         options={statusOptions}
//                     />
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Priority</span>,
//             dataIndex: "priority",
//             render: (priority) => (
//                 <div className="">
//                     <Select
//                         placeholder={priority}
//                         style={{ width: '180px', textAlign: 'center' }}
//                         options={statusOptions2}
//                     />
//                 </div>
//             ),
//         },
//         {
//             title: <span style={titleStyle}>Budget</span>,
//             dataIndex: "budget",
//             render: (budget) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {budget}
//                     </span>
//                 </div>
//             ),

//         },
//         {
//             title: <span style={titleStyle}>Tags</span>,
//             dataIndex: "tags",
//             // render: (tags) => tags.join(', '),
//             render: (tags) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {tags.join(', ')}
//                     </span>
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Starts At</span>,
//             dataIndex: "startsAt",
//             // render: (date) => moment(date).format('MMMM DD, YYYY'),
//             render: (date) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {date}
//                     </span>
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Ends At</span>,
//             dataIndex: "endsAt",
//             render: (date) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {date}
//                     </span>
//                 </div>
//             ),
//         },
//         {
//             title: <span style={titleStyle}> Action </span>,
//             dataIndex: "action",
//             render: () => (
//                 <div className="">
//                     <button title="Update"><FaEdit className="text-xl mr-6 text-blue-500 " /></button>
//                     <button title="Delete"><RiDeleteBin5Line className="text-xl mr-6 text-red-500 " /></button>
//                     <button title="Duplicate"><RiFoldersLine className="text-xl mr-6 text-yellow-500 " /></button>
//                     <button title="Quick View"><CiCircleInfo className="text-xl text-blue-600 " /></button>

//                 </div>
//             ),
//         },
//     ];


//     const { RangePicker } = DatePicker;
//     const [dates, setDates] = useState(null);
//     const [clickHandled, setClickHandled] = useState(false);
//     const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
//     const rangePickerRef = useRef(null);
//     const submitButtonRef = useRef(null);

//     const handleDateChange = (dates) => {
//         setDates(dates);
//     };


//     // const handleSubmit = () => {
//     //     if (dates && dates.length > 0) {
//     //         const formattedDates = dates.map(date => moment(date).format('MMMM DD, YYYY'));
//     //         console.log('Selected Dates:', formattedDates);
//     //         setParams( {dates : formattedDates} )
//     //         setIsDatePickerVisible(false);
//     //     }
//     // };

//     const handleSubmit = () => {
//         if (dates && dates.length > 0) {
//             // Format dates as needed
//             const formattedDates = dates.map(date => moment(date).format('MMMM DD, YYYY'));

//             // Set the params as a comma-separated string or JSON string
//             setParams({ dates: JSON.stringify(formattedDates) });
//             setIsDatePickerVisible(false);
//         }
//     };



//     const handleOpenChange = (open) => {
//         if (open) {
//             setIsDatePickerVisible(true);
//         }
//     };
//     const handleClickOutside = useCallback((event) => {
//         if (
//             rangePickerRef.current &&
//             !rangePickerRef.current.contains(event.target) &&
//             !submitButtonRef.current.contains(event.target) &&
//             !clickHandled
//         ) {
//             setIsDatePickerVisible(false);
//         }
//         setClickHandled(false);
//     }, [clickHandled]);
//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [handleClickOutside]);



//     return (
//         <div>

//             <h2 className="text-2xl text-gray-500 font-bold">Admin's Projects</h2>
//             {/* <div className="my-5">
//                 <Row>
//                     <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
//                         <DatePicker.RangePicker status="gray-7" style={{ width: '100%' }} />
//                     </Col>
//                 </Row>
//             </div> */}


//             <div className="my-5">
//                 <Row>
//                     <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
//                         <div ref={rangePickerRef}>
//                             <RangePicker
//                                 status="gray-7"
//                                 style={{ width: '100%' }}
//                                 onChange={handleDateChange}
//                                 open={isDatePickerVisible}
//                                 onOpenChange={handleOpenChange}
//                                 renderExtraFooter={() => (
//                                     <div style={{ textAlign: 'right' }}>
//                                         <Button
//                                             type="primary"
//                                             onClick={() => {
//                                                 setClickHandled(true); // Set flag to true on button click
//                                                 handleSubmit();
//                                             }}
//                                             ref={submitButtonRef}
//                                         >
//                                             Custom Submit
//                                         </Button>
//                                     </div>
//                                 )}
//                             />
//                         </div>
//                     </Col>
//                 </Row>
//             </div>



//             <div>
//             </div>

//             <div className="overflow-x-auto">
//                 {/* <Table
//                     bordered
//                     loading={isLoading}
//                     columns={columns}
//                     dataSource={tableData}
//                     showSorterTooltip={{ target: "sorter-icon" }}
//                     rowSelection={rowSelection}
//                     scroll={{ x: 'max-content' }}

//                 /> */}

//                 <Table
//                     bordered
//                     loading={isLoading}
//                     columns={columns}
//                     dataSource={tableData}
//                     rowSelection={rowSelection}
//                     scroll={{ x: 'max-content' }}
//                     // pagination={{
//                     //     pageSize: pageSize,
//                     //     total: tableData?.length,
//                     //     showSizeChanger: true,
//                     // }}
//                     // pagination={{
//                     //     current: currentPage,
//                     //     pageSize: pageSize,
//                     //     total: tableData?.length,
//                     //     showSizeChanger: true,
//                     //     onChange: handlePageChange,
//                     //     onShowSizeChange: handlePageChange,
//                     // }}

//                     pagination={{
//                         current: currentPage,
//                         pageSize: pageSize,
//                         total: tableData?.length,
//                         showSizeChanger: true,
//                         pageSizeOptions: availablePageSizes.map(size => size.toString()),
//                         onChange: handlePageChange,
//                         onShowSizeChange: handlePageChange,
//                     }}
//                 />
//                 <div className="flex justify-end">
//                     <Button onClick={handleAddPageSize} type="primary" className="mt-4">
//                         Add Page Size
//                     </Button>
//                 </div>
//             </div>

//             <Modal
//                 title="Up Coming"
//                 centered
//                 open={open}
//                 onOk={() => setOpen(false)}
//                 onCancel={() => setOpen(false)}
//                 width={1000}
//             >
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//             </Modal>
//         </div>
//     );
// };

// export default ProjectsTab;




















/* eslint-disable react/no-unescaped-entities */
// import { Button, Checkbox, Modal, Select, Table } from "antd";
// import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
// import moment from "moment";
// import { useState } from "react";
// import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
// import { AiOutlineMessage } from "react-icons/ai";

// const ProjectsTab = () => {
//     const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery({});
//     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//     const [activeStars, setActiveStars] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [checkedRows, setCheckedRows] = useState([]);

//     const handleStarClick = (key) => {
//         setActiveStars((prevActiveStars) =>
//             prevActiveStars.includes(key)
//                 ? prevActiveStars.filter((starKey) => starKey !== key)
//                 : [...prevActiveStars, key]
//         );
//     };

//     const statusOptions = ["On Going", "Started", "Default", "In Rewiew"].map((item) => ({
//         value: item,
//         label: item,
//     }));

//     const statusOptions2 = ["Default"].map((item) => ({
//         value: item,
//         label: item,
//     }));

//     const tableData = data?.data?.map(({ _id, id, title, users, clients, status, priority, budget, tags, createdAt, updatedAt }) => ({
//         key: _id,
//         id,
//         title,
//         users,
//         clients,
//         status,
//         priority,
//         budget,
//         tags,
//         createdAt,
//         updatedAt,
//     })) || [];

//     const onSelectChange = (newSelectedRowKeys) => {
//         setSelectedRowKeys(newSelectedRowKeys);
//     };

//     const rowSelection = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };
//     const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };

//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize, setPageSize] = useState(10);
//     const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);

//     const handlePageChange = (page, pageSize) => {
//         setCurrentPage(page);
//         setPageSize(pageSize);
//     };

//     const handleAddPageSize = () => {
//         const newPageSize = pageSize + 5;
//         setPageSize(newPageSize);
//         if (!availablePageSizes.includes(newPageSize)) {
//             setAvailablePageSizes([...availablePageSizes, newPageSize]);
//         }
//     };

//     const handleCheckboxChange = (record, checked) => {
//         setCheckedRows(prevCheckedRows => {
//             if (checked) {
//                 console.log("Checked Row ID:", record.id);  // Log the ID of the checked row
//                 return [...prevCheckedRows, record.key];
//             } else {
//                 console.log("Unchecked Row ID:", record.id);  // Log the ID of the unchecked row
//                 return prevCheckedRows.filter(key => key !== record.key);
//             }
//         });
//     };

//     const handleSelectAll = (checked) => {
//         const currentData = getCurrentPageData();
//         if (checked) {
//             const newChecked = currentData.map(record => record.key);
//             setCheckedRows(prevCheckedRows => [...prevCheckedRows, ...newChecked]);
//         } else {
//             const currentDataKeys = currentData.map(record => record.key);
//             setCheckedRows(prevCheckedRows => prevCheckedRows.filter(key => !currentDataKeys.includes(key)));
//         }
//     };

//     const getCurrentPageData = () => {
//         const startIndex = (currentPage - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         return tableData.slice(startIndex, endIndex);
//     };


//     const columns = [
//         {
//             title: <Checkbox
//                 indeterminate={checkedRows.length > 0 && checkedRows.length < getCurrentPageData().length}
//                 checked={getCurrentPageData()?.every(record => checkedRows.includes(record.key))}
//                 onChange={e => handleSelectAll(e.target.checked)}
//             />,
//             dataIndex: 'checkbox',
//             render: (_, record) => (
//                 <Checkbox
//                     checked={checkedRows.includes(record.key)}
//                     onChange={e => handleCheckboxChange(record, e.target.checked)}
//                 />
//             )
//         },
//         { title: <span style={titleStyle}>Id</span>, dataIndex: "id", width: 100 },

//         {
//             title: <span style={titleStyle}>Title</span>,
//             dataIndex: "title",
//             render: (title, record) => (
//                 <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
//                     {title}
//                     {activeStars.includes(record.key) ? (
//                         <FaStar
//                             onClick={() => handleStarClick(record.key)}
//                             className="text-yellow-500 mx-2 cursor-pointer"
//                         />
//                     ) : (
//                         <FaRegStar
//                             onClick={() => handleStarClick(record.key)}
//                             className="text-yellow-500 mx-2 cursor-pointer"
//                         />
//                     )}
//                     <AiOutlineMessage className="text-red-500" />
//                 </span>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Users</span>,
//             dataIndex: "users",
//             render: (users) => (
//                 <div style={{ display: 'flex', gap: '8px' }} className="flex items-center">
//                     {users.map((url, index) => (
//                         <img key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
//                     ))}
//                     <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
//                         <FaRegEdit className="text-xl text-blue-600" />
//                     </Button>
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Clients</span>,
//             dataIndex: "clients",
//             render: (clients) => (
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                     {clients?.length !== 0 ? (
//                         <div className="flex items-center">
//                             {clients.map((url, index) => (
//                                 <img key={index} src={url} alt={`Client ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
//                             ))}
//                             <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
//                                 <FaRegEdit className="text-xl text-blue-600" />
//                             </Button>
//                         </div>
//                     ) : (
//                         <div className="flex items-center">
//                             <h2 className="bg-blue-600 text-white font-medium px-2 rounded-md uppercase opacity-80 flex items-center">Not Assigned</h2>
//                             <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
//                                 <FaRegEdit className="text-xl text-blue-600" />
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Status</span>,
//             dataIndex: "status",
//             render: (status) => (
//                 <div className="">
//                     <Select
//                         placeholder={status}
//                         style={{ width: '180px', textAlign: 'center' }}
//                         options={statusOptions}
//                     />
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Priority</span>,
//             dataIndex: "priority",
//             render: (priority) => (
//                 <div className="">
//                     <Select
//                         placeholder={priority}
//                         style={{ width: '180px', textAlign: 'center' }}
//                         options={statusOptions2}
//                     />
//                 </div>
//             ),
//         },
//         {
//             title: <span style={titleStyle}>Budget</span>,
//             dataIndex: "budget",
//             render: (budget) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {budget}
//                     </span>
//                 </div>
//             ),

//         },
//         {
//             title: <span style={titleStyle}>Tags</span>,
//             dataIndex: "tags",
//             // render: (tags) => tags.join(', '),
//             render: (tags) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {tags.join(', ')}
//                     </span>
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Starts At</span>,
//             dataIndex: "createdAt",
//             // render: (date) => moment(date).format('MMMM DD, YYYY'),
//             render: (date) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {moment(date).format('MMMM DD, YYYY')}
//                     </span>
//                 </div>
//             ),
//             // width: 200,
//         },
//         {
//             title: <span style={titleStyle}>Ends At</span>,
//             dataIndex: "updatedAt",
//             render: (date) => (
//                 <div className="">
//                     <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
//                         {moment(date).format('MMMM DD, YYYY')}
//                     </span>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <h2 className="text-2xl text-gray-500 font-bold">Admin's Projects</h2>

//             <div className="overflow-x-auto">

//                 <Table
//                     bordered
//                     loading={isLoading}
//                     columns={columns}
//                     dataSource={tableData}
//                     rowSelection={rowSelection}
//                     scroll={{ x: 'max-content' }}

//                     pagination={{
//                         current: currentPage,
//                         pageSize: pageSize,
//                         total: tableData?.length,
//                         showSizeChanger: true,
//                         pageSizeOptions: availablePageSizes.map(size => size.toString()),
//                         onChange: handlePageChange,
//                         onShowSizeChange: handlePageChange,
//                     }}
//                 />
//                 <div className="flex justify-end">
//                     <Button onClick={handleAddPageSize} type="primary" className="mt-4">
//                         Add Page Size
//                     </Button>
//                 </div>
//             </div>

//             <Modal
//                 title="Up Coming"
//                 centered
//                 open={open}
//                 onOk={() => setOpen(false)}
//                 onCancel={() => setOpen(false)}
//                 width={1000}
//             >
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//                 <p>some contents...</p>
//             </Modal>
//         </div>
//     );
// };

// export default ProjectsTab;




















































/* eslint-disable react/no-unescaped-entities */
import { Button, Col, Modal, Row, Select, Space, Table } from "antd";
import { ProjectsApi } from "../../../redux/fetures/prjects/ProjectsApi";
import { useState } from "react";
import { FaEdit, FaFile, FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaUserLarge } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RiDeleteBin5Line, RiDeleteBin6Line, RiFoldersLine } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import TSForm from "../../../components/form/TSForm";
import TSInput from "../../../components/form/TSInput";
import TSSelect from "../../../components/form/TSSelect";

const ProjectsTab = () => {

    const [isFavouriteProject] = ProjectsApi.useIsFavouriteProjectMutation()
    const [updateStatusInProjects] = ProjectsApi.useUpdateStatusInProjectsMutation()
    const [params, setParams] = useState(undefined);    
    const { data, isLoading } = ProjectsApi.useGetAllProjectsQuery(params);
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [availablePageSizes, setAvailablePageSizes] = useState([5, 10, 15, 20, 25, 30, 35]);
    const [ids, setides] = useState([])
    const [deleteProject,] = ProjectsApi.useDeleteProjectMutation()
    const [modalData, setModalData] = useState({})


    const handleStarClick = async (key, i) => {
        const isFavourite = {
            id: key,
            data: {
                isFavourite: i
            }
        }
        const res = await isFavouriteProject(isFavourite)
        if (res?.data?.success) {
            toast.success(res?.data?.message)
        }
    };

    const statusOptions = ["On Going", "Started", "Default", "In Review", "Completed"].map((item) => ({
        value: item,
        label: item,
    }));

    // const modalSelectOptions = data?.data?.map((item) => ({
    //     value: item.image,
    //     label: item.title,
    // }));



    const statusOptions2 = ["Default"].map((item) => ({
        value: item,
        label: item,
    }));

    const tableData = data?.data?.map(({ _id, id, title, users, clients, status, priority, budget, tags, createdAt, updatedAt, isFavourite }) => ({
        key: _id,
        _id,
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
        isFavourite
    })) || [];
    const titleStyle = { fontWeight: '600', color: '#6b7260', textTransform: 'uppercase' };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleAddPageSize = () => {
        const newPageSize = pageSize + 5;
        setPageSize(newPageSize);
        if (!availablePageSizes.includes(newPageSize)) {
            setAvailablePageSizes([...availablePageSizes, newPageSize]);
        }
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        const selectedIds = newSelectedRowKeys.map(key => {
            const selectedRow = tableData.find(row => row.key === key);
            return selectedRow ? selectedRow._id : null;
        }).filter(_id => _id !== null);
        setides(selectedIds);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const statusHandler = async (selectedStatus, id) => {
        const status = {
            id,
            data: {
                selectedStatus
            }
        }
        const res = await updateStatusInProjects(status)
        if (res?.data?.success) {
            toast.success(res?.data?.message)
        }
    };

    const handleModal = (record) => {
        setOpen(true)
        setModalData(record)

        const {
            budget,
            clients,
            createdAt,
            id,
            isFavourite,
            key,
            priority,
            status,
            tags,
            title,
            updatedAt,
            users,
            _id
        } = record

        console.log(budget,
            clients,
            createdAt,
            id,
            isFavourite,
            key,
            priority,
            status,
            tags,
            title,
            updatedAt,
            users,
            _id);


    }


    const columns = [
        { title: <span style={titleStyle}>Id</span>, dataIndex: "id", width: 100 },
        {
            title: <span style={titleStyle}>Title</span>,
            dataIndex: "title",
            render: (title, record) => (
                <span className="text-blue-600 opacity-90 text-[16px] font-semibold flex items-center">
                    {title}
                    {record.isFavourite ? (
                        <FaStar
                            onClick={() => handleStarClick(record.key, "favourite")}
                            className="text-yellow-500 mx-2 cursor-pointer"
                        />
                    ) : (
                        <FaRegStar
                            onClick={() => handleStarClick(record.key, "notFavourite")}
                            className="text-yellow-500 mx-2 cursor-pointer"
                        />
                    )}
                    <AiOutlineMessage className="text-red-500" />
                </span>
            ),
        },
        {
            title: <span style={titleStyle}>Users</span>,
            dataIndex: "users",
            render: (users, record) => (
                <div style={{ display: 'flex', gap: '8px' }} className="flex items-center">
                    {
                        users.length === 0 ? <FaUserLarge className="size-[30px] rounded-full text-gray-300" /> :
                            <>
                                {
                                    users.map((url, index) => (
                                        <img className={`border-2 border-gray-300 ${index >= 1 ? "-ml-5" : ""} hover:z-10 hover:-mt-2 hover:shadow-md duration-300 cursor-pointer`} key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                    ))
                                } </>
                    }
                    <Button onClick={() => handleModal(record)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                        <FaRegEdit className="text-xl text-blue-600" />
                    </Button>
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Clients</span>,
            dataIndex: "clients",
            render: (clients) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {clients?.length !== 0 ? (
                        <div className="flex items-center">
                            {clients.map((url, index) => (
                                <img className={`border-2 border-gray-300 ${index >= 1 ? "-ml-5" : ""} hover:z-10 hover:-mt-2 hover:shadow-md duration-300 cursor-pointer`} key={index} src={url} alt={`User ${index + 1}`} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                            ))}
                            <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                <FaRegEdit className="text-xl text-blue-600" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h2 className="bg-blue-600 text-white font-medium px-2 rounded-md uppercase opacity-80 flex items-center">Not Assigned</h2>
                            <Button onClick={() => setOpen(true)} className="border rounded-full flex justify-center items-center w-[30px] h-[30px] border-blue-600 ml-2 p-[6px] ">
                                <FaRegEdit className="text-xl text-blue-600" />
                            </Button>
                        </div>
                    )}
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Status</span>,
            dataIndex: "status",
            render: (status, record) => (
                <div className="">
                    <Select
                        placeholder={status}
                        style={{ width: '180px', textAlign: 'center' }}
                        options={statusOptions}
                        onChange={(value) => statusHandler(value, record.key)}
                    />
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Priority</span>,
            dataIndex: "priority",
            render: (priority) => (
                <div className="">
                    <Select
                        placeholder={priority}
                        style={{ width: '180px', textAlign: 'center' }}
                        options={statusOptions2}
                    />
                </div>
            ),
        },
        {
            title: <span style={titleStyle}>Budget</span>,
            dataIndex: "budget",
            render: (budget) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {budget}
                    </span>
                </div>
            ),

        },
        {
            title: <span style={titleStyle}>Tags</span>,
            dataIndex: "tags",
            // render: (tags) => tags.join(', '),
            render: (tags) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {tags.join(', ')}
                    </span>
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Starts At</span>,
            dataIndex: "createdAt",
            // render: (date) => moment(date).format('MMMM DD, YYYY'),
            render: (date) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {/* {moment(date).format('MMMM DD, YYYY')} */}
                        {date}
                    </span>
                </div>
            ),
            // width: 200,
        },
        {
            title: <span style={titleStyle}>Ends At</span>,
            dataIndex: "updatedAt",
            render: (date) => (
                <div className="">
                    <span className="text-gray-500 opacity-90 text-[15px] font-semibold flex items-center">
                        {/* {moment(date).format('MMMM DD, YYYY')} */}
                        {date}
                    </span>
                </div>
            ),
        },
        {
            title: <span style={titleStyle}> Action </span>,
            dataIndex: "action",
            render: () => (
                <div className="">
                    <button title="Update"><FaEdit className="text-xl mr-6 text-blue-500 " /></button>
                    <button title="Delete"><RiDeleteBin5Line className="text-xl mr-6 text-red-500 " /></button>
                    <button title="Duplicate"><RiFoldersLine className="text-xl mr-6 text-yellow-500 " /></button>
                    <button title="Quick View"><CiCircleInfo className="text-xl text-blue-600 " /></button>

                </div>
            ),
        },
    ];

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't remove This User`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject({ idArray: ids });
            }
        });

    }

    const onSubmit = async (data) => {
        console.log(data);

    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    const filterByStatus = (v) => {
        const status = {
            status: v
        }        
        setParams(status)
    }


    return (
        <div>

            <h2 className="text-2xl text-gray-500 font-bold">Admin's Projects</h2>

            <div className="mt-4">
                <Select
                    // placeholder={status}
                    style={{ width: '33%' }}
                    options={statusOptions}
                    onChange={(value) => filterByStatus(value)}
                />
            </div>



            <div className="flex gap-2">
                <button onClick={() => handleDelete()} className="my-5 border border-red-600 text-red-600 flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-red-600 duration-300 ">
                    <RiDeleteBin6Line className="mr-1" /> Delete Selected
                </button>

                <button onClick={() => handleDelete()} className="my-5 border border-blue-600 text-blue-600 flex justify-between items-center px-6 py-2 text-[15px] rounded font-semibold opacity-80 hover:text-white hover:bg-blue-600 duration-300 ">
                    <FaFile className="mr-1" /> Save Coloumn Visibility
                </button>
            </div>

            <div className="overflow-x-auto">
                <Table
                    bordered
                    loading={isLoading}
                    columns={columns}
                    dataSource={tableData}
                    rowSelection={rowSelection}
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: tableData?.length,
                        showSizeChanger: true,
                        pageSizeOptions: availablePageSizes.map(size => size.toString()),
                        onChange: handlePageChange,
                        onShowSizeChange: handlePageChange,
                    }}
                />
                <div className="flex justify-end">
                    <Button onClick={handleAddPageSize} type="primary" className="mt-4">
                        Add Page Size
                    </Button>
                </div>
            </div>


            <Modal
                title="Update Projecsts"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >

                <div>

                    {/* // const {
                //         budget,
                //         clients,
                //         createdAt,
                //         id,
                //         isFavourite,
                //         key,
                //         priority,
                //         status,
                //         tags,
                //         title,
                //         updatedAt,
                //         users,
                //         _id
                //     } = modalData */}

                    <div>

                        <Row align="middle">
                            <Col span={24}>
                                <TSForm onSubmit={onSubmit} className="w-full">

                                    <Row gutter={[16, 16]} className="w-full flex">
                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput type="text" name="title" label="Title" placeholder={modalData.title}></TSInput>
                                        </Col>

                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSSelect
                                                name="status"
                                                label="Status"
                                                options={statusOptions}
                                                placeholder={modalData.status}
                                            >
                                            </TSSelect>
                                        </Col>

                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <TSInput type="text" name="budget" label="budget" placeholder="Please Inter Budget"></TSInput>
                                        </Col>

                                        <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                                            <label className="text-[14px] uppercase"> Select Users </label>
                                            <Space
                                                style={{
                                                    width: '100%',
                                                    marginTop: "3px",
                                                    padding: "4px"
                                                }}
                                                direction="vertical"
                                            >
                                                <Select
                                                    size="large"
                                                    mode="multiple"
                                                    allowClear
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="Please select"
                                                    defaultValue={['a10', 'c12']}
                                                    onChange={handleChange}
                                                    options={options}
                                                />

                                            </Space>
                                        </Col>

                                    </Row>

                                    <Button htmlType="submit">Update</Button>

                                </TSForm>
                            </Col>

                        </Row>
                    </div>



                </div>

            </Modal>


        </div>
    );
};

export default ProjectsTab;