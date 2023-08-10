import PropTypes from 'prop-types'
import { useContext } from 'react';

import { CustumContext } from '../../../Config/Contex';

import AsideOut from '../AsideOut/AsideOut';


import styles from './UserTasksAll.module.css';


const UserTasksAll = ({categories, logOutUser}) => {   
    return (
        <div className={styles.userTasksAll_container}>  
            <h1 key={categories.id}>Все задачи:</h1>    
                <ul>         
                    {
                        categories.map(category => {
                            return category.tasks.map(task => {
                                return <li 
                                            className={styles.container_taskItem}
                                            key={task.taskName}>
                                            <div>
                                                <h2 className={styles.container_taskItemTitle}>-{task.taskName}</h2>       
                                            </div>                                
                                        </li>
                            })
                        })
                    }
                </ul>
                <AsideOut logOutUser={logOutUser}/>
        </div>
    )
}

export default UserTasksAll;




