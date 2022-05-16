import React, {useState} from 'react';
import Plan from "./Plan";

const PlanList = ({plans, title, setChanged, owned}) => {

    // console.log(plans.size)
    // console.log(plans)

    return (
        <div>
            {/*<h1>{title}</h1>*/}
            {plans.length > 0 && plans.map(plan =>
                <Plan plan={plan} owned={owned} setChanged={setChanged}/>
            )}
            {/*{plans.length === 0 &&*/}
            {/*    <Result title="Тут пока ничего нет"/>*/}
            {/*}*/}
        </div>
    );
};

export default PlanList;