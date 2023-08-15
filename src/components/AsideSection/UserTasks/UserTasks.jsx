import PropTypes from 'prop-types';
import { useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';

import { CustumContext } from '../../../Config/Contex';

import AsideOut from '../AsideOut/AsideOut';


import styles from './UserTasks.module.css';


const UserTasks = ({addTasks, user, delTask, logOutUser, changeChechBox}) => {  
    const {
        register,
        handleSubmit,
            formState: {
                errors
        }, watch
    } = useForm({mode: "onblur"});

    const {              
        favoritesCategory,
        activeTaskMenu, 
        setActiveTaskMenu,
        taskName, 
        setTaskName,
        containerTasks, 
        setContainerTasks,
        setComplete,
        complete     
    } = useContext(CustumContext);
          
    const task = user.categories?.find((elem) => {
        if(elem.categoryName === favoritesCategory.categoryName) {  
            setContainerTasks(elem)
    }   else return 
    });

    const trueTaskName = user.categories?.find(category => {
        return category.categoryName === favoritesCategory.categoryName  
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
                                    checked={elem.isComplete ? true : false}
                                    onClick={() => changeChechBox(elem) & setComplete(prev => !prev)}/>
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
                            <form onSubmit={handleSubmit(addTasks)} noValidate>
                            <label>    
                                <span>{errors.errTask && errors.errTask.message}</span> 
                                                         
                                <input {...register("errTask", { 
                                        required : {
                                            message: "Заполните поле",
                                            value: true
                                        },          
                                        validate: value => 
                                        trueTaskName.tasks.find(name => name.taskName === value) && "Такая задача уже есть."
                                        ,                               
                                        maxLength : {
                                            message: "Максимальное число символов 10",
                                            value: 10 
                                        }, 
                                        minLength : {
                                            message: "Минимальное число символов 3",
                                            value: 3
                                        }
                                    })}
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
                                type="submit">
                                Добавить задачу
                            </button>
                            </form>
                    </div>                   
                    <AsideOut logOutUser={logOutUser}/>
            </div>
    )
}

export default UserTasks;