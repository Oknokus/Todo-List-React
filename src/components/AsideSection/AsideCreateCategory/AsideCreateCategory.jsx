import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { CustumContext } from '../../../Config/Contex';

import dataColors from "../../../Config/DataColors";
import Filter from '../../Ui/EditContainer/Filter/Filter';
import ButtonSizes from '../../Ui/EditContainer/Button/Button';

import styles from './AsideCreateCategory.module.css';


const AsideCreateCategory = ({subMit, addCategory, selectCategories, selectTasks, findCategoryColor}) => { 
   
    const [activeTask, setActiveTask]  = useState(false);
    const {        
        categoryName,
        setColor,
        color, 
        delCategory,
        active,
        setActive,       
        user,
        updateCategory,
        newCategeryName, 
        setnewCategeryName,
        colorFilter, 
        setColorFilter,
        categoryNameChange, 
        setCategoryNameChange 
    } = useContext(CustumContext);  
  
            
    return (
        <div className={styles.aside_containerCreate}>  
            <h1 key={user.id}>Привет {user.login}</h1> 
           
                <div 
                    className={styles.containerCreate_tasksAll}  
                    onClick={() => setActive(true)}>➕ Добавить категорию
                </div> 

                <h3 styles={{marginTop:"40px"}} className={styles.containerCreate_ColorsFilter}>Категории по цвету:</h3>
                <div className={styles.containerCreate_editorColorsAside}>
                
                                {dataColors.map((elem, index) => 
                                    <div 
                                        className={styles.containerCreate_editorColorsActive}
                                        onClick={() => setColorFilter(elem) & findCategoryColor(elem)}
                                        key={index} style={{background: elem, border: colorFilter === elem ? "4px solid black" : "none"}}>
                                    </div>)}
                </div>
                <ButtonSizes selectTasks={selectTasks}/>
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
                                {dataColors.map((elem, index) => 
                                    <div 
                                        className={styles.containerCreate_editorColorsActive} 
                                        onClick={() => setColor(elem)}                                     
                                        key={index} style={{background: elem, border: color === elem ? "4px solid black" : "none"}}>
                                    </div>)}
                            </div>

                            <button 
                                className={styles.containerCreate_editorBtn}
                                onClick={() => addCategory() & setActive(false)} >
                                Добавить
                            </button>
                    </div>
                    
                    <div className={styles.containerCreate_tasks}>
                        <ul style={{marginTop: "50px"}}>                                    
                            {
                                user.categories?.map(el => 
                                    <>    
                                        <li 
                                            className={styles.containerCreate_taskTitle} 
                                            onClick={() => selectCategories(el)}                                          
                                            key={el.id}>

                                            <div onClick={() => setActiveTask(true) & setCategoryNameChange(el)}>📝</div>                                                
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
                                                        onClick={() => updateCategory() & setActiveTask(false)}>
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