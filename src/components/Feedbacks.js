import React, {useEffect, useState} from 'react';
import FeedbackService from "../api/FeedbackService";
import NotificationComponent from "../common/NotificationComponent";
import {Avatar, Button, Comment, Form, Input, List, Result, Tooltip} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import TimeUtil from "../common/TimeUtil";
import LoadingIndicator from "../common/LoadingIndicator";
import {InfoCircleOutlined} from "@ant-design/icons";

const {TextArea} = Input

const Feedbacks = (props) => {

    const [feedbacks, setFeedbacks] = useState()
    const [feedbacksLoading, setFeedbacksLoading] = useState(true)

    const fetchFeedbacks = () => {
        FeedbackService.getByTask(props.task.id)
            .then(response => {
                setFeedbacks(response)
                setFeedbacksLoading(false)
                // needRefresh()
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
        fetchFeedbacks()
    }, [fetchState])

    const avatarTitle = (u) => {
        const name = u.authorName.charAt(0)
        const surname = u.authorSurname.charAt(0)
        return `${name}${surname}`
    }

    const FeedbackList = ({feedbacks}) => (
        <List
            dataSource={feedbacks}
            itemLayout="horizontal"
            renderItem={f => <Comment
                avatar={<Avatar>{avatarTitle(f)}</Avatar>}
                author={<Tooltip title={f.authorEmail}>{f.authorName} {f.authorSurname}</Tooltip>}
                content={<Paragraph style={{whiteSpace: "pre-line", textAlign:"left", justifyContent: "flex-start"}}>{f.text}</Paragraph>}
                datetime={TimeUtil.toDateTime(f.createDt)}/>
            }
        />
    )

    const [newFeedback, setNewFeedback] = useState('')
    const sendFeedback = () => {
        const request = {
            requestId: props.task.feedbackRequestId,
            text: newFeedback
        }
        FeedbackService.send(request)
            .then(response => {
                // NotificationComponent.success("???????????? ????????????????")
                props.setChanged()
                setNewFeedback('')
                needRefresh()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    if (!feedbacksLoading && feedbacks.length === 0 && !props.task.feedbackRequested) {
        return <Result icon={<InfoCircleOutlined/>} title="?????????? ???????????????? ???????????????? ?????????? ???? ????????????"/>
    }

    return (
        <div>
            {feedbacksLoading && <LoadingIndicator/>
                // : <FeedbackList feedbacks={feedbacks}/>
            }
            {!feedbacksLoading && feedbacks.length > 0 &&
                <FeedbackList feedbacks={feedbacks}/>
            }
            {!feedbacksLoading && feedbacks.length === 0 && !props.task.feedbackRequested &&
                <Result icon={<InfoCircleOutlined/>} title="?????????? ???????????????? ???????????? ???? ????????????"/>
            }
            {props.task.feedbackRequested &&
                <Form>
                    <Form.Item>
                        <TextArea rows={4}
                                  style={{borderRadius: "10px"}}
                                  placeholder="?????????????? ??????????"
                                  name="comment"
                                  autoComplete="off"
                                  value={newFeedback}
                                  onChange={(e) => setNewFeedback(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' disabled={newFeedback === ''} onClick={sendFeedback}>??????????????????</Button>
                    </Form.Item>
                </Form>
            }
        </div>
    );
};

export default Feedbacks;