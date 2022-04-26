import React, {useState} from 'react';
import {Button, Typography} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import CommentService from "../api/CommentService";
import NotificationComponent from "../common/NotificationComponent";
import moment from "moment";

const { Paragraph } = Typography

const Comment = (props) => {

    const [text, setText] = useState(props.comment.text)
    const [showSave, setShowSave] = useState(false)

    const handleTextChange = (newText) => {
        setText(newText)
        if (newText !== props.comment.text) {
            console.log("Comment changed")
            setShowSave(true)
        } else {
            console.log("Comment not changed")
            setShowSave(false)
        }
    }

    const handleDelete = () => {
        CommentService.delete(props.comment.id)
            .then(response => {
                NotificationComponent.success("Комментарий удален")
                props.setChanged()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    const handleCommentUpdate = () => {
        const request = {
            text: text
        }
        CommentService.update(props.comment.id, request)
            .then(response => {
                NotificationComponent.success("Комментарий сохранен!")
                setShowSave(false)
                props.setChanged()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    const toDateTime = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD HH:mm")
    }

    return (
        <div>
            <div>
                <Paragraph>{props.comment.userName} {props.comment.userSurname} {toDateTime(props.comment.createDt)}</Paragraph>
            </div>
            {props.comment.readOnly
                ? <Paragraph>{text}</Paragraph>
                : <Paragraph editable={{onChange: handleTextChange, triggerType: "text"}}>{text}</Paragraph>
            }
            <div>
                <Button onClick={handleDelete} icon={<DeleteOutlined/>}/>
                {showSave
                    ? <Button onClick={handleCommentUpdate}>Сохранить</Button>
                    : null
                }
            </div>
        </div>
    );
};

export default Comment;