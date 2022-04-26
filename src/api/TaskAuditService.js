import {ApiBaseUrl, request} from "./ApiUtils";

export default class TaskAuditService {

    static listByPlan(planId) {
        return request({
            url: ApiBaseUrl + `/api/v1/task-audit?planId=${planId}`,
            method: "GET"
        })
    }
}