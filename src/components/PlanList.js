import React, {useState} from 'react';
import Plan from "./Plan";

const PlanList = ({plans, title}) => {

    return (
        <div>
            <h1>{title}</h1>
            {plans.map(post =>
                <Plan plan={post}/>
            )}
        </div>
    );
};

export default PlanList;