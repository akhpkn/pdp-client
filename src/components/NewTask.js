import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, Modal, notification} from "antd";
import TaskService from "../api/TaskService";
import TimeUtil from "../common/TimeUtil";
import plan from "./Plan";
import moment from "moment";

const {TextArea} = Input

const NewTask = (props) => {

    const [showCreateTask, setShowCreateTask] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
    const [newTaskAcceptanceCriteria, setNewTaskAcceptanceCriteria] = useState('')
    const [dueDate, setDueDate] = useState('')

    const dateFormat = "YYYY-MM-DD"

    const minDate = TimeUtil.toDate(props.plan.createDt)
    const maxDate = TimeUtil.toDate(props.plan.dueTo)

    const addNewTask = () => {
        const request = {
            title: newTaskTitle,
            description: newTaskDescription,
            acceptanceCriteria: newTaskAcceptanceCriteria,
            planId: props.plan.id,
            dueTo: `${dueDate.format(dateFormat)}T12:00:00.00Z`
        }
        // console.log(fetchState)
        TaskService.createTask(request)
            .then(response => {
                notification.success({
                    message: "PDP",
                    description: "Таск успешно создан"
                })
                props.setChanged()
                setNewTaskTitle('')
                setNewTaskAcceptanceCriteria('')
                setNewTaskDescription('')
                setDueDate('')
            })
            .catch(error => {
                console.log(error)
                console.log(error.message)
                notification.error({
                    message: "PDP",
                    description: error.message
                })
            })
    }


    return (
        <div>
            <Button onClick={() => setShowCreateTask(!showCreateTask)}>Создать задачу</Button>
            <Modal okText="Создать" cancelText="Отменить" visible={showCreateTask} onCancel={() => setShowCreateTask(false)} onOk={() => {addNewTask(); setShowCreateTask(false)}}>
                <Form style={{marginTop: "30px"}} labelCol={{span: 7}} wrapperCol={{span: 16}}>
                    <Form.Item label="Название">
                        <Input
                            style={{borderRadius: "10px"}}
                            placeholder="Введите название задачи"
                            name="title"
                            autoComplete="off"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Описание">
                        <TextArea style={{whitespace: "pre-wrap", borderRadius: "10px"}} rows={4}
                                  placeholder="Расскажите подробнее о том, что предстоит сделать"
                                  name="description"
                                  autoComplete="off"
                                  value={newTaskDescription}
                                  onChange={(e) => setNewTaskDescription(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Критерии приема">
                        <TextArea style={{whitespace: "pre-wrap", borderRadius: "10px"}} rows={4}
                                  placeholder="Расскажите, как вы сможете оценить готовность задачи"
                                  name="acceptanceCriteria"
                                  autoComplete="off"
                                  value={newTaskAcceptanceCriteria}
                                  onChange={(e) => setNewTaskAcceptanceCriteria(e.target.value)}/>
                    </Form.Item>
                    {/*Срок завершения*/}
                    <Form.Item label="Срок завершения">
                        <DatePicker
                            placeholder="Выберите дату"
                            style={{width: 150, borderRadius: "10px"}}
                            format={dateFormat}
                            defaultValue={dueDate}
                            value={dueDate}
                            onChange={(e) => setDueDate(e)}
                            disabledDate={d => !d || d.isBefore(moment()) || d.isAfter(maxDate)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NewTask;