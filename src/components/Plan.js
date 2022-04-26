import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Col, Row, Statistic} from "antd";
import moment from "moment";

const Plan = (props) => {

    const navigate = useNavigate()

    const toDate = (instant) => {
        // const date = moment(instant, 'YYYY-MM-DD')
        return moment.unix(instant).format("YYYY-MM-DD")
        // return date
    }

    return (
        <div>
            <div>
                <strong>{props.plan.title}</strong>
                {props.plan.userEmail
                    ? <div>Автор: {props.plan.userName} {props.plan.userSurname}</div>
                    : null
                }
                <div>Дата создания: {toDate(props.plan.createDt)}</div>
                <div>Дата завершения: {toDate(props.plan.dueTo)}</div>
                {props.plan.tasksTotal
                    ? <div>
                        <Row justify={"center"} type="flex" align="middle">
                            <Col>
                                <Statistic title="Задач в работе" value={props.plan.tasksInProgress} suffix={`/ ${props.plan.tasksTotal - props.plan.tasksCompleted}`}/>
                            </Col>
                            <Col offset={1}>
                                <Statistic title="Задач выполнено" value={props.plan.tasksCompleted} suffix={`/ ${props.plan.tasksTotal}`}/>
                            </Col>
                        </Row>
                    </div>
                    : null
                }
            </div>
            <div>
                <Button onClick={() => navigate(`/plan/${props.plan.id}`)}>
                    Открыть
                </Button>
            </div>
        </div>
    );
};

export default Plan;