import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Mentions, notification, Select} from "antd";
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

const { Option } = Mentions;

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
    // const plan = {
    //     title: "Мой план",
    // }
    const fetchPlan = () => {
        PlanService.getPlan(params.id)
            .then(response => {
                console.log(response)
                setPlan(response)
                setPlanLoading(false)
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

    // console.log("Tasks:")
    // console.log(tasks)
    // const [tasks, setTasks] = useState([])

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [newTaskDescription, setNewTaskDescription] = useState("")
    const [newTaskAcceptanceCriteria, setNewTaskAcceptanceCriteria] = useState("")
    const dateFormat = "YYYY-MM-DD"
    const [dueDate, setDueDate] = useState(moment())

    const addNewTask = () => {
        const request = {
            title: newTaskTitle,
            description: newTaskDescription,
            acceptanceCriteria: newTaskAcceptanceCriteria,
            planId: params.id,
            dueTo: `${dueDate.format(dateFormat)}T12:00:00.00Z`
        }
        console.log(fetchState)
        TaskService.createTask(request)
            .then(response => {
                notification.success({
                    message: "PDP",
                    description: "Таск успешно создан"
                })
                needRefresh()
                console.log(fetchState)
            })
            .catch(error => {
                console.log(error)
                console.log(error.message)
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                needRefresh()
                console.log(fetchState)
            })
    }

    const needRefresh = () => {
        console.log("Need refresh")
        setFetchState(fetchState + 1)
    }

    const [shareClicked, setShareClicked] = useState(false)

    const handleShareButtonClick = () => {
        setShareClicked(true)
    }

    const [users, setUsers] = useState([])
    const [usersLoading, setUsersLoading] = useState(false)

    const loadUsersByEmail = (email) => {
        setUsersLoading(true)
        setUsers([])
        UserService.loadUsersByEmail(email)
            .then(response => {
                console.log(response)
                setUsers(response)
                setUsersLoading(false)
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

    const sharePlan = (userId) => {
        const request = {
            planId: plan.id,
            userId: userId,
            type: accessType
        }
        SharingService.share(request)
            .then(response => {
                notification.success({
                    message: "PDP",
                    description: "Вы поделились планом развития"
                })
            })
            .catch(error => {
                notification.error({
                    message: "PDP",
                    description: error.message
                })
            })
    }

    const submitShare = () => {
        setShareClicked(false)
        sharePlan(selectedUserIdForShare)
    }

    const handleShareClose = () => {
      setShareClicked(false)
    }

    const onSearch = search => {
        loadUsersByEmail(search)
    }

    const [selectedUserIdForShare, setSelectedUserIdForShare] = useState("")

    const onSelect = (option, prefix) => {
        console.log(option)
        console.log(prefix)
        setSelectedUserIdForShare(option.key)
    }

    const [accessType, setAccessType] = useState("Read")

    return (
        <div>
            {planLoading
                ? <LoadingIndicator/>
                : <h1>{plan.title}</h1>
            }
            {shareClicked
                ? <div>
                    <Mentions loading={usersLoading} onSearch={onSearch} onSelect={onSelect}>
                        {users.map(user =>
                            <Option key={user.id} value={user.email}>
                                <span>{user.email}</span>
                            </Option>
                        )
                        }
                    </Mentions>
                <Select defaultValue="Read" onChange={setAccessType}>
                    <Option value="Read">Чтение</Option>
                    <Option value="Write">Запись</Option>
                </Select>
                <Button onClick={submitShare}>Подтвердить</Button>
                <Button onClick={handleShareClose}>Закрыть</Button>
                </div>
                : null
            }
            <Button onClick={handleShareButtonClick}>Поделиться</Button>
            <h1>Задачи</h1>
            {tasksLoading
                ? <LoadingIndicator/>
                : <div>
                    {tasks.map(task =>
                        <div>
                            <Task task={task} setChanged={needRefresh} key={task.id}/>
                            <Button onClick={() => navigate(`/task/${task.id}`)}>
                                 Раскрыть
                             </Button>
                        </div>
                    )}
                </div>
            }
            <h1>История изменений</h1>
            {auditLoading
                ? <LoadingIndicator/>
                : <div>
                    {audit.map(event =>
                        <div>{` ${TimeUtil.toDateTimeWithMs(event.dateTime)} Задача ${event.taskTitle} в статусе ${event.status}`}</div>
                    )}
                </div>
            }
            <h1>Создать задачу</h1>
            <Form>
                <Form.Item>
                    <Input
                        placeholder="Название задачи"
                        name="title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Описание задачи"
                        name="description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Критерии приема"
                        name="acceptanceCriteria"
                        value={newTaskAcceptanceCriteria}
                        onChange={(e) => setNewTaskAcceptanceCriteria(e.target.value)}/>
                </Form.Item>
                Срок завершения
                <Form.Item>
                    <DatePicker
                        format={dateFormat}
                        defaultValue={dueDate}
                        value={dueDate}
                        onChange={(e) => setDueDate(e)}
                    />
                </Form.Item>
                <Button onClick={addNewTask}>Сохранить</Button>
            </Form>
        </div>
    );
};

export default PlanPage;