import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../common/LoadingIndicator";
import PlanList from "../components/PlanList";
import PlanService from "../api/PlanService";
import NotificationComponent from "../common/NotificationComponent";

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
        <div>
            {isLoading
                ? <LoadingIndicator/>
                : <div>
                    <PlanList plans={plans} title="Доступные планы развития"/>
                </div>
            }
        </div>
    );
};

export default SharedPlans;