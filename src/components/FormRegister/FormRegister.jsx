import {Link, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useContext, useState, useRef } from 'react';

import {CustumContext} from "../../Config/Contex";


import styles from './FormRegister.module.css';


const FormRegister = () => {
    const[passwordView, setPasswordView] = useState(false);

    const {
        register,
        handleSubmit,
            formState: {
                errors
        }, watch
    } = useForm({mode: "onblur"});
   
    const {
        onSubmit,       
        user
    } = useContext(CustumContext);
      
    const location = useLocation();
    const password = useRef();
    password.current = watch("password", "");
    
    return (
        <>
            <div className={styles.register_container}>
                <form className={styles.container_form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <h1 className={styles.container_formTitle}>
                        {
                            location.pathname === "/register" ? "Регистрация" : "Вход"
                        } 
                    </h1>
                        {
                            location.pathname === "/register" ? 
                                <label>
                                    <span>{errors.login && errors.login.message}</span>  

                                    <input {...register("login", {
                                        required : {
                                            message: "Заполните поле",
                                            value: true
                                        },
                                        maxLength : {
                                            message: "Максимальное число символов 10",
                                            value: 10 
                                        }, 
                                        minLength : {
                                            message: "Минимальное число символов 3",
                                            value: 3
                                        }
                                    })}  className={styles.container_formInput} type="text" placeholder='Введите логин'/> 
                                </label>   : ""
                        }                      

                        <label>
                            <span className='login-container__form__errors'>{errors.email && errors.email.message}</span> 

                            <input {...register("email", {
                                required : {
                                    message: "Заполните поле",
                                    value: true
                                },
                                minLength : {
                                    message: "Минимальное число символов 10",
                                    value: 10 
                                }, 
                                pattern : {
                                    message: "Заполните поле правильно",
                                    value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/
                                }                          
                            })}  className={styles.container_formInput} type="email" placeholder='Введите Email'/>
                        </label>   

                        <label>
                            <span>{errors.password && errors.password.message}</span>

                            <input {...register("password", {
                                required : {
                                    message: "Заполните поле",
                                    value: true
                                },
                                minLength : {
                                    message: "Минимальное число символов 10",
                                    value: 10 
                                }, 
                                pattern : {
                                    message: "Парол  должен содержать не мение 8 символов, заглавную букву, число!",
                                    value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
                                }
                            })}  className={styles.container_formInput}  type={passwordView ? "text" : "password"} placeholder='Введите пароль'/>
                                <span 
                                    className={styles.container_inputSpan}
                                    onClick={() => setPasswordView(prev => !prev)}>🗁
                                </span>                             
                        </label> 

                        {
                            location.pathname==="/register" &&                
                            <label className={styles.form_container_label}>
                                <span>{errors.passwordConfirm && errors.passwordConfirm.message}</span> 
                            
                                <input {...register("passwordConfirm", {
                                        validate: value => 
                                        value === password.current || "Пароли не совпадают" }
                                        )} 
                                    className={styles.container_formInput}         
                                    type="password" placeholder="Повторите пароль" /> 
                            </label>
                        }  
   
                        <label>   
                            <button className={styles.container_formBtn} type="submit">
                                {
                                    location.pathname === "/register" ? "Зарегистрироваться" : "Войти"
                                } 
                            </button>
                        </label>

                        <p className={styles.container_formLinkPage}>
                            {
                                location.pathname === "/register" ? 
                                    <>У меня уже есть аккаунт чтобы <Link to="/login" className={styles.container__formLink}>_Войти</Link></> 
                                    : <>Ещё нет аккаунта ? <Link to="/register" className={styles.container__formLink}>_Зарегистрироваться</Link></>
                            }
                        </p>
                </form>                
            </div>
        </>
    )
};

export default FormRegister;