import React from 'react';
import {Link} from "react-router-dom";
import {Button, Menu} from "antd";
import {AccessToken} from "./api/ApiUtils";

const Navbar = () => {

    const onExit = () => {
        localStorage.removeItem(AccessToken)
    }

    const menuStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <div>
            <Button onClick={onExit}>
                Выйти
            </Button>
            <div>
                <Menu style={menuStyle} mode="horizontal">
                    <Menu.Item>
                        <Link to="/signup">Регистрация</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/signin">Вход</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/new-plan">Новый план развития</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/plans">Мои планы развития</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/shared-plans">Доступные планы развития</Link>
                    </Menu.Item>
                    {/*<Menu.Item>*/}
                    {/*    <Link to="/team">Моя команда</Link>*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item>
                        <Link to="/profile">Профиль</Link>
                    </Menu.Item>
                </Menu>
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