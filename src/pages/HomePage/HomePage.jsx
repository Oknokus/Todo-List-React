import PropTypes from 'prop-types';
import { Navigate, json } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { CustumContext } from '../../Config/Contex';

import AsideSection from '../../components/AsideSection/AsideSection';


import styles from './HomePage.module.css';


const HomePage = () => {
    const {
        user,
        setUser       
        } = useContext(CustumContext);    
      

        useEffect(() => {  
            if(localStorage.getItem("user") !== null) {
              setUser(JSON.parse(localStorage.getItem("user")))         
            } else {
                return <Navigate to="/register"/>
            }
        },[]) 
    
    return (
        <>  
            <AsideSection/>           
        </>
    )
}
export default HomePage;