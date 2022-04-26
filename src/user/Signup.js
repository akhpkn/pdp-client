import React, {useState} from 'react';
import {Form, Input, Button, DatePicker, Layout, notification} from "antd"
import AuthService from "../api/AuthService";
import {AccessToken} from "../api/ApiUtils";
const FormItem = Form.Item;
const { TextArea } = Input

const Signup = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = () => {
        const signUpRequest = {
            email: email,
            name: name,
            surname: surname,
            password: password
        }
        AuthService.signUp(signUpRequest)
            .then(response => {
                localStorage.setItem(AccessToken, response.token)
                notification.success({
                    message: "PDP",
                    description: "Вы успешно зарегистрированы!"
                })
            })
            .catch(error => {
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
                    <TextArea
                        placeholder="Имя"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <TextArea
                        placeholder="Фамилия"
                        name="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Input.Password
                        placeholder="Пароль"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </FormItem>
                <Button onClick={handleSignUp}>Sign up</Button>
            </Form>
        </div>
    );
};

export default Signup;