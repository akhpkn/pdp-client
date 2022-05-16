import React, {useState} from 'react';
import {Button, Form, Input, Layout, notification, Radio, Select, Space, Tag, Typography} from "antd";
import {ClockCircleOutlined, DeleteOutlined} from "@ant-design/icons"
import TaskService from "../api/TaskService";
import {Content} from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import moment from "moment";
import SharingService from "../api/SharingService";
import NotificationComponent from "../common/NotificationComponent";
import LoadingIndicator from "../common/LoadingIndicator";
import FeedbackService from "../api/FeedbackService";
import RequestFeedback from "./RequestFeedback";
import TextArea from "antd/es/input/TextArea";
import {Link} from "react-router-dom";

const {Option} = Select;

const Task3 = (props) => {

    const [title, setTitle] = useState(props.task.title)
    const [description, setDescription] = useState(props.task.description)
    const [status, setStatus] = useState(props.task.status)
    const [acceptanceCriteria, setAcceptanceCriteria] = useState(props.task.acceptanceCriteria)


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
                setEditMode(false)
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

    const toDate = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD")
    }

    const prettyStatus = () => {
        const status = props.task.status
        if (status === "New") return "TO DO"
        if (status === "InProgress") return "IN PROGRESS"
        if (status === "Completed") return "COMPLETED"
    }

    const [editMode, setEditMode] = useState(false)

    const cancelEdit = () => {
        setEditMode(false)
        setTitle(props.task.title)
        setDescription(props.task.description)
        setAcceptanceCriteria(props.task.acceptanceCriteria)
    }

    return (
        <div >
            <div style={{display: "flex", alignItems: "baseline"}}>
                {editMode
                    ? <Input
                        style={{borderRadius: "10px", fontSize: "38px", maxWidth: "50%"}}
                        placeholder="Название задачи"
                        name="feedback"
                        autoComplete="off"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    : <Typography.Title style={{textAlign: "left", maxWidth: "60%"}}>{props.task.title}</Typography.Title>
                }
                <Space style={{marginLeft: "auto"}}>
                    {!props.task.readOnly && props.task.status === "New" &&
                        <Button onClick={() => handleStatusChange("InProgress")}>
                            Взять в работу
                        </Button>
                    }
                    {!props.task.readOnly && props.task.status === "InProgress" &&
                        <Space>
                            <Button onClick={() => handleStatusChange("New")}>
                                Отложить
                            </Button>
                            <Button onClick={() => handleStatusChange("Completed")}>
                                Завершить
                            </Button>
                        </Space>
                    }
                    {!props.task.readOnly && !editMode &&
                        <Button onClick={() => setEditMode(true)}>Редактировать</Button>
                    }
                    {editMode
                        ? <Button onClick={submitUpdate}>Сохранить</Button>
                        : null
                    }
                    {editMode
                        ? <Button onClick={cancelEdit}>Отменить</Button>
                        : null
                    }
                    {props.task.owned && <RequestFeedback task={props.task}/>

                    }
                </Space>
            </div>
            <div style={{textAlign: "left", marginRight: "40%"}}>
                <div style={{fontSize: 20}}>
                    {`Срок выполнения: ${toDate(props.task.dueTo)}`}
                </div>
                <div style={{fontSize: 20}}>
                    Статус: {prettyStatus()}
                </div>
                <div style={{fontSize: 20}}>Описание:</div>
                {editMode
                    ? <TextArea style={{whitespace: "pre-wrap", borderRadius: "10px"}} rows={4}
                                placeholder="Описание задачи"
                                name="description"
                                autoComplete="off"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                    : <Paragraph style={{whiteSpace: "pre-wrap"}}>{description}</Paragraph>
                }
                <div style={{fontSize: 20}}>Критерии приема:</div>
                {editMode
                    ? <TextArea style={{whitespace: "pre-wrap", borderRadius: "10px"}} rows={4}
                                placeholder="Критерии приема"
                                name="acceptanceCriteria"
                                autoComplete="off"
                                value={acceptanceCriteria}
                                onChange={(e) => setAcceptanceCriteria(e.target.value)}/>
                    : <Paragraph style={{whiteSpace: "pre-wrap"}}>{acceptanceCriteria}</Paragraph>
                }
            </div>
        </div>
    );
};

export default Task3;