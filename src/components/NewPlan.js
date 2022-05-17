import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, Modal, notification} from "antd"
import moment from "moment";
import PlanService from "../api/PlanService";

import "./NewPlan.css"

const FormItem = Form.Item;

const NewPlan = (props) => {

    const dateFormat = "YYYY-MM-DD"

    const [title, setTitle] = useState("")
    const [dueDate, setDueDate] = useState('')

    const handleSubmit = () => {
        console.log("Создаю план")
        console.log(dueDate.calendar())
        console.log(dueDate.toNow())
        console.log(dueDate.format(dateFormat))
        console.log(dueDate.toISOString())
        console.log(dueDate)
        const request = {
            title: title,
            dueTo: `${dueDate.format(dateFormat)}T12:00:00.00Z`
        }
        PlanService.createPlan(request)
            .then(() => {
                clearState()
                props.setChanged()
                notification.success({
                    message: "PDP",
                    description: "План успешно создан!"
                })
            })
            .catch(error => {
                notification.error({
                    message: "PDP",
                    description: error.message
                })
            })
    }

    const clearState = () => {
        setTitle('')
        setDueDate('')
        setShowForm(false)
    }

    const [showForm, setShowForm] = useState(false)

    return (
        <div>
            <Button type="primary" onClick={() => setShowForm(true)}>Создать план развития</Button>
            <Modal
                visible={showForm}
                okText="Создать"
                cancelText="Отменить"
                okButtonProps={{disabled: (title === '' || dueDate === '')}}
                onOk={handleSubmit}
                onCancel={clearState}>
                <Form layout={"horizontal"} style={{marginTop: "10px"}} labelCol={{span: 7}} wrapperCol={{span: 14}}>
                    <FormItem label="Название">
                        <Input
                            placeholder="Введите название плана развития"
                            name="title"
                            autoComplete="off"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                    </FormItem>
                    <FormItem label="Дата завершения">
                        <DatePicker
                            allowClear={false}
                            placeholder="Выберите дату"
                            style={{width: 150}}
                            format={dateFormat}
                            defaultValue={dueDate}
                            value={dueDate}
                            disabledDate={d => !d || d.isBefore(moment())}
                            onChange={(e) => setDueDate(e)}/>
                    </FormItem>
                </Form>
            </Modal>
        </div>
);
};

export default NewPlan;