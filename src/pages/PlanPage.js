import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Mentions,
    Modal,
    notification,
    Result,
    Select,
    Space,
    Tag,
    Typography
} from "antd";
import Task from "../components/Task";
import {useNavigate, useParams} from "react-router-dom";
import PlanService from "../api/PlanService";
import TaskService from "../api/TaskService";
import LoadingIndicator from "../common/LoadingIndicator";
import UserService from "../api/UserService";
import SharingService from "../api/SharingService";
import moment from "moment";
import TaskAuditService from "../api/TaskAuditService";
import NotificationComponent from "../common/NotificationComponent";
import TimeUtil from "../common/TimeUtil";
import Task2 from "../components/Task2";

import "./MyPlans.css"
import "./PlanPage.css"
import NewTask from "../components/NewTask";
import ShareForm from "../components/ShareForm";
import TasksHistory from "../components/TasksHistory";
import {ClockCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
import AccessList from "../components/AccessList";

const { Option } = Mentions;
const { TextArea } = Input


const PlanPage = () => {

    // const [plan, setPlan] = useState({})
    const params = useParams()

    const navigate = useNavigate()

    const [plan, setPlan] = useState({})
    const [tasks, setTasks] = useState([])
    const [planLoading, setPlanLoading] = useState(true)
    const [tasksLoading, setTasksLoading] = useState(true)

    const [audit, setAudit] = useState([])
    const [auditLoading, setAuditLoading] = useState(true)

    const [fetchState, setFetchState] = useState(0)
    const fetchPlan = () => {
        PlanService.getPlan(params.id)
            .then(response => {
                console.log(response)
                setPlan(response)
                setPlanLoading(false)
                setTitle(response.title)
                return response
            })
            .catch(error => {
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                setPlanLoading(false)
                return {}
            })
    }

    const fetchTasks = () => {
        TaskService.getTasks(params.id)
            .then(response => {
                console.log(response)
                setTasks(response)
                setTasksLoading(false)
                return response
            })
            .catch(error => {
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                setTasks([])
                setTasksLoading(false)
                return {}
            })
    }

    const fetchAudit = () => {
        TaskAuditService.listByPlan(params.id)
            .then(response => {
                setAudit(response)
                setAuditLoading(false)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
                setAudit([])
                setAuditLoading(false)
            })
    }

    useEffect(() => {
        console.log("Fetching data from backend")
        fetchPlan()
        fetchTasks()
        fetchAudit()
    }, [fetchState])

    const needRefresh = () => {
        console.log("Need refresh")
        setFetchState(fetchState + 1)
    }

    const [editMode, setEditMode] = useState(false)

    const [title, setTitle] = useState('')

    const cancelEdit = () => {
        setEditMode(false)
        setTitle(plan.title)
    }

    const submitEdit = () => {
        PlanService.updateTitle(plan.id, title)
            .then(() => {
                NotificationComponent.success("Название изменено!")
                setEditMode(false)
                needRefresh()
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    return (
        //style={{marginTop: "30px", marginLeft: "80px", marginRight: "60px"}}
        //style={{marginTop: "30px", marginLeft: "80px", marginRight: "40px"}}
        <div style={{marginTop: "30px", marginLeft: "10px"}}>
            {planLoading
                ? <LoadingIndicator/>
                : <div className="plan-header">
                    {editMode
                        ? <Input
                            style={{borderRadius: "10px", fontSize: "38px", maxWidth: "40%"}}
                            placeholder="Название задачи"
                            name="feedback"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                        : <Typography.Title editable={{triggerType:"text"}} style={{textAlign: "left",maxWidth: "40%"}}>{plan.title}</Typography.Title>
                    }
                    {/*<Typography.Title >{plan.title}</Typography.Title>*/}
                    {/*<Tag color="default" icon={<ClockCircleOutlined/>}>{TimeUtil.toDate(plan.dueTo)}</Tag>*/}
                    {/*<div style={{marginLeft: "auto"}}>Дата создания: {TimeUtil.toDate(plan.createDt)}</div>*/}
                    {/*<div style={{marginLeft: "auto"}}>Дата завершения: {TimeUtil.toDate(plan.dueTo)}</div>*/}
                    <Space style={{marginLeft: "auto"}}>
                        {!editMode && (plan.accessType ==='Write' || plan.accessType ==='Owner') &&
                            <Button onClick={() => setEditMode(true)}>Редактировать</Button>
                        }
                        {editMode && <Button type="primary" onClick={submitEdit}>Сохранить</Button>}
                        {editMode && <Button onClick={cancelEdit}>Отменить</Button>}
                        {plan.accessType ==='Owner' && <AccessList plan={plan}/>}
                        {plan.accessType==='Owner' && <ShareForm plan={plan}/>}
                        <TasksHistory plan={plan}/>
                        <NewTask plan={plan} setChanged={needRefresh}/>
                    </Space>
                </div>
            }
            {tasksLoading
                ? <LoadingIndicator/>
                : <div style={{maxWidth: "700px", marginTop: "10px"}}>
                    {tasks.map(task =>
                        <div>
                            <Task2 task={task} setChanged={needRefresh} key={task.id}/>
                        </div>
                    )}
                </div>
            }
            {!tasksLoading && tasks.length === 0 &&
                <Result icon={<InfoCircleOutlined/>} title="Создайте задачи!"/>
            }
        </div>
    );
};

export default PlanPage;