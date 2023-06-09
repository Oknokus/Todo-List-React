import {Link, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useContext } from 'react';

import {CustumContext} from '../../hookHelper/Context';


import './FormRegister.scss';


const FormRegister = () => {
    const {
        onSubmit
    } = useContext(CustumContext);
    
    const location = useLocation();
   
    const {
        register,
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"});
       
    return (
        <>
            <div className="register-container">
                <form className='register-container__form' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <h1 className='register-container__form__title'>
                        {
                            location.pathname === "/register" ? "Регистрация" : "Вход"
                        } 
                    </h1>
                        {
                            location.pathname === "/register" ? 
                                <label className='register-container__form__label'>
                                    <span className='login-container__form__errors'>{errors.login && errors.login.message}</span>  

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
                                    })}  className='register-container__form__input' type="text" placeholder='Введите логин'/> 
                                </label>   : ""
                        }                      

                        <label className='register-container__form__label'>
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
                            })}  className='register-container__form__input' type="email" placeholder='Введите Email'/>
                        </label>   

                        <label className='register-container__form__label'>
                            <span className='login-container__form__errors'>{errors.password && errors.password.message}</span>

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
                            })}  className='register-container__form__input' type="password" placeholder='Введите пароль'/>
                        </label>   
   
                            
                        <button className='register-container__form__btn' type="submit">
                            {
                                location.pathname === "/register" ? "Зарегистрироваться" : "Войти"
                            } 
                        </button>

                        <p className='register-container__form__p'>
                            {
                                location.pathname === "/register" ? 
                                    <>У меня уже есть аккаунт чтобы <Link to="/login" className='register-container__form__link'>войти</Link></> 
                                    : <>Ещё нет аккаунта ? <Link to="/register" className='register-container__form__link'>Зарегистрироваться</Link></>
                            }
                        </p>
                </form>                
            </div>
        </>
    )
};

export default FormRegister;