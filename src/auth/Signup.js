import React, {useContext, useState} from 'react';
import {Form, Input, Button, DatePicker, Layout, notification} from "antd"
import AuthService from "../api/AuthService";
import {AccessToken} from "../api/ApiUtils";

import "./Signup.css"
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";
import UserService from "../api/UserService";
import NotificationComponent from "../common/NotificationComponent";

const FormItem = Form.Item;
const { TextArea } = Input

const Signup = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [password, setPassword] = useState("")

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()

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
                setIsAuth(true)
                navigate('/plans')
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

    // const [emailValidating, setEmailValidating] = useState(false)
    const [emailValidationStatus, setEmailValidationStatus] = useState()
    const [emailValidationMessage, setEmailValidationMessage] = useState()

    const handleEmailChange = (input) => {
        setEmail(input)
        setEmailValidationStatus('validating')
        if(!input) {
            setEmailValidationStatus('error')
            setEmailValidationMessage('Поле не должно быть пустым')
            return;
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(input)) {
            setEmailValidationStatus('error')
            setEmailValidationMessage('Невалидный email')
            return;
        }

        UserService.userExists(input)
            .then(response => {
                if (response.result) {
                    setEmailValidationStatus('error')
                    setEmailValidationMessage('Пользователь с таким email уже существует')
                } else {
                    setEmailValidationStatus('success')
                    setEmailValidationMessage(null)
                }
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    const [nameValidationStatus, setNameValidationStatus] = useState()
    const [nameValidationMessage, setNameValidationMessage] = useState()

    const handleNameChange = (input) => {
        setName(input)
        setNameValidationStatus('validating')
        if (!input) {
            setNameValidationStatus('error')
            setNameValidationMessage('Поле не должно быть пустым')
            return
        }
        setNameValidationStatus('success')
        setNameValidationMessage(null)
    }

    const [surnameValidationStatus, setSurnameValidationStatus] = useState()
    const [surnameValidationMessage, setSurnameValidationMessage] = useState()

    const handleSurnameChange = (input) => {
        setSurname(input)
        setSurnameValidationMessage('validating')
        if (!input) {
            setSurnameValidationStatus('error')
            setSurnameValidationMessage('Поле не должно быть пустым')
            return
        }
        setSurnameValidationStatus('success')
        setSurnameValidationMessage(null)
    }

    const [passwordValidationStatus, setPasswordValidationStatus] = useState()
    const [passwordValidationMessage, setPasswordValidationMessage] = useState()

    const handlePasswordChange = (input) => {
        setPassword(input)
        setPasswordValidationStatus('validating')
        if (!input) {
            setPasswordValidationStatus('error')
            setPasswordValidationMessage('Поле не должно быть пустым')
            return
        }
        if (input.length < 6) {
            setPasswordValidationStatus('error')
            setPasswordValidationMessage('Длина пароля должна быть не менее 6 символов')
            return
        }
        setPasswordValidationStatus('success')
        setPasswordValidationMessage(null)
    }

    const hasErrors = () => {
        if (emailValidationStatus !== 'success') return true
        if (nameValidationStatus !== 'success') return true
        if (surnameValidationStatus !== 'success') return true
        if (passwordValidationStatus !== 'success') return true
        return false
    }

    return (
        <div className="signup-content">
            <Form style={{marginTop: "30px"}} labelCol={{span: 4}} wrapperCol={{span: 16}}>
                <FormItem
                    label="Email"
                    hasFeedback
                    validateStatus={emailValidationStatus}
                    help={emailValidationMessage}>
                    <Input
                        style={{borderRadius: "10px"}}
                        placeholder="email"
                        name="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}/>
                </FormItem>
                <FormItem
                    label="Имя"
                    hasFeedback
                    validateStatus={nameValidationStatus}
                    help={nameValidationMessage}>
                    <Input
                        style={{borderRadius: "10px"}}
                        placeholder="Имя"
                        name="name"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}/>
                </FormItem>
                <FormItem
                    label="Фамилия"
                    hasFeedback
                    validateStatus={surnameValidationStatus}
                    help={surnameValidationMessage}>
                    <Input
                        style={{borderRadius: "10px"}}
                        placeholder="Фамилия"
                        name="surname"
                        autoComplete="off"
                        value={surname}
                        onChange={(e) => handleSurnameChange(e.target.value)}/>
                </FormItem>
                <FormItem
                    label="Пароль"
                    hasFeedback
                    validateStatus={passwordValidationStatus}
                    help={passwordValidationMessage}>
                    <Input.Password
                        style={{borderRadius: "10px"}}
                        placeholder="Пароль"
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}/>
                </FormItem>
                <Button style={{marginBottom: "30px"}} type="primary" disabled={hasErrors()} onClick={handleSignUp}>Зарегистрироваться</Button>
            </Form>
        </div>
    );
};

export default Signup;