import React, {useEffect, useState} from 'react';
import NotificationSettingsService from "../api/NotificationSettingsService";
import NotificationComponent from "../common/NotificationComponent";
import {Select, Switch} from "antd";

const {Option} = Select

const NotificationSettingsPage = () => {

    const [settings, setSettings] = useState({})

    const [fetchState, setFetchState] = useState(0)

    const fetchSettings = () => {
        NotificationSettingsService.get()
            .then(response => {
                setSettings(response)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    useEffect(() => {
        fetchSettings()
    }, [fetchState])

    const needFetch = () => {
      setFetchState(fetchState + 1)
    }

    const handleEnableChange = (checked) => {
        console.log(`Switched to ${checked}`)
        if (checked === true) {
            NotificationSettingsService.enable()
                .then(response => {
                    NotificationComponent.success("Напоминания включены")
                    needFetch()
                })
                .catch(error => {
                    NotificationComponent.error(error.message)
                })
        } else {
            NotificationSettingsService.disable()
                .then(response => {
                    NotificationComponent.success("Напоминания выключены")
                    needFetch()
                })
                .catch(error => {
                    NotificationComponent.error(error.message)
                })
        }
    }

    const handleDaysBeforeDeadlineChange = (value) => {
        console.log(`Selected ${value}`)
        const request = {
            days: parseInt(value)
        }
        NotificationSettingsService.editDeadlineSettings(request)
            .then(response => {
                NotificationComponent.success('Напоминания о дедлайнах изменены')
                needFetch()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    const handleDaysBeforeReportChange = (value) => {
        console.log(`Selected ${value}`)
        const request = {
            days: parseInt(value)
        }
        NotificationSettingsService.editReportSettings(request)
            .then(response => {
                NotificationComponent.success('Напоминания об отчетах изменены')
                needFetch()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    return (
        <div>
            <div>Напоминания</div>
            <Switch checked={settings.enabled} onChange={handleEnableChange}/>
            <div>
                {settings.enabled
                    ? <div>
                        <div>Напоминания о сроках</div>
                        <Select defaultValue={settings.daysBeforeDeadline.toString()} onChange={handleDaysBeforeDeadlineChange}>
                            <Option value="1">За 1 день</Option>
                            <Option value="2">За 2 дня</Option>
                            <Option value="3">За 3 дня</Option>
                        </Select>
                        <div>Напоминания об отчетах по задачам</div>
                        <Select defaultValue={settings.daysBeforeReport.toString()} onChange={handleDaysBeforeReportChange}>
                            <Option value="7">Каждую неделю</Option>
                            <Option value="14">Каждые 2 недели</Option>
                            <Option value="30">Каждый месяц</Option>
                        </Select>
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

export default NotificationSettingsPage;