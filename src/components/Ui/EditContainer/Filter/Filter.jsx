import PropTypes from 'prop-types';


import styles from './Filter.module.css';


const Filter = () => {
    return (
        <div className={styles.filter_container}>
            <input 
                className={styles.container_input}  
                                                                     
                type="search" placeholder='Введите задачу для поиска' 
                />           
        </div>       
    )
}

export default Filter ;





