import PropTypes from 'prop-types';
import { useContext } from 'react';

import { CustumContext } from '../../../Config/Contex';
import { Navigate } from 'react-router-dom';


import styles from './AsideMenu.module.css';


const AsideMenu = () => { 
    return (
        <>
            <div 
                className={styles.aside_container}>               
                <span className='container-container__tasksAll'>
                    📝Все категории
                </span>
            </div>

            <ul className={styles.container_menu}>   
                {   
                    (user.length === 0) ? (<Navigate to="/regiter"/>) :
                        user.categories.map(elem => (               
                            <li 
                                    key={elem.id}                            
                                    onClick={() => {setStatus(elem); setAll(false)}}>                  
                                <div className={styles.container_menuLi}>                       
                                    <span className={styles.container_menuLiColor}></span>
                                    <span className={styles.container_containerTasks}></span>
                                    <span 
                                        className={styles.container_menuLiDel}>✖️</span>
                                </div>
                            </li>
                ))}    
            </ul>
        </>
    )
};


export default AsideMenu;