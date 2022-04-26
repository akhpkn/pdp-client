import React, {useEffect, useState} from 'react';
import TeamService from "../api/TeamService";
import {Button, Form, Input} from "antd";
import NotificationComponent from "../common/NotificationComponent";

const TeamPage = () => {

    const [team, setTeam] = useState(null)

    const [newTeamTitle, setNewTeamTitle] = useState('')
    const [newTeamDescription, setNewTeamDescription] = useState('')

    const [teamFound, setTeamFound] = useState(false)

    const [needFetch, setNeedFetch] = useState(false)

    const fetchTeam = () => {
        TeamService.getMyTeam()
            .then(response => {
                setTeam(response)
                setTeamFound(true)
            })
            .catch(error => {
                if (error.message === "Team not found") {
                    setTeam(null)
                } else {
                    NotificationComponent.error(error.message)
                }
            })
    }

    const createTeam = () => {
        const request = {
            title: newTeamTitle,
            description: newTeamDescription
        }
        TeamService.create(request)
            .then(response => {
                NotificationComponent.success("Команда создана!")
                setNeedFetch(true)
            })
            .catch(error => {
                NotificationComponent.error(error.message)
            })
    }

    useEffect(() => {
        fetchTeam()
    }, [needFetch])

    return (
        <div>
            {teamFound
                ? <div>
                    <h1>Моя команда:</h1>
                    <div>{`${team.title}`}</div>
                    <div>{`${team.description}`}</div>
                    <div>{`Руководитель: ${team.leadName} ${team.leadSurname}`}</div>
                    <div>Участники:</div>
                    {team.users.map(user =>
                        <div>{`${user.name} ${user.surname}`}</div>
                    )}
                </div>
                : <div>
                    <h1>Создайте команду</h1>
                    <Form>
                        <Form.Item>
                            <Input
                                placeholder="Название команды"
                                name="teamTitle"
                                value={newTeamTitle}
                                onChange={(e) => setNewTeamTitle(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                placeholder="Описание команды"
                                name="teamDescription"
                                value={newTeamDescription}
                                onChange={(e) => setNewTeamDescription(e.target.value)}
                            />
                        </Form.Item>
                        <Button onClick={createTeam}>Сохранить</Button>
                    </Form>
                </div>
            }
        </div>
    );
};

export default TeamPage;