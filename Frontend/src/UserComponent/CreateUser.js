

import React from "react";
import { useState } from "react";
import FieldInput from "./FieldInput";
import { user_val } from "./Validation/FormValidation";    //joi validation file imaport
import Axios from "axios";                                 // axios for connection node
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import st from "./style.module.css";                        // style shett import
import { DOMAIN } from "./config";                          // api link import in congig file
import { useNavigate } from "react-router-dom";             // use navigate for callng routing aumatic
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";



const CreateUser = (props) => {
    const navigate = useNavigate();                        // use navigate return a fuction
    const [request , setRequest] = useState({});                        // State that stored a object which is user input data
    const [response, setResponse] = useState(null);        // state stored backend npm stored data 
    const [Err, setError] = useState(null);                // mongoose err stored in state

    const manage_request = (obj) => {                      // funtion is storing data in state which data user input
        const { id, value } = obj;
        setRequest((request)=>{
            request[id] = value ;
            return {...request}
        })
    };
    const token = JSON.parse(localStorage.getItem("token"));

    //====================node connection========================
    const registration = async () => {
        try {
            const result = await Axios.post(`${DOMAIN}user/create`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { data } = result;
            setResponse(data);
            alert("user created successfully")
             setRequest({})
        } catch (error) {

            alert("faild login please login again!");
            return ;
        }
    };

    //=====check error in backend joi error then showing it on dom===========
    const show_error = () => {
        const { details } = response;
        const err = details.map(({ message }) => {
            return <p key={message}>{message}</p>;
        });
        return err;
    };
    //===========mongoose duplicate key error=====================
    const duplicate_key = () => {
        const err = response?.duplicateError?.keyValue
        return (
            <p style={{ color: "red" }}>
                Error: {err.email}  is already registered.
            </p>
        );
    };
    //=====================================================




    //============================================================

    if (response?.user_data) {
        // alert("user created successfully")
        setResponse({})
    }
    if(!token)
        {
           console.log("i am in token")
       navigate("/login")
   
       }
   

    return (<>
           

        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xl={6} lg={6} md={8}>
                    <div className={st.registration_form}>
                        <hr></hr>
                        {response?.details ? show_error() : ""}
                        {response?.duplicateError ? duplicate_key() : ""}

                        <FieldInput

                            placeholder="Enter Full Name"
                            id="name"
                            manage_request={manage_request}
                            err={Err}
                            label="Name"
                            value={request.name || ""}
                        />


                        <FieldInput
                            placeholder="Enter Email"
                            id="email"
                            manage_request={manage_request}
                            type="email"
                            err={Err}
                            label="Email"
                            value={request.email || ""}
                        />

                        <FieldInput
                            placeholder="Enter Password"
                            id="password"
                            manage_request={manage_request}
                            type="password"
                            err={Err}
                            label="Password"
                            value={request.password || ""}
                        />

                        <FieldInput
                            placeholder="Enter Confirm Password"
                            id="confirm_password"
                            manage_request={manage_request}
                            type="password"
                            err={Err}
                            label="Retype Password"
                            value={request.confirm_password || ""}
                        />



                        <input
                            type="submit"
                            value="Create User"
                            className={st.form_btn}
                            onClick={() => {
                                const { error } = user_val(request);
                                if (error) {
                                    const err_obj = {};
                                    // console.log(error.details)
                                    error.details.forEach((obj) => {
                                        err_obj[obj.path[0]] = obj.message;
                                    });
                                    setError(err_obj);
                                } else {
                                    setError(null)
                                    registration();
                                }
                            }}
                        /><br></br><br></br>

                    </div>
                </Col>
            </Row>
        </Container>
    </>
    );
};

export default CreateUser;









