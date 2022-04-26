import React, {useState} from 'react';
import {Form, Input, Button, DatePicker, Layout, notification} from "antd"
import moment from "moment";
import PlanService from "../api/PlanService";
const FormItem = Form.Item;
const { TextArea } = Input
const {Content} = Layout

const NewPlan = () => {

    const dateFormat = "YYYY-MM-DD"

    const [title, setTitle] = useState("")
    const [dueDate, setDueDate] = useState(moment())

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
            .then(response => {
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

    return (
        <div>
            <Content>
            <Form>
                <FormItem>
                    <TextArea
                        placeholder="Введите название плана развития"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                </FormItem>
                Выберите дату завершения
                <FormItem>
                    <DatePicker
                        format={dateFormat}
                        defaultValue={dueDate}
                        value={dueDate}
                        onChange={(e) => setDueDate(e)}
                    />
                </FormItem>
            </Form>
            <Button onClick={handleSubmit} type="primary">Button</Button>
            </Content>
        </div>
    );
};

export default NewPlan;