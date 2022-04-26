import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class PlanService {

    static getPlans() {
        return request({
            url: ApiBaseUrl + "/api/v1/plan/owned",
            method: "GET"
        })
    }

    static getSharedPlans() {
        return request({
            url: ApiBaseUrl + "/api/v1/plan/shared",
            method: "GET"
        })
    }

    static getPlan(planId) {
        return request({
            url: ApiBaseUrl + `/api/v1/plan/${planId}`,
            method: "GET"
        })
    }

    static createPlan(planCreationRequest) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/plan",
            method: "POST",
            body: JSON.stringify(planCreationRequest)
        })
    }
}