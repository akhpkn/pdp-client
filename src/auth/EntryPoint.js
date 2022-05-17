import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";

const EntryPoint = () => {

    const navigate = useNavigate()
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const redirect = () => {
        if (isAuth) {
            navigate('/plans')
        } else {
            navigate('/signin')
        }
    }

    useEffect(() => {
        redirect()
    }, [])

    return (
        <div>

        </div>
    );
};

export default EntryPoint;