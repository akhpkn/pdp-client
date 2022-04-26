import React, {useState} from 'react';
import {Button, Layout, notification, Radio, Select, Typography} from "antd";
import {DeleteOutlined} from "@ant-design/icons"
import TaskService from "../api/TaskService";
import {Content} from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import moment from "moment";

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
            </div>
        </div>
    );
};

export default Task;