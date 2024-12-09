import { useState } from "react";
import FieldInput from "./FieldInput"
import st from "./style.module.css"
import { LoginVlidation } from "./Validation/LoginVlidation";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { DOMAIN } from "./config";
import { useDispatch } from "react-redux";
import { AfterLogin } from "../Redux_store/AfterLogin";



const MyLogin = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [request ,setRequest] = useState({});
    const [response, setResponse] = useState()
    const manage_request = (obj) => {

        const { id, value } = obj;
        setRequest((request)=>{
            request[id] = value ;
            return {...request}
        })
    };

    const login = async () => {
        try {
           
              const result = await axios.post(`${DOMAIN}user/login` ,request);
            const { data } = result;
            setResponse(data);
            
           if(data?.token){
                let token = data.token ;
                token = JSON.stringify(token);
                localStorage.setItem("token" , token);

                
                data.data.role === "user" ?  dispatch(AfterLogin({Role :"user" })) : navigate("/login")
                data.data.role === "admin" ?  dispatch(AfterLogin({Role :"admin"})): navigate("/login")
                 if(data.data.role==="admin"){ return navigate("/Admin_dashboard")}
                if(data.data.role==="user"){return navigate("/usertask")}
           }

            
        } catch (error) {
            setResponse(error?.response?.data);
            console.log(error)
            // console.log(error.response.data)
        }
    };
    // token saving in local storage for future usage

    //=================================
    const mongoose_err = () => {
        return <p style={{ color: "red" }}>{response}</p>
    };

    return (
        <>
            <div className={st.Main_form}>
                <h2>Login</h2>
                <hr></hr>
                {response === "invalid email or password" ? mongoose_err() : ""}
                <FieldInput
                    placeholder="Enter Email id"
                    id="email"
                    value={request.email || ""}

                    err={response}
                    manage_request={manage_request}
                />

                <FieldInput
                    placeholder="Pssword"
                    id="password"
                    type="password"
                    err={response}
                    manage_request={manage_request}
                    value={request.password || ""}

                />
                {/* <Link hrefLang="#">Forgot Password</Link> */}
                  <br></br>
                  
                <input
                    type="submit"
                    value="Login"
                    className={st.form_btn}
                    onClick={() => {
                        const { error } = LoginVlidation(request);
                        //   console.log(error.details);
                        if (error) {
                            const err_obj = {};
                            error.details.forEach((obj) => {
                                err_obj[obj.path[0]] = obj.message;
                            });
                            setResponse(err_obj);

                        } else {
                            setResponse(null)
                            login();
                        }
                    }
                    } />
                
            </div>

        </>
    );


};


export default MyLogin; 