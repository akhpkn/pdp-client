import React, {useEffect, useState} from 'react';
import SharingService from "../api/SharingService";
import NotificationComponent from "../common/NotificationComponent";
import {Button, Form, Modal, Select} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";
import {CloseOutlined, DeleteOutlined} from "@ant-design/icons";

const {Option} = Select

const AccessList = (props) => {

    const [usersLoading, setUsersLoading] = useState(false)
    const [users, setUsers] = useState([])

    const [fetchState, setFetchState] = useState(0)

    const needRefresh = () => {
        setFetchState(fetchState + 1)
    }

    const fetchUsers = () => {
        setUsersLoading(true)
        SharingService.getUsersWithAccess(props.plan.id)
            .then(response => {
                setUsers(response)
                setUsersLoading(false)
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    useEffect(() => {
        fetchUsers()
    }, [fetchState])

    const [showModal, setShowModal] = useState(false)

    const changeAccess = (user, type) => {
        const request = {
            planId: props.plan.id,
            userId: user.userId,
            type: type
        }
        SharingService.share(request)
            .then(() => {
                NotificationComponent.success("Уровень доступа изменен")
                needRefresh()
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    const removeAccess = (user) => {
        const request = {
            planId: props.plan.id,
            userId: user.userId
        }
        SharingService.removeAccess(request)
            .then(() => {
                NotificationComponent.success("Вы забрали доступ")
                needRefresh()
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    const handleClick = () => {
        setShowModal(true)
        needRefresh()
    }

    return (
        <div>
            <Button onClick={handleClick}>Доступы</Button>
            <Modal
                bodyStyle={{borderRadius: "30%"}}
                visible={showModal}
                // onCancel={() => setShowModal(false)}
                width={700}
                onCancel={() => setShowModal(false)}
                footer={[
                    <Button type="primary" onClick={() => setShowModal(false)}>OK</Button>
                ]}
            >
                {usersLoading && <LoadingIndicator/>}
                {!usersLoading &&
                    <Form labelCol={{span: 8}} wrapperCol={{span: 16}} style={{marginTop: "30px"}}>
                        {users.map(u => {
                            return <Form.Item label={u.userEmail}>
                                {/*<div>*/}
                                <Select style={{maxWidth: "300px"}} defaultValue={u.type} onChange={(e) => changeAccess(u, e)}>
                                    <Option value="Read">Чтение</Option>
                                    <Option value="Write">Чтение и редактирование</Option>
                                </Select>
                                <Button onClick={() => removeAccess(u)} style={{marginLeft: "10px"}} icon={<CloseOutlined/>}/>
                            </Form.Item>
                        })}
                    </Form>
                }
                {!usersLoading && users.length === 0 &&
                    'Вы еще не поделились планом развития'
                }
            </Modal>
        </div>
    );
};

export default AccessList;