import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { DOMAIN } from "./config";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    
    const token = JSON.parse(localStorage.getItem("token"));
    //   console.log("token", token);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.post(
                    `${DOMAIN}user/list`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUsers(result.data); // Assuming the data is an array
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    // Delete user function
    const handleDelete = async (user_id) => {
        try {
            await axios.post(`${DOMAIN}user/remove`, { user_id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Remove deleted user from the state
            setUsers(users.filter(user => user._id !== user_id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Antd table columns configuration
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this user?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Users List</h1>
            <Table
                columns={columns} // Column configuration
                dataSource={users} // Data for the table
                loading={loading} // Show loading spinner while data is loading
                rowKey="_id" // Unique key for each row
                pagination={{ pageSize: 5 }} // Pagination
                style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />
        </div>
    );
};

export default UserList;
