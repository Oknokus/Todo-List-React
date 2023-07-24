import PropTypes from 'prop-types';
import { useContext } from 'react';

import { CustumContext } from '../../../Config/Contex';


import styles from './UserTasks.module.css';



const UserTasks = () => {
    const { 
        user 
    } = useContext(CustumContext); 
    return (        
        <>       
        </>
    )
}
export default UserTasks;