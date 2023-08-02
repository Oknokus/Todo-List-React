import PropTypes from 'prop-types';

import AsideOut from '../AsideOut/AsideOut';


import styles from './UserCategoryFilter.module.css';


const UserCategoryFilter = ({filterCategoryName, setFilterCategoryName, logOutUser}) => {
    

    return (
        <div className={styles.user_categoryFilter}>  
            <h1 key={filterCategoryName.id}>Категории по цвету:</h1>    
                <ul className={styles.container_categoryFilter}>         
                    {
                        filterCategoryName?.map(category =>                             
                                <li
                                    className={styles.categoryFilter_li}                                   
                                    key={category.id}>
                                    <div>
                                        <h1 style={{color:`${category.color}`, marginLeft:"10px"}}>{filterCategoryName.length === 0 ? "Нет категорий этого цвета" : category.categoryName}</h1>       
                                    </div>                                
                                </li>
                        )
                    }
                </ul>
                <AsideOut logOutUser={logOutUser}/>
        </div>
    )
}

export default UserCategoryFilter;