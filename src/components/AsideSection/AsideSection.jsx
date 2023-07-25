import {useContext, useState} from 'react';

import { CustumContext } from '../../Config/Contex';
import {v4 as uuidv4} from 'uuid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// import AsideMenu from "./AsideMenu";
import AsideCreateCategory from "./AsideCreateCategory";
import UserTasks from './UserTasks/UserTasks';
import AsideOut from './AsideOut/AsideOut';


import styles from "./AsideSection.module.css";


const AsideSection = () => { 
    const navigate = useNavigate();
    const {
        user,
        setUser,        
        setCategoryName,
        categoryName,       
        color,
        active,
        setActive,
        taskName, 
        setTaskName,
        favoritesCategory                  
        } = useContext(CustumContext);
     
        const addCategory = () => {         
            let newCategory = {
                    categoryName: categoryName,
                    id: uuidv4(),
                    color,
                    tasks: []            
            };
    
            const localUserState = JSON.parse(localStorage.getItem("user")) ; 
                axios.patch(`http://localhost:8080/users/${user.id}`, { 
                    categories: [
                        ...user.categories,
                        newCategory
                    ]})  
                .then(({data}) => {  
                    setUser({
                        ...data,
                        token: user.token
                    });        
                    localStorage.setItem("user", JSON.stringify({
                        ...data,
                        token: user.token
                    }));           
                    setActive(false);
                    setCategoryName("");                  
                }).catch(err => toast(`Категория не добавлена!!!, ${err.message}`))       
            };

            const subMit = (e) => {                
                setCategoryName(e.target.value);
            };

            const addTasks = () => {
                let newTask = { 
                taskName: taskName,     
                id: uuidv4(),
                isComplete: false
            };       
                let task = user.categories.map((elem) => {
                    if(elem.categoryName === favoritesCategory.categoryName) {                
                        return ({...elem, tasks: [...elem.tasks, newTask]})
                    } else {
                        return elem
                    }
                });                    
            axios.patch(`http://localhost:8080/users/${user.id}`, {            
                    categories: [                                      
                       ...task,                             
                    ]})  
                .then(({data}) => {                      
                    setUser({
                        ...data                                     
                    });
                    localStorage.setItem("user", JSON.stringify({
                        ...data                           
                    }))
                    setTaskName("");
                    toast("Задача добавлена!!!")
                }).catch(err => toast(`Задача не добавлена!!!, ${err.message}`))              
            };

            const delTask = (id) => { 
                let newCategory = user.categories.map((elem) => {
                    if(elem.categoryName === favoritesCategory.categoryName) {                
                        return ({...elem, tasks: elem.tasks.filter(el => el.id !== id)})
                    } else {
                        return elem
                    }
                });             
                              
                axios.patch(`http://localhost:8080/users/${user.id}`, {
                    categories: [
                        ...newCategory
                    ]                 
                })
                    .then(({data}) => {                                      
                            setUser({
                                ...data
                            });            
                            localStorage.setItem("user", JSON.stringify({
                                ...data,
                                tasks: [
                                    newCategory
                                ]                
                            }))                         
                        toast("Задача удалена!!!")
                    })
                    .catch(err => toast(`Задача не удалена!!!, ${err.message}`))
            };

            const logOutUser = () => {
                localStorage.removeItem("user");
                setUser([]);
                navigate("/login")
            };
                
     return (
        <div className={styles.asideSection_container}>
            <AsideCreateCategory subMit={subMit} addCategory={addCategory} setActive={setActive} active={active}/>
            <UserTasks addTasks={addTasks} delTask={delTask} user={user} logOutUser={logOutUser}/>            
        </div>        
    )
};

export default AsideSection;