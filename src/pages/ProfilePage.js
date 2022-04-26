import React, {useEffect, useState} from 'react';
import UserService from "../api/UserService";
import NotificationComponent from "../common/NotificationComponent";
import {Button, Form, Input} from "antd";

const ProfilePage = () => {

    const [user, setUser] = useState({})
    const [editClicked, setEditClicked] = useState(false)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const [fetchState, setFetchState] = useState(0)

    const fetchUser = () => {
        UserService.getProfile()
            .then(response => {
                setUser(response)
                setName(user.name)
                setSurname(user.surname)
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
            .then(response => {
                NotificationComponent.success("Профиль обновлен!")
                setEditClicked(false)
                setFetchState(fetchState + 1)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
                setEditClicked(false)
            })
    }

    useEffect(() => {
        fetchUser()
    }, [fetchState])

    return (
        <div>
            <div>{user.name} {user.surname}</div>
            <div>{user.email}</div>
            {editClicked
                ? <div>
                    <Form>
                        <Form.Item>
                            <Input
                                placeholder="Имя"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                placeholder="Фамилия"
                                name="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                    <Button onClick={handleSave}>Сохранить</Button>
                </div>
                : null
            }
            <Button onClick={() => setEditClicked(true)}>
                Редактировать
            </Button>
        </div>
    );
};

export default ProfilePage;