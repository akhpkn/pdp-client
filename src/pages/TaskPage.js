import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskService from "../api/TaskService";
import NotificationComponent from "../common/NotificationComponent";
import CommentService from "../api/CommentService";
import LoadingIndicator from "../common/LoadingIndicator";
import Task from "../components/Task";
import Comment from "../components/Comment";
import {Badge, Button, Form, Input, Tabs, Tooltip} from "antd";
import Feedback from "../components/Feedback";
import FeedbackService from "../api/FeedbackService";
import Comments from "../components/Comments";
import Feedbacks from "../components/Feedbacks";
import Task3 from "../components/Task3";

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

    return (
        //style={{marginTop: "30px", marginLeft: "80px", marginRight: "60px"}}
        <div style={{marginTop: "30px", marginLeft: "10px"}}>
            {taskLoading
                ? <LoadingIndicator/>
                : <Task3 task={task} setChanged={needRefresh}/>
            }
            <Tabs defaultActiveKey={'none'}>
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