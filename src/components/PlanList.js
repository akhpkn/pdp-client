import React, {useState} from 'react';
import Plan from "./Plan";
import {Result} from "antd";
import Plan2 from "./Plan2";

const PlanList = ({plans, title, setChanged, owned}) => {

    // console.log(plans.size)
    // console.log(plans)

    return (
        <div>
            {/*<h1>{title}</h1>*/}
            {plans.length > 0 && plans.map(plan =>
                <Plan2 plan={plan} owned={owned} setChanged={setChanged}/>
            )}
            {/*{plans.length === 0 &&*/}
            {/*    <Result title="Тут пока ничего нет"/>*/}
            {/*}*/}
        </div>
    );
};

export default PlanList;