import React from "react";

import { Link } from "react-router-dom";

const Admin_Dashboard = () => {
    // const navigate = useNavigate();
   

    return (
       <>
        <div className="container mt-5">
            <div className="row">
                {/* Create User Card */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">Create User</h5>
                            <p className="card-text">
                                Add a new user.
                            </p>
                            <Link className="btn btn-primary"
                                to="/createuser" > Go to Create User

                            </Link>
                        </div>
                    </div>
                </div>

                {/* Create Task Card */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">Create Task</h5>
                            <p className="card-text">
                                Create a task for users
                            </p>
                          

                            <Link className="btn btn-primary"
                                to="/task" > Go to Create Task

                            </Link>
                        </div>
                    </div>
                </div>

                {/* View Task List Card */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">View Task List</h5>
                            <p className="card-text">
                                See the list of all tasks.
                            </p>
                           
                            <Link className="btn btn-primary"
                                to="/list" > Go to View Task list

                            </Link>
                        </div>
                    </div>
                </div>


                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">View Users</h5>
                            <p className="card-text">
                                View all users list
                            </p>
                          

                            <Link className="btn btn-primary"
                                to='/userlist' > Go to View users 

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
};

export default Admin_Dashboard;
