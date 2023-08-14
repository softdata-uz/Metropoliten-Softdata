import React, {useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {ip} from '../../ip'

import loginImg from '../../images/loginImg.svg';
import loginIcon from '../../images/userIcon.png';
import lickIcon from '../../images/lockIcon.png';

import './login.css'

const Login = ({setUser}) => {

    const [token, setToken] = useState(null)

    const initialValues = {
        login: '',
        password: ''
    }
    const validationSchema = Yup.object({
        login: Yup.string().required('login kiritilmagan ...'),
        password: Yup.string().required('parol kiritilmagan...'),
    })

    const onSubmit = (values) => {
        axios.post(`${ip}/api/sign-in`, {
            login: values.login,
            password: values.password
        })
            .then(res => {
                setToken(res.data.accessToken)
                localStorage.setItem('soft-ais-token', res.data.accessToken)
            })
            .catch(err => {
                // setError(true)
            })
    }

    useEffect(() => {
        if (localStorage.getItem('soft-ais-token')) {
            axios.get(`${ip}/api/me`, {headers: {'x-access-token': localStorage.getItem('soft-ais-token')}})
                .then(res => {
                    setUser(res.data.data)
                })
                .catch(err => {
                    // console.log(err)
                })
        }
    }, [token, setUser])


    return (
        <div className="login_page">
            <div className="page_left">
                <img className="left_img" src={loginImg} alt=""/>
            </div>

            <div className="page_right">
                <div className="rihgt_inner">
                    <div className="titles">
                        <div className="title">Tizimga kirish</div>
                    </div>
                    <div className="login_forms">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {
                                formik => {
                                    return <Form>
                                        <div className="login_page_inputs">
                                            <div className="login_inputs_wrapper">
                                                <div className="login_control">
                                                    <label className="login_label">Логин</label>
                                                    <div className="login_input">
                                                        <img className="login_icon" src={loginIcon} alt=""/>
                                                        <Field
                                                            type="login"
                                                            id="login"
                                                            name="login"
                                                            placeholder="Loginni kiriting"
                                                            autoComplete="off"
                                                        />
                                                        <ErrorMessage name="login" component='div'
                                                                      style={{color: 'red'}} className="error"/>
                                                    </div>
                                                </div>
                                                <div className="login_control">
                                                    <label className="login_label">Пароль</label>
                                                    <div className="parol_input">
                                                        <img className="login_icon" src={lickIcon} alt=""/>
                                                        <Field
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            placeholder="Parolni kiriting"
                                                            autoComplete="off"
                                                        />
                                                        <ErrorMessage name="password" component='div'
                                                                      style={{color: 'red'}} className="error"/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <button
                                            type='submit'
                                            className="in_button"
                                        >
                                            Kirish
                                        </button>


                                    </Form>
                                }
                            }

                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
