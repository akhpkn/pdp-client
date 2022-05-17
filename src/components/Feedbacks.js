import React, {useEffect, useState} from 'react';
import FeedbackService from "../api/FeedbackService";
import NotificationComponent from "../common/NotificationComponent";
import {Avatar, Button, Comment, Form, Input, List, Result} from "antd";
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
                author={`${f.authorName} ${f.authorSurname}`}
                content={<Paragraph style={{whiteSpace: "pre-line", textAlign:"left", display: "flex", justifyContent: "flex-start"}}>{f.text}</Paragraph>}
                datetime={TimeUtil.toDateTimeWithMs(f.createDt)}/>
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
                NotificationComponent.success("Фидбек оправлен")
                props.setChanged()
                setNewFeedback('')
                needRefresh()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    if (!feedbacksLoading && feedbacks.length === 0 && !props.task.feedbackRequested) {
        return <Result icon={<InfoCircleOutlined/>} title="Здесь появится обратная связь по задаче"/>
    }

    return (
        <div style={{marginRight: "40%"}}>
            {feedbacksLoading && <LoadingIndicator/>
                // : <FeedbackList feedbacks={feedbacks}/>
            }
            {!feedbacksLoading && feedbacks.length > 0 &&
                <FeedbackList feedbacks={feedbacks}/>
            }
            {!feedbacksLoading && feedbacks.length === 0 && !props.task.feedbackRequested &&
                <Result icon={<InfoCircleOutlined/>} title="Здесь появятся отзывы по задаче"/>
            }
            {props.task.feedbackRequested &&
                <Form>
                    <Form.Item>
                        <TextArea rows={4}
                                  placeholder="Введите текст"
                                  name="comment"
                                  autoComplete="off"
                                  value={newFeedback}
                                  onChange={(e) => setNewFeedback(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' disabled={newFeedback === ''} onClick={sendFeedback}>Отправить</Button>
                    </Form.Item>
                </Form>
            }
        </div>
    );
};

export default Feedbacks;