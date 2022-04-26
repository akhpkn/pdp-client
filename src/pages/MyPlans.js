import React, {useEffect, useState} from 'react';
import PlanList from "../components/PlanList";
import PlanService from "../api/PlanService";
import {notification} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";

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

    useEffect(() => {
        fetchPlans()
    }, [])

    return (
        <div>
            {isLoading
                ? <LoadingIndicator/>
                : <div>
                    <PlanList plans={plans} title="Мои планы развития"/>
                </div>
            }
        </div>
    );
};

export default MyPlans;