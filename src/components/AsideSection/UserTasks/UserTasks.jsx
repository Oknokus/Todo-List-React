import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import { CustumContext } from '../../../Config/Contex';

import AsideOut from '../AsideOut/AsideOut';


import styles from './UserTasks.module.css';


const UserTasks = ({addTasks, user, delTask, logOutUser}) => {  
    const {              
        favoritesCategory,
        activeTaskMenu, 
        setActiveTaskMenu,
        taskName, 
        setTaskName,
        containerTasks, 
        setContainerTasks       
    } = useContext(CustumContext);
          
    const task = user.categories.find((elem) => {
        if(elem.categoryName === favoritesCategory.categoryName) {  
            setContainerTasks(elem)
    }   else return 
    });
   
    return ( 
            <div className={styles.usertasks_container}>  
            <h1 key={favoritesCategory.id}>Выбрана категория: {favoritesCategory.categoryName}</h1>             
                           
            {
                favoritesCategory ?
                <> 
                <span 
                    className={activeTaskMenu ? styles.container_tasksAll : styles.container_tasksAll}
                    onClick={() => setActiveTaskMenu(true)}>
                        ➕Добавить задачу
                </span> 

                <h2 className={styles.container_taskTitle}>Задачи</h2>
                </>
             : "" 

            }
                <ul className={styles.container_content}>                                        
                    {
                        containerTasks.tasks?.map(elem => 
                            <li 
                                className={styles.container_taskItem}
                                key={elem.id}>
                                <div className={styles.container_taskItemTitle}>
                                    <h2>-{elem.taskName}</h2>
                                    <input type="checkbox" 
                                    value={elem.isComplete}/>
                                    <span
                                        onClick={() => delTask(elem.id)}>
                                        ✖️
                                    </span>                                    
                                </div>                                
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
                    <AsideOut logOutUser={logOutUser}/>
            </div>
    )
}

export default UserTasks;