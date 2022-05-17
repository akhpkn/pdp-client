import React, {useContext, useState} from 'react';
import {Form, Input, Button, DatePicker, Layout, notification} from "antd"
import AuthService from "../api/AuthService";
import {AccessToken} from "../api/ApiUtils";

import "./Signin.css"
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const FormItem = Form.Item;
const { TextArea } = Input

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSignIn = () => {
        const signInRequest = {
            email: email,
            password: password
        }
        AuthService.signIn(signInRequest)
            .then(response => {
                localStorage.setItem(AccessToken, response.token)
                setIsAuth(true)
                navigate('/plans')
            })
            .catch(error =>{
                notification.error({
                    message: "PDP",
                    description: error.message
                })
            })
    }

    return (
        <div className="signin-content">
            <Form style={{marginTop: "30px"}} labelCol={{span: 4}} wrapperCol={{span: 16}}>
                <FormItem label="Email">
                    <Input
                        style={{borderRadius: "10px"}}
                        placeholder="email"
                        name="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </FormItem>
                <FormItem label="Пароль">
                    <Input.Password
                        style={{borderRadius: "10px"}}
                        placeholder="Пароль"
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </FormItem>
                <Button style={{marginBottom: "30px"}} type="primary" onClick={handleSignIn}>Войти</Button>
            </Form>
        </div>
    );
};

export default Signin;