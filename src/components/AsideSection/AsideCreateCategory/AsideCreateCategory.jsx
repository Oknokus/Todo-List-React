import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CustumContext } from '../../../Config/Contex';

import dataColors from "../../../Config/DataColors";
import Filter from '../../Ui/EditContainer/Filter/Filter';
import ButtonSizes from '../../Ui/EditContainer/Button/Button';

import styles from './AsideCreateCategory.module.css';


const AsideCreateCategory = ({subMit, addCategory, allTasks}) => {
    const [activeTask, setActiveTask]  = useState(false);
    const {        
        categoryName,
        setColor,
        color,        
        editCategoryName,
        delCategory,
        active,
        setActive,
        newCategeryName, 
        setnewCategeryName,
        user, 
        setUser,
        setFavoritesCategory,
        favoritesCategory
    } = useContext(CustumContext);        
    
    return (
        <div className={styles.aside_containerCreate}>  
            <h1 key={user.id}>Привет {user.login}</h1> 
           
                <div 
                    className={styles.containerCreate_tasksAll}  
                    onClick={() => setActive(true)}>➕ Добавить категорию
                </div> 
                <ButtonSizes allTasks={allTasks} id={user.id}/>
                <Filter/>   
                   
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
                                    <div 
                                        className={styles.containerCreate_editorColorsActive} 
                                        onClick={() => setColor(elem)}                                     
                                        key={elem} style={{background: elem, border: color === elem ? "4px solid black" : "none"}}>
                                    </div>)}
                            </div>

                            <button 
                                className={styles.containerCreate_editorBtn}
                                onClick={() => addCategory() && setActive(false)} >
                                Добавить
                            </button>
                    </div>
                    
                    <div className={styles.containerCreate_tasks}>
                        <ul style={{marginTop: "50px"}}>                                    
                            {
                                user.categories.map(el => 
                                    <>    
                                        <li 
                                            className={styles.containerCreate_taskTitle} 
                                            onClick={() => setFavoritesCategory(el)}                                          
                                            key={el.id}>

                                            <div onClick={() => setActiveTask(true)}>📝</div>                                                
                                            <div className={styles.containerCreate_taskColor} style={{backgroundColor: el.color}}></div>
                                            
                                            <h5>{el.categoryName}</h5>                                            
                                            
                                            <span 
                                                className={styles.containerCreate_taskClose}
                                                onClick={() => delCategory(el.id)}>✖️
                                            </span>
                                        </li>  
                                      
                                        {
                                            activeTask ? 
                                            <>
                                                <div style={{display: activeTask ? "block" : "none"}}  className={styles.containerCreate_editorTitle}>
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

                                                    <button 
                                                        className={styles.containerCreate_editorBtn}
                                                        onClick={() => setActiveTask(false)}>
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