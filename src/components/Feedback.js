import React from 'react';
import {Typography} from "antd";
import TimeUtil from "../common/TimeUtil";

const {Paragraph} = Typography

const Feedback = (props) => {
    return (
        <div>
            <Paragraph>{props.feedback.authorName} {props.feedback.authorSurname} {TimeUtil.toDateTime(props.feedback.createDt)}</Paragraph>
            <Paragraph>{props.feedback.text}</Paragraph>
        </div>
    );
};

export default Feedback;