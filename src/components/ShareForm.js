import React, {useState} from 'react';
import {Button, Empty, Form, Mentions, Modal, notification, Select, Spin} from "antd";
import UserService from "../api/UserService";
import SharingService from "../api/SharingService";
import NotificationComponent from "../common/NotificationComponent";


const {Option} = Mentions;

// const { Option} = Select

const ShareForm = (props) => {

    const [usersLoading, setUsersLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedUsersForShare, setSelectedUsersForShare] = useState([])
    const [accessType, setAccessType] = useState('Read')

    const loadUsersByEmail = (email) => {
        setUsersLoading(true)
        setUsers([])
        UserService.loadUsersByEmail(email)
            .then(response => {
                console.log(response)
                setUsers(response)
                setOptions(response.map(r => <Option value={r.id}>{r.email}</Option>))
                console.log(options)
                console.log(users)
                setUsersLoading(false)
                // setSelectedUserIdForShare(response[0].id)
            })
            .catch(error => {
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                setUsers([])
                setUsersLoading(false)
            })
    }

    const sharePlan2 = (users) => {
        const ids = users.map(userData => userData.value)
        const request = {
            planId: props.plan.id,
            userIds: ids,
            type: accessType
        }
        SharingService.shareMultiple(request)
            .then(() => {
                setShow(false)
                NotificationComponent.success("Вы поделились планом развития")
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    const onSearch = search => {
        loadUsersByEmail(search)
    }

    const submitShare = () => {
        sharePlan2(selectedUsersForShare)
    }

    const [show, setShow] = useState(false)

    const [options, setOptions] = useState([])

    console.log(selectedUsersForShare)

    return (
        <div>
            <Button onClick={() => setShow(true)}>Поделиться</Button>
            <Modal
                bodyStyle={{borderRadius: "30%"}}
                visible={show}
                okText="Подтвердить"
                cancelText="Отменить"
                okButtonProps={{disabled: (selectedUsersForShare.length === 0)}}
                onOk={submitShare}
                onCancel={() => setShow(false)}
            >
                <Form style={{marginTop: "30px"}}>
                    <Form.Item label="Пользователи">
                        <Select
                            placeholder={"Введите email пользователя"}
                            labelInValue
                            filterOption={false}
                            notFoundContent={usersLoading ? <Spin size="small"/> : "Not found"}
                            value={selectedUsersForShare}
                            mode="multiple"
                            onChange={setSelectedUsersForShare}
                            onSearch={onSearch}>
                            {options}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Уровень доступа">
                        <Select defaultValue="Read" onChange={setAccessType}>
                            <Option value="Read">Чтение</Option>
                            <Option value="Write">Чтение и редактирование</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ShareForm;