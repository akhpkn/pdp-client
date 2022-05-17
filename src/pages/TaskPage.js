import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskService from "../api/TaskService";
import NotificationComponent from "../common/NotificationComponent";
import LoadingIndicator from "../common/LoadingIndicator";
import {Badge, Tabs, Tooltip} from "antd";
import Comments from "../components/Comments";
import Feedbacks from "../components/Feedbacks";
import Task from "../components/Task";

const {TabPane} = Tabs

const TaskPage = () => {

    const params = useParams()

    const [task, setTask] = useState({})
    const [taskLoading, setTaskLoading] = useState(true)

    const [fetchState, setFetchState] = useState(0)

    const needRefresh = () => {
        console.log("Refreshing")
        setFetchState(fetchState + 1)
    }

    const fetchTask = () => {
        TaskService.getTask(params.id)
            .then(response => {
                console.log(response)
                setTask(response)
                setTaskLoading(false)
            })
            .catch(error => {
                setTask({})
                setTaskLoading(false)
                NotificationComponent.error(error.message)
            })
    }

    useEffect(() => {
        console.log("Fetching data from backend")
        fetchTask()
        // fetchComments()
    }, [fetchState])

    if (taskLoading) return <LoadingIndicator/>

    return (
        //style={{marginTop: "30px", marginLeft: "80px", marginRight: "60px"}}
        <div style={{marginTop: "30px", marginLeft: "10px"}}>
            {taskLoading
                ? <LoadingIndicator/>
                : <Task task={task} setChanged={needRefresh}/>
            }
            <Tabs style={{marginRight: "50%"}} defaultActiveKey={'none'}>
                <TabPane tab="Комментарии" key="Комментарии">
                    {!taskLoading && <Comments task={task}/>
                    }
                </TabPane>
                <TabPane
                    tab={task.feedbackRequested
                        ? <Tooltip title={"Оставьте обратную связь!"}>
                            <Badge dot>
                                Обратная связь
                            </Badge>
                        </Tooltip>
                        : "Обратная связь"
                    }
                    key="Обратная связь">
                    {!taskLoading &&
                        <Feedbacks setChanged={needRefresh} task={task}/>
                    }
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TaskPage;