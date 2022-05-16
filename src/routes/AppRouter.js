import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./index";
import {AuthContext} from "../context";
import LoadingIndicator from "../common/LoadingIndicator";

const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext)
    if (isLoading) {
        return <LoadingIndicator/>
    }

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={<route.component/>}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}/>
                )}
                {/*<Navigate to={'/plans'}/>*/}
            </Routes>
            : <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={<route.component/>}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}/>
                )}
                {/*<Navigate to={'/signup'}/>*/}
            </Routes>
    );
};

export default AppRouter;