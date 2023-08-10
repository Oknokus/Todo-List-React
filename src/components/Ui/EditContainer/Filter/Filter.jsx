import PropTypes from 'prop-types';
import { useContext } from 'react';

import { CustumContext } from '../../../../Config/Contex';

import styles from './Filter.module.css';


const Filter = () => {
    const{ 
        search, 
        setSearch }= useContext(CustumContext);

        const changeSearch = (e) => {
            setSearch(e.target.value)
        }
        
    return (
        <div className={styles.filter_container}>
            <input 
                className={styles.container_input}
                onChange={(e) => changeSearch(e)}            
                type="search" placeholder='Введите задачу для поиска' 
                />           
        </div>       
    )
}

export default Filter ;





