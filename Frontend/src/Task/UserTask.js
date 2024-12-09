

import { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN } from "../UserComponent/config";
import { Table, Select, message } from "antd";
import moment from "moment"; // For date formatting
// import { useSelector } from "react-redux";

const { Option } = Select;

const UserTask = () => {
//  const { token } =  useSelector((state)=>state.A_login);
  const [request] = useState({});
  const [response, setResponse] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await axios.post(`${DOMAIN}task/userTask`, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResponse(result.data);
      } catch (error) {
        setResponse([]);
      }
    };

    fetchTasks();
  }, [token]);

  // Function to update task status
  const handleStatusChange = async (task_id, status) => {
    try {
      await axios.post(
        `${DOMAIN}task/status`,
        { task_id, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Status Changed successfully!");
    } catch (error) {
      message.error("Failed to change status. Please try again.");
    }
  };

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
          {moment(due_date).format("MMMM Do YYYY, h:mm:ss a")}
        </span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        let priorityStyle = {};
        switch (priority) {
          case "low":
            priorityStyle = {
              backgroundColor: "lightgreen",
              color: "green",
            };
            break;
          case "medium":
            priorityStyle = {
              backgroundColor: "yellow",
              color: "orange",
            };
            break;
          case "high":
            priorityStyle = {
              backgroundColor: "red",
              color: "white",
            };
            break;
          default:
            priorityStyle = {
              backgroundColor: "white",
              color: "black",
            };
        }
        return (
          <span
            style={{
              ...priorityStyle,
              fontWeight: "bold",
              padding: "5px 10px",
              borderRadius: "5px",
              textTransform: "capitalize",
            }}
          >
            {priority}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record._id, value)}
        >
          <Option value="pending">Pending</Option>
          <Option value="working">Working</Option>
          <Option value="completed">Completed</Option>
        </Select>
      ),
    },
  ];

  if (!response.length) return <div>No tasks found</div>;

  return (
    <div className="justify-content-center  p-3">
      <Table
        columns={columns}
        dataSource={response}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default UserTask;











// import { useEffect, useState } from "react";
// import axios from "axios";
// import { DOMAIN } from "../UserComponent/config";

// const UserTask = () => {
//     const [request] = useState({});
//     const [response, setResponse] = useState([]);
   
//     const token = JSON.parse(localStorage.getItem("token"));


//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const result = await axios.post(`${DOMAIN}task/userTask`, request, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setResponse(result.data);
//             } catch (error) {
//                 setResponse([]);

//             }
//         };

//         fetchTasks();
//     }, [token]);

//     //_________________________________________-calling assign to api _______________________________
//     const status = async (task_id, status) => {

//         try {
//                await axios.post(
//                 `${DOMAIN}task/status`,
//                 { task_id, status },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             // console.log("Task assigned successfully:", result.data);
//             alert("Status Changed successfully!");


//         } catch (error) {
//             // console.error("Error assigning task:", error);
//             alert("Failed to Change status. Please try again.");
//             return;
//         }
//     };


//     //_________________________________________________________________________________________________

//     if (!response.length) return <div>No tasks found</div>;
//     //__________________________________________________________________________________________
//     return (
//         <div className="justify-content-center w-75 p-3">
//             <table className="table table-bordered table-striped">
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Due Date</th>
//                         <th>Priority</th>
//                         <th>Status</th>

//                     </tr>
//                 </thead>
//                 <tbody>
//                     {response.map((task) => (
//                         <tr key={task._id}>
//                             <td>{task.title}</td>
//                             <td>{task.description}</td>
//                             <td>{task.due_date}</td>
//                             <td style={{
//                                 fontWeight:'bold',
//                                 backgroundColor:
//                                     task.priority === "low"
//                                         ? "lightgreen"
//                                         : task.priority === "medium"
//                                             ? "yellow"
//                                             : task.priority === "high"
//                                                 ? "red"
//                                                 : "white",
//                             }}>{task.priority}</td>

//                             <td>
//                                 <select
//                                     onChange={(e) => {
                                       
//                                         status(task._id, e.target.value)
//                                     }}
//                                 >
//                                     <option value="completed" selected={task.status === "completed"}>
//                                         Completed
//                                     </option>
//                                     <option value="working" selected={task.status === "working"}>
//                                         Working
//                                     </option>
//                                     <option value="pending" selected={task.status === "pending"}>
//                                         Pending
//                                     </option>
//                                 </select>
//                             </td>


//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )

//     //____________________________________________________________________________________    
// };

// export default UserTask; 