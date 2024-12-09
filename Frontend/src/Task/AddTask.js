
import FieldInput from "../UserComponent/FieldInput"
import st from "../UserComponent/style.module.css";                        // style shett import
import { Col, Container, Row } from "react-bootstrap";
import { task_val } from "./TaskVal";
import { useState } from "react";
import axios from "axios";
import { DOMAIN } from "../UserComponent/config";
import { Link } from "react-router-dom";


const AddTask = (props) => {
    const [request, setRequest] = useState({});

    const [response, setResponse] = useState()
    const manage_request = (obj) => {
        const { id, value } = obj;

        setRequest((request) => {
            request[id] = value;
            return { ...request }

        })

    };

    const token = JSON.parse(localStorage.getItem("token"));

    const add = async () => {

        try {

            const result = await axios.post(`${DOMAIN}task/add`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { data } = result;
            alert("task add successfully")

            console.log("result", result)
            setRequest({})
            return;
        } catch (error) {
            alert("faild login please login again!");
            return;
        }
    };
    return (

        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xl={6} lg={6} md={8}>
                    <div className={st.registration_form}>

                        <FieldInput
                            placeholder="Enter Full Name"
                            id="title"
                            label="Title"
                            err={response}
                            manage_request={manage_request}
                            value={request.title || ""}

                        />


                        <FieldInput
                            placeholder="Enter Full Name"
                            id="due_date"
                            label="Due date"
                            type="date"
                            err={response}
                            manage_request={manage_request}
                            value={request.due_date || ""}

                        />

                        <FieldInput
                            placeholder="Enter Description"
                            id="description"
                            label="Description"
                            err={response}
                            manage_request={manage_request}
                            value={request.description || ""}

                        />



                        <input
                            type="submit"
                            value="Create Task"
                            className={st.form_btn}
                            onClick={() => {
                                const { error } = task_val(request);
                                if (error) {
                                    const err_obj = {};
                                    error.details.forEach((obj) => {
                                        err_obj[obj.path[0]] = obj.message;
                                    });
                                    setResponse(err_obj);

                                } else {
                                    setResponse(null)
                                    add();
                                }

                            }}

                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );


};

export default AddTask; 