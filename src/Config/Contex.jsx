import {createContext, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

import dataColors from "./DataColors";

import axios from "axios";

export const CustumContext = createContext();

export const Context = (props) => {   
    const [user, setUser] = useState([]);    
    const [categoryState, setCategoryState] = useState("");
    const [categoryName, setCategoryName] = useState(); 
    const [taskName, setTaskName] = useState(""); 
    const [color, setColor] = useState(dataColors[0]); 
    const [active, setActive] = useState(false);   
    const [activeTaskMenu, setActiveTaskMenu] = useState(false); 
    const [newCategeryName, setnewCategeryName] = useState(""); 
    const [favoritesCategory, setFavoritesCategory] = useState({}); 
    const [containerTasks, setContainerTasks] = useState({});  
    

    const navigate = useNavigate();
    const location = useLocation();
  
    const registerUser = (data) => {                        
        axios.post("http://localhost:8080/register", {
            ...data,
            "categories": []                  
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

    // const editCategoryName = (el) => { 
    //     let newUserCategoryName = user.categories.map((elem) => {                
    //         if(elem.categoryName === el.categoryName) {                
    //             return ({...elem, categoryName: newCategeryName})
    //         } else {
    //             return {...elem,  categoryName: elem.categoryName}
    //         }})              

    //             localStorage.setItem("user", JSON.stringify({                    
    //                 newUserCategoryName
    //             })) 
    //         }                              
              

    const delTask = (id) => {          
            let newUserCategories = user.categories.filter((elem) => 
            elem.id !== id);   
            
            axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newUserCategories})
                .then(({data}) => {
                    setUser({
                        ...data,
                        token: useState.token
                    }) 
                    localStorage.setItem("user", JSON.stringify({
                        ...data,
                        token: useState.token
                    }))  
                    toast("Категория удалена!!!")
                })
                .catch(err => toast(`Категория не удалена!!!, ${err.message}`))
    }

 
    const value = {        
        user,
        setUser, 
        setCategoryState,       
        categoryName,
        setCategoryName,
        newCategeryName, 
        setnewCategeryName,  
        color, 
        setColor,
        active, 
        setActive,
        activeTaskMenu, 
        setActiveTaskMenu,
        setFavoritesCategory, 
        taskName, 
        setTaskName,
        favoritesCategory,
        containerTasks, 
        setContainerTasks,
        onSubmit, 
        delTask     
        // editCategoryName
    }       

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};