import React, {useContext} from 'react';
import {Layout, Menu, Dropdown, Icon, Button} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context";
import {AccessToken} from "../api/ApiUtils";

import './AppHeader.css'

const Header = Layout.Header;


const AppHeader = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()

    let menuItems;
    if (isAuth) {
        menuItems = [
            <Menu.Item key="/plans">
                <Link to="/plans">Мои планы развития</Link>
            </Menu.Item>,
            <Menu.Item key="/shared-plans">
                <Link to="/shared-plans">Доступные планы развития</Link>
            </Menu.Item>,
            <Menu.Item key="/profile">
                <Link to="/profile">Профиль</Link>
            </Menu.Item>,
            <Menu.Item key="/logout">
                <Link to="/logout">Выйти</Link>
            </Menu.Item>
        ]
    } else {
        menuItems = [
            <Menu.Item key="/signup">
                <Link to="/signup">Регистрация</Link>
            </Menu.Item>,
            <Menu.Item key="/signin">
                <Link to="/signin">Вход</Link>
            </Menu.Item>
        ]
    }

    const headerStyle = {
        position: 'fixed',
        width: '100%',
        boxShadow: '0 2px 8px #f0f1f2',
        zIndex: 10,
        padding: 0
    }

    let href = window.location.href.split('/')
    console.log(window.location.href)
    href = href[3]
    console.log(href)

    const menuStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    }

    return (
        <Header style={headerStyle}>
            <div >
                {isAuth
                    ? <Menu style={menuStyle} selectedKeys={['/'+href]} defaultSelectedKeys={['/plans']} theme="dark" mode="horizontal">
                        {menuItems}
                    </Menu>
                    : <Menu style={menuStyle} selectedKeys={['/'+href]} defaultSelectedKeys={['/signin']} theme="dark" mode="horizontal">
                        {menuItems}
                    </Menu>
                }
            </div>
        </Header>
    );
};

export default AppHeader;