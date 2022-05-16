import React, {useEffect, useState} from 'react';
import UserService from "../api/UserService";
import NotificationComponent from "../common/NotificationComponent";
import {Avatar, Button, Form, Input, Space, Tabs, Typography} from "antd";
import NotificationSettingsPage from "./NotificationSettingsPage";
import NotificationSettings from "../components/NotificationsSettings"
import LoadingIndicator from "../common/LoadingIndicator";

const {TabPane} = Tabs


const ProfilePage = () => {

    const [user, setUser] = useState()
    const [userLoaded, setUserLoaded] = useState(false)
    const [editClicked, setEditClicked] = useState(false)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')

    const [fetchState, setFetchState] = useState(0)

    const fetchUser = () => {
        setUserLoaded(false)
        UserService.getProfile()
            .then(response => {
                setUser(response)
                setName(response.name)
                setSurname(response.surname)
                setEmail(response.email)
                setUserLoaded(true)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    const handleSave = () => {
        console.log(name)
        console.log(surname)
        const request = {
            name: name,
            surname: surname
        }
        UserService.updateProfile(request)
            .then(() => {
                NotificationComponent.success("Профиль обновлен!")
                setEditClicked(false)
                needRefresh()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
                setEditClicked(false)
            })
    }

    const needRefresh = () => {
        setFetchState(fetchState + 1)
    }

    useEffect(() => {
        fetchUser()
    }, [fetchState])

    const cancelEdit = () => {
        setName(user.name)
        setSurname(user.surname)
        setEmail(user.email)
        setEditClicked(false)
        setEmailValidationStatus(null)
        setEmailValidationMessage(null)
    }

    const [emailValidationStatus, setEmailValidationStatus] = useState()
    const [emailValidationMessage, setEmailValidationMessage] = useState()

    const handleEmailChange = (input) => {

        console.log(`user.email: ${user.email}`)
        console.log(`email: ${email}`)
        console.log(`input: ${input}`)
        setEmail(input)
        if (input === user.email) {
            setEmailValidationStatus(null)
            setEmailValidationMessage(null)
            return;
        }

        setEmail(input)
        setEmailValidationStatus('validating')
        if(!input) {
            setEmailValidationStatus('error')
            setEmailValidationMessage('Email must not be empty')
            return;
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(input)) {
            setEmailValidationStatus('error')
            setEmailValidationMessage('Email not valid')
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

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }

    if (!userLoaded) return <LoadingIndicator/>

    const avatarTitle = (u) => {
        const name = u.name.charAt(0)
        const surname = u.surname.charAt(0)
        return `${name}${surname}`
    }

    return (
        <div>
            <div style={{textAlign: "left", marginLeft: "30px", marginTop: "30px"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                <Avatar size={70} style={{fontSize: 30}}>{avatarTitle(user)}</Avatar>
                <Typography.Title style={{marginBottom: 0, marginLeft: "10px"}} level={2}>{user.name} {user.surname}</Typography.Title>
                    </div>
                <Typography.Title style={{marginTop: "10px"}} level={2}>@{user.email}</Typography.Title>
            </div>
            {!editClicked
                ? <div style={{textAlign: "left", marginLeft: "30px", fontSize: 25}}>
                    {/*<div>{`Имя: ${user.name}`}</div>*/}
                    {/*<div>{`Фамилия: ${user.surname}`}</div>*/}
                    {/*<div>{`Email: ${user.email}`}</div>*/}
                </div>
                : <div style={{textAlign: "left", marginLeft: "30px", fontSize: 25}}>
                    <Form style={{maxWidth: "300px", fontSize: 20}} labelCol={ {span: 6}} wrapperCol={{span: 16}}>
                        <Form.Item style={{fontSize: 20}} label="Имя">
                            <Input

                                // style={{marginLeft: "10px"}}
                                autoComplete="off"
                                placeholder="Введите имя"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name} value={name}/>
                        </Form.Item>
                        <Form.Item label="Фамилия">
                            <Input
                                // style={{marginLeft: "10px"}}
                                autoComplete="off"
                                placeholder="Введите фамилию"
                                defaultValue={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                value={surname}/>
                        </Form.Item>
                        {/*<Form.Item label="Email"*/}
                        {/*           hasFeedback*/}
                        {/*           validateStatus={emailValidationStatus}*/}
                        {/*           help={emailValidationMessage}>*/}
                        {/*    <Input*/}
                        {/*        // style={{marginLeft: "10px"}}*/}
                        {/*        autoComplete="off"*/}
                        {/*        placeholder="Введите email"*/}
                        {/*        defaultValue={email}*/}
                        {/*        onChange={(e) => handleEmailChange(e.target.value)}*/}
                        {/*        value={email}/>*/}
                        {/*</Form.Item>*/}
                    </Form>
                </div>
            }
            {!editClicked
                ? <Button style={{display: "flex", marginLeft: "30px", marginTop: "20px"}}
                          onClick={() => setEditClicked(true)}>
                    Редактировать
                </Button>
                : <div style={{display: "flex", marginLeft: "30px", marginTop: "20px"}}>
                    <Space>
                    <Button type="primary" onClick={handleSave}>Сохранить</Button>
                    <Button onClick={cancelEdit}>Отменить</Button>
                    </Space>
                </div>
            }
            <Tabs style={{marginLeft: "30px", display: "flex", marginRight: "40%"}}>
                <TabPane tab="Настройки напоминаний">
                    <NotificationSettings style={{display: "flex"}}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ProfilePage;