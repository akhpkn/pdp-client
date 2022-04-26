import React from "react";
import {Button, Layout} from "antd";
import './App.css';
import NewPlan from "./plan/NewPlan";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./Navbar";

function App() {
  return (
      <Layout className="app-container">
      <div className="App">
          <BrowserRouter>
              <Navbar/>
              <AppRouter/>
          </BrowserRouter>
      </div>
      </Layout>
  );
}

export default App;
