import React, {useEffect, useState} from 'react';
import NotificationSettingsService from "../api/NotificationSettingsService";
import NotificationComponent from "../common/NotificationComponent";
import {Select, Switch} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";

const {Option} = Select

const NotificationsSettings = () => {

    const [settings, setSettings] = useState()
    const [settingsLoaded, setSettingsLoaded] = useState(false)
    const [fetchState, setFetchState] = useState(0)

    const fetchSettings = () => {
        setSettingsLoaded(false)
        NotificationSettingsService.get()
            .then(response => {
                setSettings(response)
                setSettingsLoaded(true)
            })
            .catch(error => NotificationComponent.error(error.message))
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
                .then(() => {
                    NotificationComponent.success("Напоминания включены")
                    needFetch()
                })
                .catch(error => NotificationComponent.error(error.message))
        } else {
            NotificationSettingsService.disable()
                .then(() => {
                    NotificationComponent.success("Напоминания выключены")
                    needFetch()
                })
                .catch(error => NotificationComponent.error(error.message))
        }
    }

    const handleDaysBeforeDeadlineChange = (value) => {
        console.log(`Selected ${value}`)
        const request = {
            days: parseInt(value)
        }
        NotificationSettingsService.editDeadlineSettings(request)
            .then(() => {
                NotificationComponent.success("Напоминания о сроках изменены")
                needFetch()
            })
            .catch(error => NotificationComponent.error(error.message))
    }

    const handleDaysBeforeReportChange = (value) => {
        console.log(`Selected ${value}`)
        const request = {
            days: parseInt(value)
        }
        NotificationSettingsService.editReportSettings(request)
            .then(() => {
                NotificationComponent.success('Напоминания об отчетах изменены')
                needFetch()
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    return (
        <div style={{fontSize: 20}}>
            {settingsLoaded
                ? <div style={{textAlign: "left"}}>
                    <div>
                        Напоминания: <Switch style={{marginLeft: "10px"}} checked={settings.enabled} onChange={handleEnableChange}/>
                    </div>
                    {settings.enabled &&
                        <div>
                            <div style={{marginTop: "10px"}}>
                                Напоминания о сроках:
                                <Select style={{marginLeft: "10px"}} defaultValue={settings.daysBeforeDeadline.toString()} onChange={handleDaysBeforeDeadlineChange}>
                                    <Option value="1">За 1 день</Option>
                                    <Option value="2">За 2 дня</Option>
                                    <Option value="3">За 3 дня</Option>
                                    <Option value="4">За 4 дня</Option>
                                    <Option value="5">За 5 дней</Option>
                                    <Option value="6">За 6 дней</Option>
                                    <Option value="7">За 7 дней</Option>
                                </Select>
                            </div>
                            <div style={{marginTop: "10px"}}>
                                Напоминания об отчетах:
                                <Select style={{marginLeft: "10px"}} defaultValue={settings.daysBeforeReport.toString()} onChange={handleDaysBeforeReportChange}>
                                    <Option value="7">Каждые 7 дней</Option>
                                    <Option value="14">Каждые 14 дней</Option>
                                    <Option value="30">Каждые 30 дней</Option>
                                </Select>
                            </div>
                        </div>
                    }
                </div>
                : <LoadingIndicator/>
            }
        </div>
    );
};

export default NotificationsSettings;