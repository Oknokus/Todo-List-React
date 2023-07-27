import PropTypes from 'prop-types';


import styles from './UserTasksAll.module.css';


const UserTasksAll = ({tasksAll, delTask}) => {    
    
    return (  
        <>
            {/* <ul className={styles.userTasksAll_container}>                                        
                {
                tasksAll.categoryName.map(elem => 
                    <li 
                        className={styles.container_taskItem}
                        key={elem.id}>
                        <div className={styles.container_taskItemTitle}>
                            <h2>-{elem.categoryName}</h2>
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
            </ul>  */}
        </>
    )
}

export default UserTasksAll;


