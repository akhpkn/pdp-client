import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../common/LoadingIndicator";
import PlanList from "../components/PlanList";
import PlanService from "../api/PlanService";
import NotificationComponent from "../common/NotificationComponent";
import {Result} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const SharedPlans = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [plans, setPlans] = useState([])

    const fetchPlans = () => {
        PlanService.getSharedPlans()
            .then(response => {
                console.log(response)
                setIsLoading(false)
                setPlans(response)
                return response
            })
            .catch(error => {
                NotificationComponent.error(error.message)
                setIsLoading(false)
                return []
            })
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    return (
        <div style={{marginTop: "30px"}}>
            {isLoading
                ? <LoadingIndicator/>
                : <div className="plans-container">
                    <PlanList owned={false} plans={plans} title="Доступные планы развития"/>
                </div>
            }
            {!isLoading && plans.length === 0 &&
                <Result icon={<InfoCircleOutlined/>} title='Здесь появятся планы развития, которыми с вами поделились другие пользователи'/>
            }
        </div>
    );
};

export default SharedPlans;