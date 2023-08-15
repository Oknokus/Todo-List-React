import {createContext, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

import dataColors from "./DataColors";
import dataColorsFilter from "./DataColorsFilter";

import axios from "axios";

export const CustumContext = createContext();

export const Context = (props) => {   
    const [newCategeryName, setnewCategeryName] = useState("");
    const [categoryNameChange, setCategoryNameChange] = useState("");    
    const [user, setUser] = useState([]); 
    const [categoryName, setCategoryName] = useState(); 
    const [taskName, setTaskName] = useState(""); 
    const [color, setColor] = useState(dataColors[0]); 
    const [colorFilter, setColorFilter] = useState(dataColorsFilter[0]); 
    const [active, setActive] = useState(false);   
    const [activeTaskMenu, setActiveTaskMenu] = useState(false);     
    const [favoritesCategory, setFavoritesCategory] = useState({}); 
    const [containerTasks, setContainerTasks] = useState({});  
    const [tasksAll, setTasksAll] = useState([]);
    const [showAllCategories, setShowAllCategories] = useState(true); 
    const [showAllTasks, setShowAllTasks] = useState(false); 
    const [showAllFindCategoryColor, setShowAllFindCategoryColor] = useState(false);
    const [complete, setComplete]  = useState(false); 
     
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
            setFavoritesCategory("")                       
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
                setFavoritesCategory("")
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
        
    const updateCategory = () => {          
        let newUserCategories = user.categories?.map((elem) => {
                if (elem.id !== categoryNameChange.id) {
                    return elem;
                }
                return {
                    ...elem,
                    categoryName: newCategeryName
                }
            }
        );        
          
        axios.patch(`http://localhost:8080/users/${user.id}`, {
            categories: newUserCategories
        })
            .then(({data}) => {             
                setUser({
                    ...data,
                    token: useState.token
                })
                localStorage.setItem("user", JSON.stringify({
                    ...data,
                    token: useState.token
                }))
                setFavoritesCategory("");
                setContainerTasks("");
                setnewCategeryName("");
                toast("Категория удалена!!!")
            })
            .catch(err => toast(`Категория не удалена!!!, ${err.message}`))           
    }
      
    const delCategory = (id) => {          
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
                    setFavoritesCategory("")
                    setContainerTasks("")
                    toast("Категория удалена!!!")               
                    })
            .catch(err => toast(`Категория не удалена!!!, ${err.message}`))
    }
     
    
    const value = {        
        user,
        setUser,        
        categoryName,
        setCategoryName,
        newCategeryName, 
        setnewCategeryName,  
        color, 
        setColor,
        colorFilter, 
        setColorFilter,
        active, 
        setActive,
        activeTaskMenu, 
        setActiveTaskMenu,
        setFavoritesCategory, 
        taskName, 
        setTaskName,
        favoritesCategory,
        containerTasks,
        tasksAll, 
        setTasksAll,
        setContainerTasks,
        onSubmit, 
        delCategory,
        showAllTasks, 
        setShowAllTasks,
        showAllCategories, 
        setShowAllCategories,
        updateCategory,
        showAllFindCategoryColor, 
        setShowAllFindCategoryColor,
        categoryNameChange, 
        setCategoryNameChange,
        complete, 
        setComplete    
    }       

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};