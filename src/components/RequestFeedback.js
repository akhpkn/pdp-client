import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Select} from "antd";
import SharingService from "../api/SharingService";
import NotificationComponent from "../common/NotificationComponent";
import FeedbackService from "../api/FeedbackService";

const {Option} = Select

const RequestFeedback = (props) => {

    const [showModal, setShowModal] = useState(false)

    const [users, setUsers] = useState()
    const [usersLoaded, setUsersLoaded] = useState(false)

    const [selectedUser, setSelectedUser] = useState()

    const fetchUsers = () => {
        SharingService.getUsersWithAccess(props.task.planId)
            .then(response => {
                setUsers(response)
                setUsersLoaded(true)
                setSelectedUser(response[0])
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    const requestFeedback = () => {
        setShowModal(false)
        console.log(`Requesting feedback from ${selectedUser.userId} ${selectedUser.userEmail}`)
        const request = {
            assigneeId: selectedUser.userId,
            taskId: props.task.id
        }
        FeedbackService.requestNew(request)
            .then(response => {
                NotificationComponent.success(`Запрошен фидбек у ${selectedUser.userName} ${selectedUser.userSurname}`)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    const handleSelectedUser = (uEmail) => {
        const user = users.find(user => user.userEmail === uEmail)
        setSelectedUser(user)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const submitDisabled = () => {
        return usersLoaded && users.length ===0
    }

    return (
        <div>
            <Button onClick={() => setShowModal(true)}>Запросить фидбек</Button>
            <Modal
                visible={showModal}
                okText="Подтвердить"
                cancelText="Отменить"
                okButtonProps={{disabled: submitDisabled()}}
                onOk={() => requestFeedback()}
                onCancel={() => setShowModal(false)}
            >
                {usersLoaded && users.length > 0 &&
                    <Form style={{marginTop: "20px"}}>
                        <Form.Item label="Пользователь">
                            <Select defaultValue={users[0].userEmail} onChange={handleSelectedUser}>
                                {users.map(user => {
                                    return <Option value={user.userEmail}>{user.userEmail}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                }
                {usersLoaded && users.length === 0 &&
                    'Поделитесь планом развития!'
                }
            </Modal>
        </div>
    );
};

export default RequestFeedback;