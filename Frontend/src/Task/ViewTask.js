
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN } from "../UserComponent/config";
import { Table, Select, Popconfirm, message, Tag, Modal, Input, Button, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const ViewTask = () => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await axios.post(`${DOMAIN}task/list`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResponse(result.data);
        setLoading(false);
      } catch (error) {
        setResponse([]);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  // Fetch users for task assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.post(`${DOMAIN}user/list`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(result.data);
      } catch (error) {
        setUser([]);
      }
    };
    fetchUsers();
  }, [token]);

  // Handle delete task
  const handleDelete = async (task_id) => {
    try {
      await axios.post(`${DOMAIN}task/delete`, { task_id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Task deleted successfully!");
      setResponse(response.filter((task) => task._id !== task_id));
    } catch (error) {
      message.error("Failed to delete task. Please try again.");
    }
  };

  // Change task priority
  const changePriority = async (task_id, priority) => {
    try {
      await axios.post(`${DOMAIN}task/priority`, { task_id, priority }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Priority updated successfully!");
    } catch (error) {
      message.error("Failed to update priority. Please try again.");
    }
  };

  // Assign task to user
  const assignTask = async (task_id, assigned_to) => {
    try {
      await axios.post(`${DOMAIN}task/assign`, { task_id, assigned_to }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Task assigned successfully!");
    } catch (error) {
      message.error("Failed to assign task. Please try again.");
    }
  };

  // Update task
  const updateTask = async () => {
    try {
      await axios.post(`${DOMAIN}task/update`, {
        task_id: currentTask._id,
        ...updatedTask,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      message.success("Task updated successfully!");
      setResponse(response.map((task) =>
        task._id === currentTask._id ? { ...task, ...updatedTask } : task
      ));
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update the task. Please try again.");
    }
  };

  // Handle edit icon click
  const handleEdit = (task) => {
    setCurrentTask(task);
    setUpdatedTask({
      title: task.title,
      description: task.description,
      due_date: moment(task.due_date),
    });
    setIsModalVisible(true);
  };

  // Table columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (due_date) => (
        <span style={{ fontWeight: "bold", color: "#4CAF50" }}>
          {moment(due_date).format("MMMM Do YYYY")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          pending: "red",
          working: "yellow",
          completed: "green",
        };
        return (
          <Tag color={statusColors[status] || "default"}>{status}</Tag>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority, record) => (
        <Select
          defaultValue={priority}
          onChange={(value) => changePriority(record._id, value)}
        >
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      ),
    },
    {
      title: "Assign",
      dataIndex: "assigned_to",
      key: "assigned_to",
      render: (assignedTo, record) => (
        <Select
          defaultValue={assignedTo}
          onChange={(value) => assignTask(record._id, value)}
        >
          <Option value="">-- Select User --</Option>
          {user.map((usr) => (
            <Option key={usr._id} value={usr._id}>
              {usr.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <EditOutlined
            style={{ color: "blue", cursor: "pointer", marginRight: 8 }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Table
        columns={columns}
        dataSource={response}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
      />
      <Modal
        title="Edit Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={updateTask}>
            Save
          </Button>,
        ]}
      >
        <Input
          value={updatedTask.title}
          onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
          placeholder="Title"
          style={{ marginBottom: "10px" }}
        />
        <Input
          value={updatedTask.description}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, description: e.target.value })
          }
          placeholder="Description"
          style={{ marginBottom: "10px" }}
        />
        {/* <DatePicker
          value={updatedTask.due_date}
          onChange={(date) => setUpdatedTask({ ...updatedTask, due_date: date })}
          style={{ width: "100%" }}
        /> */}
        <DatePicker
  value={updatedTask.due_date ? moment(updatedTask.due_date, "YYYY-MM-DD") : null}
  onChange={(date) => {
    setUpdatedTask({
      ...updatedTask,
      due_date: date ? date.format("YYYY-MM-DD") : null, // Store as a string in YYYY-MM-DD format
    });
  }}
  style={{ width: "100%" }}
/>
      </Modal>
    </div>
  );
};

export default ViewTask;













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { DOMAIN } from "../UserComponent/config";
// import { Table,  Select,  Popconfirm, message, Tag } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import moment from "moment";

// const { Option } = Select;

// const ViewTask = () => {
// //   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true); // For loading state
//   const [response, setResponse] = useState([]);
//   const [user, setUser] = useState([]);
//   const token = JSON.parse(localStorage.getItem("token"));

//   // Fetch tasks
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const result = await axios.post(`${DOMAIN}task/list`, {}, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setResponse(result.data);
//         setLoading(false);
//       } catch (error) {
//         setResponse([]);
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, [token]);

//   // Fetch users for task assignment
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const result = await axios.post(`${DOMAIN}user/list`, {}, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(result.data);
//       } catch (error) {
//         setUser([]);
//       }
//     };
//     fetchUsers();
//   }, [token]);

//   // Handle delete task
//   const handleDelete = async (task_id) => {
//     try {
//       await axios.post(`${DOMAIN}task/delete`, { task_id }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Task deleted successfully!");
//       setResponse(response.filter((task) => task._id !== task_id));
//     } catch (error) {
//       message.error("Failed to delete task. Please try again.");
//     }
//   };

//   // Change task priority
//   const changePriority = async (task_id, priority) => {
//     try {
//       await axios.post(`${DOMAIN}task/priority`, { task_id, priority }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Priority updated successfully!");
//     } catch (error) {
//       message.error("Failed to update priority. Please try again.");
//     }
//   };

//   // Assign task to user
//   const assignTask = async (task_id, assigned_to) => {
//     try {
//       await axios.post(`${DOMAIN}task/assign`, { task_id, assigned_to }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Task assigned successfully!");
//     } catch (error) {
//       message.error("Failed to assign task. Please try again.");
//     }
//   };



//   //update task

// //   const updateTask = async (task_id, updatedData) => {
// //     try {
// //       await axios.post(`${DOMAIN}task/update`, { task_id, ...updatedData }, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       message.success("Task updated successfully!");
// //     } catch (error) {
// //       message.error("Failed to update the task. Please try again.");
// //     }
// //   };
  

//   // Table columns
//   const columns = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
    
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
     
//     },
//     {
//       title: "Due Date",
//       dataIndex: "due_date",
//       key: "due_date",
//       render: (due_date) => (
//         <span style={{ fontWeight: "bold", color: "#4CAF50" }}>
//           {moment(due_date).format("MMMM Do YYYY")}
//         </span>
//       ),
      
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: 150,
//       render: (status) => {
//         const statusColors = {
//           pending: "red",
//           working: "yellow",
//           completed: "green",
//         };
//         return (
//           <Tag color={statusColors[status] || "default"}>{status}</Tag>
//         );
//       },
//     },
//     {
//       title: "Priority",
//       dataIndex: "priority",
//       key: "priority",
//       width: 150,
//       render: (priority, record) => (
//         <Select
//           defaultValue={priority}
//           onChange={(value) => changePriority(record._id, value)}
//           style={{
//             backgroundColor:
//               priority === "high"
//                 ? "lightcoral"
//                 : priority === "medium"
//                 ? "lightyellow"
//                 : "lightgreen",
//           }}
//         >
//           <Option value="high">High</Option>
//           <Option value="medium">Medium</Option>
//           <Option value="low">Low</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Assign",
//       dataIndex: "assigned_to",
//       key: "assigned_to",
//       width: 200,
//       render: (assignedTo, record) => (
//         <Select
//           defaultValue={assignedTo}
//           onChange={(value) => assignTask(record._id, value)}
//         >
//           <Option value="">-- Select User --</Option>
//           {user.map((usr) => (
//             <Option key={usr._id} value={usr._id}>
//               {usr.name}
//             </Option>
//           ))}
//         </Select>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       width: 100,
//       render: (_, record) => (
//         <Popconfirm
//           title="Are you sure to delete this task?"
//           onConfirm={() => handleDelete(record._id)}
//         >
//           <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
//         </Popconfirm>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <Table
//         columns={columns}
//         dataSource={response}
//         loading={loading} // Show loading spinner while data is loading

//         rowKey="_id"
//         pagination={{ pageSize: 5 }}
//         scroll={{ x: 800 }}
//         bordered
//       />
//     </div>
//   );
// };

// export default ViewTask;











