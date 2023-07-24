import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { CustumContext } from '../../Config/Contex';

import AsideSection from '../../components/AsideSection/AsideSection';


import styles from './HomePage.module.css';



const HomePage = () => {
    const {
        user,
        setUser       
        } = useContext(CustumContext);    

    // if(user.length === 0) {
    //     return <Navigate to="/register"/>
    // };
    return (
        <>  
            <AsideSection/>
        </>
    )
}
export default HomePage;