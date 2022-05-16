import React, {useContext, useEffect, useState} from "react";
import {Button, Layout} from "antd";
import './App.css';
// import NewPlan from "./plan/NewPlan";
// import Signup from "./user/Signup";
// import Signin from "./user/Signin";
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import {AccessToken} from "./api/ApiUtils";
import {AuthContext} from "./context";
import AppHeader from "./common/AppHeader";

const {Content, Footer} = Layout;


function App() {

    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem(AccessToken)) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [])


    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
            <Layout className="layout">
                <BrowserRouter>
                    <AppHeader/>
                    <Content style={{marginTop: "64px"}}>
                        <div className="container">
                {/*            <BrowserRouter>*/}
                <AppRouter/>
                {/*</BrowserRouter>*/}
                </div>
                </Content>
                </BrowserRouter>
                <Footer style={{textAlign: "center", fontSize: 16}}>Personal Development Planning Application</Footer>
            </Layout>
        </AuthContext.Provider>
    );
}

export default App;
