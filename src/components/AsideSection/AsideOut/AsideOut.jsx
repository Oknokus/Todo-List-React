import PropTypes from 'prop-types';


import styles from './AsideOut.module.css';


const AsideOut = ({logOutUser}) => {
    return (
        <button 
                className={styles.aside_containerOut}
                onClick={logOutUser}>
                    Выйти
        </button>
    )
};

AsideOut.propTypes ={
    logOutUser:PropTypes.func 
};

export default AsideOut;