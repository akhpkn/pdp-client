import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";
import {AccessToken} from "../api/ApiUtils";

const Logout = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()

    const onExit = () => {
        localStorage.removeItem(AccessToken)
        setIsAuth(false)
        navigate('/signin')
    }

    useEffect(() => {
        onExit()
    }, [])

    return (
        <div>

        </div>
    );
};

export default Logout;