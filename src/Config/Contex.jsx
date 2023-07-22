import {createContext, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "./Api";
import axios from "axios";

export const CustumContext = createContext();

export const Context = (props) => {   
    const [user, setUser] = useState([]);   

    const navigate = useNavigate();
    const location = useLocation();

    const registerUser = (data) => {                        
        axios.post("http://localhost:8080/register", {
            ...data                   
        }).then(res => {                          
            setUser({
                    token: res.data.accessToken,
                    ...res.data.user
                })  
            localStorage.setItem("user", JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            })) 
            navigate("/");                       
        })
        .catch(err => console.log(err))                           
    };

    const loginUser = (data) => {           
        axios.post("http://localhost:8080/login", {
            ...data
        })
            .then(res => {
                setUser({
                    token: res.data.accessToken,
                    ...res.data.user
                })  
                localStorage.setItem("user", JSON.stringify({
                    token: res.data.accessToken,
                    ...res.data.user
                }))
                navigate("/");
            })
            .catch(err => console.log(err))
    };

    const onSubmit = (data) => { 
        if(data || location.pathname === "/register") {
            let dataFetch = {
                "email": data.email,
                "password": data.password,
                "login": data.login               
            }           
            location.pathname === "/register" ?  registerUser(dataFetch) : loginUser(data)
        }        
    };
 
    const value = {        
        user,
        onSubmit
    }       

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};