import React, {useEffect, useState} from 'react';
import {Button, Drawer, Timeline} from "antd";
import TaskAuditService from "../api/TaskAuditService";
import NotificationComponent from "../common/NotificationComponent";
import LoadingIndicator from "../common/LoadingIndicator";
import TimeUtil from "../common/TimeUtil";
import {HistoryOutlined} from "@ant-design/icons";

const TasksHistory = (props) => {

    const [showHistory, setShowHistory] = useState(false)

    const [audit, setAudit] = useState([])
    const [auditLoading, setAuditLoading] = useState(true)

    const fetchAudit = () => {
        TaskAuditService.listByPlan(props.plan.id)
            .then(response => {
                setAudit(response)
                setAuditLoading(false)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
                setAudit([])
                setAuditLoading(false)
            })
    }

    useEffect(() => {
        fetchAudit()
    }, [props.plan])

    const getColor = (auditEvent) => {
        if (auditEvent.status === "New" && isFirstEvent(auditEvent)) return "gray"
        if (auditEvent.status === "New") return "orange"
        if (auditEvent.status === "InProgress") return "blue"
        if (auditEvent.status === "Completed") return "green"
    }

    const isFirstEvent = (auditEvent) => {
        const firstEvent = audit.filter(a => a.taskId === auditEvent.taskId)[0]
        if (auditEvent === firstEvent) {
            return true
        } else {
            return false
        }
    }

    const getDescription = (auditEvent) => {
        if (auditEvent.status === "New" && isFirstEvent(auditEvent)) {
            return `Задача ${auditEvent.taskTitle} создана`
        }
        if (auditEvent.status === "New") {
            return `Задача ${auditEvent.taskTitle} отложена`
        }
        if (auditEvent.status === "InProgress") {
            return `Задача ${auditEvent.taskTitle} взята в работу`
        }
        if (auditEvent.status === "Completed") {
            return `Задача ${auditEvent.taskTitle} завершена`
        }
    }

    return (
        <div>
            <Button icon={<HistoryOutlined/>} onClick={() => setShowHistory(true)}/>
            <Drawer
                visible={showHistory}
                onClose={() => setShowHistory(false)}>
                {auditLoading
                    ? <LoadingIndicator/>
                    : <div>
                        <Timeline mode={"left"}>
                            {audit.map(event =>
                                <Timeline.Item color={getColor(event)} label={TimeUtil.toDateTimeWithMs(event.dateTime)}>{getDescription(event)}</Timeline.Item>
                            )}
                        </Timeline>
                    </div>
                }
                {!auditLoading && audit.length === 0 &&
                    <div>
                        Здесь появится история созданных задач
                    </div>
                }
            </Drawer>
        </div>
    );
};

export default TasksHistory;