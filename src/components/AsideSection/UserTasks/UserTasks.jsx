import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import { CustumContext } from '../../../Config/Contex';


import styles from './UserTasks.module.css';


const UserTasks = ({addTasks, user}) => {  
    const {        
        setFavoritesCategory, 
        favoritesCategory,
        activeTaskMenu, 
        setActiveTaskMenu,
        taskName, 
        setTaskName,
        containerTasks, 
        setContainerTasks       
    } = useContext(CustumContext);
    
   if(favoritesCategory) {
    let task = user.categories.filter((elem) => {
        if(elem.categoryName === favoritesCategory.categoryName) {  
            setContainerTasks(elem)
    }})
    } 
       
    return ( 
            <div className={styles.usertasks_container}>  
            <h1 key={favoritesCategory.id}>Выбрана категория: {favoritesCategory.categoryName}</h1>             
                <span 
                    className={activeTaskMenu ? styles.container_tasksAll : styles.container_tasksAll}
                    onClick={() => setActiveTaskMenu(true)}>
                        ➕Добавить задачу
                </span>
                <ul className={styles.container_content}>
                    <h2 className={styles.container_taskTitle}>Задачи</h2>   
                    {
                        containerTasks && containerTasks.tasks.map(elem => 
                            <li 
                                className={styles.container_taskItem}
                                key={elem.id}>
                                <h2>-{elem.taskName}</h2>
                                <input type="checkbox" 
                                value={elem.isComplete}/>
                            </li>
                        ) 
                    }                                
                </ul>
                               
               
                    <div style={{display: activeTaskMenu ? "block" : "none"}}  className={styles.container_editor}>
                            <label>                             
                                <input
                                className={styles.container_editorInput} type="text" placeholder='Введите название задачи' 
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}/>
                            </label>
                            <span 
                                className= {styles.container_editorClose}
                                onClick={() => setActiveTaskMenu(false)}>
                                    ✖️
                            </span>

                            <button 
                                className={styles.container_editorBtn}
                                onClick={() => addTasks() & setActiveTaskMenu(false)}>
                                Добавить задачу
                            </button>
                    </div>
            </div>
    )
}

export default UserTasks;