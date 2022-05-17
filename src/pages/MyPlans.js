import React, {useEffect, useState} from 'react';
import PlanList from "../components/PlanList";
import PlanService from "../api/PlanService";
import {notification, Result} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";
import NewPlan from "../components/NewPlan";

import "./MyPlans.css"
import {InfoCircleOutlined} from "@ant-design/icons";

const MyPlans = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [plans, setPlans] = useState([])

    const fetchPlans = () => {
        PlanService.getPlans()
            .then(response => {
                console.log(response)
                setIsLoading(false)
                setPlans(response)
                return response
            })
            .catch(error => {
                notification.error({
                    message: "PDP",
                    description: error.message
                })
                setIsLoading(false)
                return []
            })
    }

    const [fetchState, setFetchState] = useState(0)

    const needRefresh = () => {
        setFetchState(fetchState + 1)
    }

    useEffect(() => {
        fetchPlans()
    }, [fetchState])

    if (isLoading) return <LoadingIndicator/>

    return (
        <div style={{ marginTop: "30px"}} >
            {isLoading && <LoadingIndicator/>}
            {!isLoading && plans.length > 0 &&
                <div className="plans-container">
                    <PlanList owned={true} plans={plans} setChanged={needRefresh} title="Мои планы развития"/>
                    <div style={{marginLeft: "auto"}}>
                        <NewPlan isPrimary={false} setChanged={needRefresh}/>
                    </div>
                </div>
            }
            {!isLoading && plans.length === 0 &&
                <div style={{textAlign: "center"}}>
                <Result icon={<InfoCircleOutlined/>} title="Создайте свой первый индивидуальный план развития!"/>
                    <div style={{marginLeft: "auto", marginRight: "0 auto"}}>
                        <NewPlan isPrimary={true} setChanged={needRefresh}/>
                    </div>
                </div>
            }

        </div>
    );
};

export default MyPlans;