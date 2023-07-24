import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CustumContext } from '../../../Config/Contex';

import dataColors from "../../../Config/DataColors";

import styles from './AsideCreateCategory.module.css';


const AsideCreateCategory = ({subMit, addCategory}) => {
    const [activeTask, setActiveTask]  = useState(false)

    const {        
        categoryName,
        setColor,
        color,        
        editCategoryName,
        delTask,
        active,
        setActive,
        newCategeryName, 
        setnewCategeryName,
        user, 
        setUser
    } = useContext(CustumContext);           
    return (
        <div className={styles.aside_containerCreate}>  
            <h1>Привет {user.login}</h1>             
                <span 
                    className={active ? styles.containerCreate_tasksAll : styles.containerCreate_tasksAll}  
                    onClick={() => setActive(true)}>➕Добавить категорию
                </span>                
               
                    <div style={{display: active ? "block" : "none"}}  className={styles.containerCreate_editor}>
                            <label>                             
                                <input 
                                    value={categoryName} onChange={(e) => subMit(e)}
                                    className={styles.containerCreate_editorInput} type="text" placeholder='Название категории' />
                            </label>
                            <span 
                                className= {styles.containerCreate_editorClose}
                                onClick={() => setActive(false)}>
                                    ✖️
                            </span>

                            <div className={styles.containerCreate_editorColors}>
                                {dataColors.map(elem => 
                                    <span 
                                        className={styles.containerCreate_editorColorsActive} 
                                        onClick={() => setColor(elem)}                                     
                                        key={elem} style={{background: elem, border: color === elem ? "4px solid black" : "none"}}>
                                    </span>)}
                            </div>

                            <button 
                                className={styles.containerCreate_editorBtn}
                                onClick={() => addCategory()} >
                                Добавить
                            </button>
                    </div>
                    
                    <div className={styles.containerCreate_tasks}>
                        <ul>                                    
                            {
                                user.categories.map(el => 
                                    <>    
                                        <li 
                                            className={styles.containerCreate_taskTitle}
                                            key={el.id}>

                                            <div onClick={() => setActiveTask(true)}>📝</div>                                                
                                            <div className={styles.containerCreate_taskColor} style={{backgroundColor: el.color}}></div>
                                            
                                            {el.categoryName}                                            
                                            
                                            <div 
                                                className={styles.containerCreate_taskTitle}
                                                onClick={() => delTask(el.id)}>🗑️
                                            </div>
                                        </li>  
                                      
                                        {
                                            activeTask ? 
                                            <>
                                                <div style={{display: activeTask ? "block" : "none"}}  className={styles.containerCreate_editor}>
                                                    <label>                             
                                                        <input                                    
                                                            className={styles.containerCreate_editorInput} type="text" placeholder='Название категории'                                                            
                                                            value={newCategeryName}
                                                            onChange={(e) => setnewCategeryName(e.target.value)}/>
                                                    </label>
                                                    <span 
                                                        className= {styles.containerCreate_editorClose}
                                                        onClick={() => setActiveTask(false)}>
                                                            ✖️
                                                    </span>                           

                                                    <button onClick={() => setActiveTask(false)}>
                                                        Применить
                                                    </button>
                                                </div>
                                            </> : ""
                                        }                                       
                                    </>                                                    
                                )
                            }
                        </ul> 
                    </div>                    
        </div> 
    )
};


export default AsideCreateCategory;