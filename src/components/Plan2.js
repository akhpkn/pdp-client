import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Progress, Row, Space, Statistic, Tooltip, Typography} from "antd";
import TimeUtil from "../common/TimeUtil";
import {DeleteOutlined} from "@ant-design/icons";
import PlanService from "../api/PlanService";
import NotificationComponent from "../common/NotificationComponent";

const Plan2 = (props) => {

    const doneCnt = () => {
        return props.plan.tasksCompleted
    }
    const inProgressCnt = () => {
        return props.plan.tasksInProgress
    }
    const toDoCnt = () => {
        return props.plan.tasksTotal - props.plan.tasksCompleted - props.plan.tasksInProgress
    }
    const totalCnt = () => {
        return props.plan.tasksTotal
    }

    const navigate = useNavigate()

    const openPlan = () => {
        navigate(`/plan/${props.plan.id}`)
    }

    const deletePlan = () => {
        PlanService.delete(props.plan.id)
            .then(() => {
                props.setChanged()
                NotificationComponent.success("План удален")
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    const colors = {
        completed: "#39da47",
        toDo: "#f5bc66",
        inProgress: "#1da8d2"
    }

    return (
        // style={{ marginTop: "30px", marginBottom: "30px", minWidth: "600px", maxWidth: "600px", margin: "10px auto", border: "1px ridge #c5cad3", boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)", borderRadius: "10px"}}
        <div style={{marginBottom: "30px", minWidth: "600px", maxWidth: "600px", border: "1px ridge #c5cad3", boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)", borderRadius: "10px"}}>
            {/*<Link to={`/plan/${props.plan.id}`}><Typography.Title style={{ marginLeft: "10px", textAlign:"left"}}>{props.plan.title}</Typography.Title></Link>*/}
            {/*{props.plan.userEmail*/}
            {/*    ? <Typography.Paragraph>Автор: {props.plan.userName} {props.plan.userSurname}</Typography.Paragraph>*/}
            {/*    : null*/}
            {/*}*/}
            {/*<Button onClick={() => navigate(`/plan/${props.plan.id}`)} ghost style={{height: "auto", width: "600px", border: "transparent"}}>*/}
            <div style={{display: "flex", marginTop: "5px", alignItems: "baseline"}}>
                <Typography.Title level={3} style={{ display: "flex", marginLeft: "10px", textAlign: "left", maxWidth: "600px"}}>{props.plan.title}</Typography.Title>
                <Space style={{marginLeft: "auto", marginRight: "10px"}}>
                    <Button onClick={openPlan}>Открыть</Button>
                    {props.owned &&
                        <Button icon={<DeleteOutlined/>} onClick={deletePlan}/>
                    }
                </Space>
            </div>
                {props.plan.userEmail
                    ? <Typography.Paragraph style={{marginLeft: "10px", fontSize: 16, textAlign: "left"}}>Автор: {props.plan.userName} {props.plan.userSurname}</Typography.Paragraph>
                    : null
                }
            <Typography.Paragraph style={{marginLeft: "10px", fontSize: 16, textAlign: "left"}}>{`Дата создания: ${TimeUtil.toDate(props.plan.createDt)}`}</Typography.Paragraph>
            <Typography.Paragraph style={{marginLeft: "10px", fontSize: 16, textAlign: "left"}}>{`Дата завершения: ${TimeUtil.toDate(props.plan.dueTo)}`}</Typography.Paragraph>
            <Tooltip title={`${doneCnt()} выполнено / ${inProgressCnt()} в работе / ${toDoCnt()} todo`}>
                <Progress showInfo={false} style={{marginLeft: "10px", width: "300px"}} percent={(inProgressCnt() + doneCnt()) / totalCnt() * 100} successPercent={doneCnt() / totalCnt() * 100}/>
            </Tooltip>
        </div>
    );
};

//strokeColor={colors.inProgress} success={{strokeColor: colors.completed}} trailColor={colors.toDo}

export default Plan2;