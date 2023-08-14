import React, {useEffect, useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {LockOutlined} from '@ant-design/icons';
import loginNewImg from '../../images/login/loginNewImg.svg';
import loginLogo from '../../images/login/Group 55882 (2).png';

import "./loginNewPage.css";
import axios from "axios";
import {ip} from "../../ip";


const LoginNewPage = ({setUser}) => {

    const [token, setToken] = useState(null)

    const initialValues = {
        login: '',
        password: ''
    }

    const onFinish = (values) => {
        axios.post(`${ip}/api/sign-in`, {
            login: values.login,
            password: values.password
        })
            .then(res => {
                setToken(res.data.accessToken);
                localStorage.setItem('soft-ais-token', res.data.accessToken);
                localStorage.setItem('keys', JSON.stringify(['sub1']));
                localStorage.setItem('selected-id', JSON.stringify('2'));
                window.location.href = '/';
            })
            .catch(err => {
                // setError(true)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


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
        <div className="login_new_page">
            <div className="login_new_page_left">
                <div className="login_new_page_left_logo"><img src={loginLogo}/></div>
                <div className="login_new_page_left_body">
                    <div>
                        <h1>Welcome to <br/> SoftData AI System</h1>
                        <p>
                            We offer aspecial and modern software product for you, Everything is controller by our
                            perfect
                            system!
                        </p>
                    </div>
                </div>
                <div className="login_new_page_left_footer">
                    <p>Copyright © 2023. SoftData</p>
                </div>
            </div>
            <div className="login_new_page_right">
                <div className="login_new_page_right_top">
                    <p>Support</p>
                    <p>Contact</p>
                </div>
                <div className="login_new_page_right_body">
                    <div className="login_new_page_right_body_inner">
                        <h2>Login SoftData AI System</h2>
                        <p>Please, enter your login and password</p>
                        <div className="login_new_page_right_body_inner_form">
                            <Form
                                name="basic"
                                initialValues={initialValues}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="login"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Loginni kiriting!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined />}/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Parolni kiriting!',
                                        },
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined />}/>
                                </Form.Item>

                                {/*<Form.Item*/}
                                {/*    name="remember"*/}
                                {/*    valuePropName="checked"*/}
                                {/*    wrapperCol={{*/}
                                {/*        offset: 8,*/}
                                {/*        span: 16,*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <Checkbox>Remember me</Checkbox>*/}
                                {/*</Form.Item>*/}

                                <div>
                                    <button type="submit">Continue</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="login_new_page_right_footer">
                  <div>
                      <div><p>Support team:</p></div>
                      <div><h2>+998 71 000 00 00</h2></div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default LoginNewPage;