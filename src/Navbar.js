import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button, Menu} from "antd";
import {AccessToken} from "./api/ApiUtils";
import {AuthContext} from "./context";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()

    const onExit = () => {
        localStorage.removeItem(AccessToken)
        setIsAuth(false)
        navigate('/signin')
    }

    const menuStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        background: '#c4dee5',
        font: 'white'
    }

    let href = window.location.href.split('/')
    href = href[3]

    console.log("Selected keys:")
    console.log('' + href)

    return (
        <div>
            {/*<Button onClick={onExit}>*/}
            {/*    Выйти*/}
            {/*</Button>*/}
            <div>
                {isAuth
                    ? <Menu selectedKeys={['/'+href]} defaultSelectedKeys={["/plans"]} style={menuStyle} mode="horizontal">
                        <Menu.Item key="/plans">
                            <Link to="/plans">Мои планы развития</Link>
                        </Menu.Item>
                        <Menu.Item key="/shared-plans">
                            <Link to="/shared-plans">Доступные планы развития</Link>
                        </Menu.Item>
                        {/*<Menu.Item>*/}
                        {/*    <Link to="/team">Моя команда</Link>*/}
                        {/*</Menu.Item>*/}
                        <Menu.Item key="/profile">
                            <Link to="/profile">Профиль</Link>
                        </Menu.Item>
                        {/*<Menu.Item key="/notification-settings">*/}
                        {/*    <Link to="/notification-settings">Настройка напоминаний</Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key="/test">*/}
                        {/*    <Link to="/test">Тест</Link>*/}
                        {/*</Menu.Item>*/}
                        <Menu.Item key="/logout">
                            <Button onClick={onExit} type="text">Выйти</Button>
                        </Menu.Item>
                    </Menu>
                    : <Menu selectedKeys={['/'+href]} defaultSelectedKeys={["/signin"]} style={menuStyle} mode="horizontal">
                        <Menu.Item key="/signup">
                            <Link to="/signup">Регистрация</Link>
                        </Menu.Item>
                        <Menu.Item key="/signin">
                            <Link to="/signin">Вход</Link>
                        </Menu.Item>
                    </Menu>
                }
                {/*<Menu style={menuStyle} mode="horizontal">*/}
                {/*    <Menu.Item>*/}
                {/*        <Link to="/signup">Регистрация</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item>*/}
                {/*        <Link to="/signin">Вход</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    /!*<Menu.Item>*!/*/}
                {/*    /!*    <Link to="/new-plan">Новый план развития</Link>*!/*/}
                {/*    /!*</Menu.Item>*!/*/}
                {/*    <Menu.Item>*/}
                {/*        <Link to="/plans">Мои планы развития</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item>*/}
                {/*        <Link to="/shared-plans">Доступные планы развития</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    /!*<Menu.Item>*!/*/}
                {/*    /!*    <Link to="/team">Моя команда</Link>*!/*/}
                {/*    /!*</Menu.Item>*!/*/}
                {/*    <Menu.Item>*/}
                {/*        <Link to="/profile">Профиль</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item>*/}
                {/*        <Link to="/notification-settings">Настройка напоминаний</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item>*/}
                {/*        <Link to="/test">Тест</Link>*/}
                {/*    </Menu.Item>*/}
                {/*</Menu>*/}
                {/*<Link to="/signup">Регистрация</Link>*/}
                {/*<Link to="/signin">Вход</Link>*/}
                {/*<Link to="/new-plan">Новый план развития</Link>*/}
                {/*<Link to="/plans">Мои планы развития</Link>*/}
                {/*<Link to="/shared-plans">Доступные планы развития</Link>*/}
                {/*<Link to="/profile">Профиль</Link>*/}
            </div>
        </div>
    );
};

export default Navbar;