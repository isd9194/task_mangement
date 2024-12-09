

import React from "react";
import { useState } from "react";
import FieldInput from "./FieldInput";
import { user_val } from "./Validation/FormValidation";    //joi validation file imaport
import Axios from "axios";                                 // axios for connection node
import {  Link } from 'react-router-dom';
import st from "./style.module.css"
// import st from "./style.module.css";                        // style shett import
import { DOMAIN } from "./config";                          // api link import in congig file
import { useNavigate } from "react-router-dom";             // use navigate for callng routing aumatic
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";


const Registration = (props) => {
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

    //====================node connection========================
    const registration = async () => {
        try {
            const result = await Axios.post(`${DOMAIN}user/registration`, request);
            const { data } = result;
            setResponse(data);
            console.log(result);
        } catch (error) {

            if (error.response && error.response.data && error.response.data.code === 11000) {
                setResponse({ duplicateError: error.response.data });
            }
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
                Error: { err.email}  is already registered.
            </p>
        );
    };
    //=====================================================



    //======= if every thing is ok than automatic rich login page==========
    const show_user = () => {
        const { name } = response?.user_data;
        return (
            <label>
                Hello! {name}, your registration is successful
                {
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000)
                }
            </label>
        );
    };
    //============================================================

    if (response?.user_data) {
        return show_user();
    }

    return (<>
             <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xl={6} lg={6} md={8}>
        <div className={ st.registration_form}><h2>Registration</h2>
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
                value="Register"
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
        <Link to={"/login"}> Go For Login </Link>
        </div>
        </Col>
                </Row>
             </Container>
    </>
    );
};

export default Registration;









