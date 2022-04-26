import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TaskService from "../api/TaskService";
import NotificationComponent from "../common/NotificationComponent";
import CommentService from "../api/CommentService";
import LoadingIndicator from "../common/LoadingIndicator";
import Task from "../components/Task";
import Comment from "../components/Comment";
import {Button, Form, Input} from "antd";

const TaskPage = () => {

    const params = useParams()

    const [task, setTask] = useState({})
    const [comments, setComments] = useState([])

    const [taskLoading, setTaskLoading] = useState(true)
    const [commentsLoading, setCommentsLoading] = useState(true)

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

    const fetchComments = () => {
        CommentService.getByTask(params.id)
            .then(response => {
                console.log(response)
                setComments(response)
                setCommentsLoading(false)
            })
            .catch(error => {
                setComments([])
                setCommentsLoading(false)
                NotificationComponent.error(error.message)
            })
    }

    const [newComment, setNewComment] = useState('')

    const addNewComment = () => {
        const request = {
            text: newComment,
            taskId: task.id
        }
        CommentService.create(request)
            .then(response => {
                NotificationComponent.success("Комментарий добавлен!")
                needRefresh()
                setNewComment('')
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    useEffect( () => {
        console.log("Fetching data from backend")
        fetchTask()
        fetchComments()
    }, [fetchState])

    return (
        <div>
            {taskLoading
                ? <LoadingIndicator/>
                : <Task task={task} setChanged={needRefresh}/>
            }
            <h1>Комментарии</h1>
            {commentsLoading
                ? <LoadingIndicator/>
                : <div>
                    {comments.map(comment =>
                        <Comment comment={comment} setChanged={needRefresh} key={comment.id}/>
                    )}
                  </div>
            }
            <h1>Добавить комментарий</h1>
            <Form>
                <Form.Item>
                    <Input
                        placeholder="Введите текст"
                        name="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </Form.Item>
                <Button onClick={addNewComment}>Сохранить</Button>
            </Form>
        </div>
    );
};

export default TaskPage;