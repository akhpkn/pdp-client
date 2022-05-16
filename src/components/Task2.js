import React, {useState} from 'react';
import {
    Badge,
    Button, Col, Descriptions,
    Form,
    Input,
    Layout,
    notification,
    Radio,
    Row,
    Select,
    Space,
    Tag,
    Tooltip,
    Typography
} from "antd";
import {
    ClockCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    NotificationOutlined,
    PlusSquareOutlined
} from "@ant-design/icons"
import TaskService from "../api/TaskService";
import {Content} from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import moment from "moment";
import SharingService from "../api/SharingService";
import NotificationComponent from "../common/NotificationComponent";
import LoadingIndicator from "../common/LoadingIndicator";
import FeedbackService from "../api/FeedbackService";

import "./Task2.css"
import {Link, useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

// const { Link } = Typography

const Task2 = (props) => {

    // const [description, setDescription] = useState(props.task.description)
    // const [acceptanceCriteria, setAcceptanceCriteria] = useState(props.task.acceptanceCriteria)

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
            {/*<Button ghost style={{height: "auto", border: "transparent", width: "auto"}}>*/}
            <div className="task-content">
                <div className="task-header">
                    {props.task.feedbackRequested
                        ? <Tooltip title="Оставьте обратную связь">
                            <Badge dot>
                                <Typography.Title level={3}>{props.task.title}</Typography.Title>
                            </Badge>
                        </Tooltip>
                        :  <Typography.Title style={{textAlign: "left", maxWidth: "400px"}} level={3}>{props.task.title}</Typography.Title>
                    }
                    <Space style={{alignItems: "center", marginLeft: "auto"}}>
                        <div>{prettyStatus()}</div>
                        <Tag color="default" icon={<ClockCircleOutlined/>}>{toDate(props.task.dueTo)}</Tag>
                        <Button
                            // icon={<PlusSquareOutlined/>}
                                onClick={() => navigate(`/task/${props.task.id}`)}>Открыть</Button>
                        {!props.task.readOnly &&
                            <Button icon={<DeleteOutlined/>} onClick={handleDelete}/>
                        }
                    </Space>
                </div>
                {/*<Button onClick={() => navigate(`/task/${props.task.id}`)} type="ghost" style={{height: "100%", border: "transparent" , width: "100%"}}>*/}
                <div className="task-info">
                    {/*<div style={{fontSize: 16}}>Описание:</div>/*/}
                    <Typography.Text style={{fontSize: 16}}>Описание:</Typography.Text>
                    <Paragraph style={{whiteSpace: "pre-wrap"}}>{props.task.description}</Paragraph>
                    <Typography.Text style={{fontSize: 16}}>Критерии приема:</Typography.Text>
                    <Paragraph style={{whiteSpace: "pre-wrap"}}>{props.task.acceptanceCriteria}</Paragraph>
                </div>
                {/*</Button>*/}
            </div>
            {/*</Button>*/}
        </div>
    );
};

export default Task2;