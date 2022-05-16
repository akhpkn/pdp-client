import React, {useState} from 'react';
import {Button, Form, Input, Layout, notification, Radio, Select, Typography} from "antd";
import {DeleteOutlined} from "@ant-design/icons"
import TaskService from "../api/TaskService";
import {Content} from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import moment from "moment";
import SharingService from "../api/SharingService";
import NotificationComponent from "../common/NotificationComponent";
import LoadingIndicator from "../common/LoadingIndicator";
import FeedbackService from "../api/FeedbackService";

const {Option} = Select;

const Task = (props) => {

    const [title, setTitle] = useState(props.task.title)
    const [description, setDescription] = useState(props.task.description)
    const [status, setStatus] = useState(props.task.status)
    const [acceptanceCriteria, setAcceptanceCriteria] = useState(props.task.acceptanceCriteria)

    const [showSave, setShowSave] = useState(false)

    const handleDelete = () => {
        TaskService.deleteTask(props.task.id)
            .then(response => {
                console.log(response)
                notification.success({
                    message: "PDP",
                    description: "Таск удален!"
                })
                props.setChanged()
                return response
            })
            .catch(error => {
                console.log(error)
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                return {}
            })
    }

    // const userFriendlyStatus

    const submitUpdate = () => {
        const taskUpdateRequest = {
            title: title,
            description: description,
            acceptanceCriteria: acceptanceCriteria
        }
        // if (status !== props.task.status) {
        //     handleStatusChanged()
        // }
        TaskService.updateTask(props.task.id, taskUpdateRequest)
            .then(response => {
                console.log(response)
                notification.success({
                    message: "PDP",
                    description: "Таск изменен!"
                })
                setShowSave(false)
                props.setChanged()
                return response
            })
            .catch(error => {
                console.log(error)
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                return {}
            })
    }

    const updateStatus = (newStatus) => {
        console.log(`Updating status to ${newStatus}`)
        TaskService.updateStatus(props.task.id, newStatus)
            .then(response => {
                console.log(response)
                notification.success({
                    message: "PDP",
                    description: "Статус обновлен!"
                })
                props.setChanged()
                return response
            })
            .catch(error => {
                console.log(error)
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                return {}
            })

    }

    const handleStatusChange = (newStatus) => {
        console.log(`Old status: ${status}. New status: ${newStatus}`)
        setStatus(newStatus)
        console.log(`Set status: ${status}`)
        updateStatus(newStatus)
    }

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle)
        if (newTitle !== props.task.title) {
            setShowSave(true)
        } else {
            setShowSave(false)
        }
    }

    const handleDescriptionChange = (newDescription) => {
        setDescription(newDescription)
        if (newDescription !== props.task.description) {
            setShowSave(true)
        } else {
            setShowSave(false)
        }
    }

    const handleAcceptanceCriteriaChange = (newAcceptanceCriteria) => {
        setAcceptanceCriteria(newAcceptanceCriteria)
        if (newAcceptanceCriteria !== props.task.acceptanceCriteria) {
            setShowSave(true)
        } else {
            setShowSave(false)
        }
    }

    const toDate = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD")
    }

    const [feedbackClicked, setFeedbackClicked] = useState(false)
    const [usersForFeedback, setUsersForFeedback] = useState([])
    const [usersLoaded, setUsersLoaded] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

    const handleFeedbackClicked = () => {
        SharingService.getUsersWithAccess(props.task.planId)
            .then(response => {
                setUsersForFeedback(response)
                setFeedbackClicked(true)
                setUsersLoaded(true)
                setSelectedUser(response[0])
                console.log(response)
                console.log(usersForFeedback)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    const handleSelectedUser = (uEmail) => {
        const user = usersForFeedback.find(user => user.userEmail === uEmail)
        setSelectedUser(user)
    }

    const requestFeedback = () => {
        setFeedbackClicked(false)
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

    const [feedback, setFeedback] = useState("")
    
    const sendFeedback = () => {
        console.log(`Sending feedback [${feedback}]`)
        const request = {
            requestId: props.task.feedbackRequestId,
            text: feedback
        }
        FeedbackService.send(request)
            .then(response => {
                NotificationComponent.success("Фидбек оправлен")
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    return (
        <div>
            {props.task.readOnly
                ? <Typography.Title>{title}</Typography.Title>
                : <Typography.Title editable={{onChange: handleTitleChange, triggerType: "text"}} level={2}>{title}</Typography.Title>
            }
            {/*<Typography.Title editable={{onChange: handleTitleChange, triggerType: "text"}}*/}
            {/*                  level={2}>{title}</Typography.Title>*/}
            {props.task.readOnly
                ? <Paragraph>{description}</Paragraph>
                : <Paragraph
                    editable={{onChange: handleDescriptionChange, triggerType: "text"}}>{description}</Paragraph>
            }
            {props.task.readOnly
                ? <Paragraph>{acceptanceCriteria}</Paragraph>
                : <Paragraph
                    editable={{onChange: handleAcceptanceCriteriaChange, triggerType: "text"}}>{acceptanceCriteria}</Paragraph>
            }
            <div>
                {`Срок выполнения: ${toDate(props.task.dueTo)}`}
            </div>
            <div>
                {/*{"Статус: "}*/}
                <Radio.Group value={status} onChange={(e) => handleStatusChange(e.target.value)}>
                    <Radio.Button value="New">TO DO</Radio.Button>
                    <Radio.Button value="InProgress">IN PROGRESS</Radio.Button>
                    <Radio.Button value="Completed">COMPLETED</Radio.Button>
                </Radio.Group>
            </div>
            <div>
                {/*{showSave*/}
                {/*    ? null*/}
                {/*    : <Button onClick={() => setShowSave(true)}>Редактировать</Button>*/}
                {/*}*/}
                {showSave
                    ? <Button onClick={submitUpdate}>Сохранить</Button>
                    : null
                }
                {props.task.readOnly
                    ? null
                    : <Button onClick={handleDelete}>Удалить</Button>
                }
                {feedbackClicked
                    ? <div>
                        {usersLoaded
                            ? <div><Select defaultValue={usersForFeedback[0].userEmail} onChange={handleSelectedUser}>
                                {usersForFeedback.map(user => {
                                    return <Option value={user.userEmail}>{user.userEmail}</Option>
                                })}
                            </Select>
                            <Button onClick={requestFeedback}>Подтвердить</Button>
                            <Button onClick={() => setFeedbackClicked(false)}>Закрыть</Button>
                            </div>
                            : <LoadingIndicator/>
                        }
                        {/*<Select onChange={handleSelectedUser}>*/}
                        {/*    {usersForFeedback.map(user => {*/}
                        {/*        <Option value={user.userEmail}>{user.userEmail}</Option>*/}
                        {/*    })}*/}
                        {/*</Select>*/}
                        {/*<Button onClick={requestFeedback}>Подтвердить</Button>*/}
                    </div>
                    : <Button onClick={handleFeedbackClicked}>Запросить фидбек</Button>
                }
                {props.task.feedbackRequested
                    ? <div>
                        Оставьте обратную связь!
                        <Form>
                            <Form.Item>
                                <Input
                                    placeholder="Обратная связь"
                                    name="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                            </Form.Item>
                            <Button onClick={sendFeedback}>Сохранить</Button>
                        </Form>
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

export default Task;