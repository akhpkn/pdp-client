import React from 'react';
import {Badge, Button, notification, Space, Tag, Tooltip, Typography} from "antd";
import {ClockCircleOutlined, DeleteOutlined, ExpandAltOutlined} from "@ant-design/icons"
import TaskService from "../api/TaskService";
import Paragraph from "antd/es/typography/Paragraph";
import moment from "moment";

import "./TaskItem.css"
import {useNavigate} from "react-router-dom";

const TaskItem = (props) => {

    const handleDelete = () => {
        TaskService.deleteTask(props.task.id)
            .then(response => {
                console.log(response)
                // notification.success({
                //     message: "PDP",
                //     description: "Таск удален!"
                // })
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

    const toDate = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD")
    }

    const navigate = useNavigate()

    const prettyStatus = () => {
        const status = props.task.status
        if (status === "New") return <Tag color="warning">TO DO</Tag>
        if (status === "InProgress") return <Tag color="processing">IN PROGRESS</Tag>
        if (status === "Completed") return <Tag color='success'>COMPLETED</Tag>
    }

    return (
        <div>
            <div className="task-content">
                <div className="task-header">
                    {props.task.feedbackRequested
                        ? <Tooltip title="Оставьте обратную связь">
                            <Badge dot>
                                <Typography.Title level={3}>{props.task.title}</Typography.Title>
                            </Badge>
                        </Tooltip>
                        : <Typography.Title style={{textAlign: "left", maxWidth: "400px"}}
                                            level={3}>{props.task.title}</Typography.Title>
                    }
                    <Space style={{alignItems: "center", marginLeft: "auto"}}>
                        <div>{prettyStatus()}</div>
                        <Tag color="default" icon={<ClockCircleOutlined/>}>{toDate(props.task.dueTo)}</Tag>
                        <Tooltip title="Раскрыть">
                            <Button icon={<ExpandAltOutlined/>} onClick={() => navigate(`/task/${props.task.id}`)}/>
                        </Tooltip>
                        {!props.task.readOnly &&
                            <Tooltip title="Удалить">
                                <Button icon={<DeleteOutlined/>} onClick={handleDelete}/>
                            </Tooltip>
                        }
                    </Space>
                </div>
                <div className="task-info">
                    <Typography.Text style={{fontSize: 16}}>Описание:</Typography.Text>
                    <Paragraph style={{whiteSpace: "pre-wrap"}}>{props.task.description}</Paragraph>
                    <Typography.Text style={{fontSize: 16}}>Критерии приема:</Typography.Text>
                    <Paragraph style={{whiteSpace: "pre-wrap"}}>{props.task.acceptanceCriteria}</Paragraph>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;