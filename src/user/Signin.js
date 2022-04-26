import React, {useState} from 'react';
import {Form, Input, Button, DatePicker, Layout, notification} from "antd"
import AuthService from "../api/AuthService";
import {AccessToken} from "../api/ApiUtils";
const FormItem = Form.Item;
const { TextArea } = Input

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = () => {
        const signInRequest = {
            email: email,
            password: password
        }
        AuthService.signIn(signInRequest)
            .then(response => {
                console.log(response)
                localStorage.setItem(AccessToken, response.token)
            })
            .catch(error =>{
                notification.error({
                    message: "PDP",
                    description: error.message
                })
            })
    }

    return (
        <div>
            <Form>
                <FormItem>
                    <TextArea
                        placeholder="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Input.Password
                        placeholder="Пароль"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </FormItem>
                <Button onClick={handleSignIn}>Sign In</Button>
            </Form>
        </div>
    );
};

export default Signin;