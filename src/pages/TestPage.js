import React from 'react';
import moment from "moment";
import {Button, Select} from "antd";

import "./TestPage.css";

const {Option} = Select;

const TestPage = () => {

    const task = {
        title: "Задача 1",
        description: "Нужно много сделать",
        acceptanceCriteria: "Подготовлен доклад на тему",
        status: "InProgress",
        dueTo: moment().format("YYYY-MM-DD")
    }

    const tasks = [
        {
            title: "Задача 1",
            description: "Moment.js extends the native JavaScript date capabilities with a variety of features, such as relative time, calendar time, durations and multi-language support. It also has a decent list of plugins that allow for additional features like local time-zone support, recurrence and even Twitter integration.",
            acceptanceCriteria: "PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.",
            status: "InProgress",
            dueTo: moment().format("YYYY-MM-DD")
        },
        {
            title: "Задача 2",
            description: "You can edit time in hours, minutes, days based on specific or relative time and dates. Perhaps you need to display a countdown timer for the launch of your new indie game or for when your mixtape drops in the next year. Here are a few examples of how to use Moment.js",
            acceptanceCriteria: "Ant Design's design team preferred to design with the HSB color model, which makes it easier for designers to have a clear psychological expectation of color when adjusting colors, as well as facilitate communication in teams.",
            status: "New",
            dueTo: moment().format("YYYY-MM-DD")
        },
        {
            title: "Задача 3",
            description: "Instead of modifying the native Date.prototype, Moment.js creates a wrapper for the Date object. To get this wrapper object, simply call moment() with one of the supported input types.",
            acceptanceCriteria: "Подготовлен доклад на тему",
            status: "Completed",
            dueTo: moment().format("YYYY-MM-DD")
        }
    ]

    return (
        <div className="tasks-container">
            {tasks.map(task => (
                <div className="task-content">
                    <div className={"task-header"}>
                        <h1>{task.title}</h1>
                        {/*<div style={{marginLeft: "auto"}}>{task.status}</div>*/}
                        <Select style={{marginLeft: "auto"}} defaultValue={task.status} dropdownMatchSelectWidth={false} bordered={false} showArrow={false}>
                            <Option style={{maxWidth: "200px"}}  value="New">TO DO</Option>
                            <Option style={{maxWidth: "200px"}} value="InProgress">IN PROGRESS</Option>
                            <Option style={{maxWidth: "200px"}} value="Completed">COMPLETED</Option>
                        </Select>
                        <div style={{marginLeft: "auto"}}>До {task.dueTo}</div>
                        <Button style={{marginLeft: "auto", }}>Удалить</Button>
                        <Button style={{marginLeft: "20px"}}>Раскрыть</Button>
                    </div>
                    <div className={"task-info"}>
                        <div style={{fontSize: 16}}>Описание:</div>
                        <div>{task.description}</div>
                        <div style={{fontSize: 16, marginTop: "10px"}}>Критерии приема:</div>
                        <div>{task.acceptanceCriteria}</div>
                    </div>
                </div>
            ))}
            {/*<h1>{task.title}</h1>*/}
            {/*<div>Описание:</div>*/}
            {/*<div>{task.description}</div>*/}
            {/*<div>Критерии приема:</div>*/}
            {/*<div>{task.acceptanceCriteria}</div>*/}
            {/*<div>{task.status}</div>*/}
            {/*<div>Срок выполнения: {task.dueTo}</div>*/}
        </div>
    );
};

export default TestPage;