import React, {useEffect, useState} from 'react';
import {Avatar, Button, Comment, Form, Input, List} from "antd";
import CommentService from "../api/CommentService";
import NotificationComponent from "../common/NotificationComponent";
import TimeUtil from "../common/TimeUtil";
import LoadingIndicator from "../common/LoadingIndicator";
import Paragraph from "antd/es/typography/Paragraph";

const {TextArea} = Input

const Comments = (props) => {

    const avatarTitle = (u) => {
        const name = u.userName.charAt(0)
        const surname = u.userSurname.charAt(0)
        return `${name}${surname}`
    }

    const CommentList = ({comments}) => (
        <List
            dataSource={comments}
            itemLayout="horizontal"
            renderItem={comm => <Comment
                // style={{border: "2px ridge #c5cad3", width: "auto"}}
                avatar={<Avatar>{avatarTitle(comm)}</Avatar>}
                author={`${comm.userName} ${comm.userSurname}`}
                content={<Paragraph style={{whiteSpace: "pre-line", textAlign:"left", display: "flex", justifyContent: "flex-start"}}>{comm.text}</Paragraph>}
                // content={<p style={{display: "flex"}}>{comm.text}</p>}
                datetime={TimeUtil.toDateTime(comm.createDt)}/>}
        />
    )

    const [comments, setComments] = useState()
    const [commentsLoading, setCommentsLoading] = useState(true)

    const fetchComments = () => {
        CommentService.getByTask(props.task.id)
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
    const addComment = () => {
        const request = {
            text: newComment,
            taskId: props.task.id
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

    const [fetchState, setFetchState] = useState(0)
    const needRefresh = () => {
        setFetchState(fetchState + 1)
    }

    useEffect(() => {
        fetchComments()
    }, [fetchState])

    return (
        <div style={{marginRight: "40%"}}>
            {commentsLoading && <LoadingIndicator/>
                // : <CommentList comments={comments}/>
            }
            {!commentsLoading && comments.length > 0 && <CommentList comments={comments}/>

            }
            {/*{!commentsLoading && comments.length===0*/}
            {/*    */}
            {/*}*/}
            <Form>
                <Form.Item>
                    <TextArea rows={4}
                              placeholder="Введите текст"
                              name="comment"
                              autoComplete="off"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' disabled={newComment === ''} onClick={addComment}>Добавить комментарий</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Comments;