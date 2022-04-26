import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class TaskService {

    static getTasks(planId) {
        return request({
            url: ApiBaseUrl + `/api/v1/task?planId=${planId}`,
            method: "GET"
        })
    }

    static getTask(id) {
        return request({
            url: ApiBaseUrl + `/api/v1/task/${id}`,
            method: "GET"
        })
    }

    static createTask(taskCreationRequest) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/task",
            method: "POST",
            body: JSON.stringify(taskCreationRequest)
        })
    }

    static updateTask(id, taskUpdateRequest) {
        return requestWithoutResponse({
            url: ApiBaseUrl + `/api/v1/task/${id}`,
            method: "PUT",
            body: JSON.stringify(taskUpdateRequest)
        })
    }

    static updateStatus(id, status) {
        const request = {
            status: status
        }
        return requestWithoutResponse({
            url: ApiBaseUrl + `/api/v1/task/${id}/status`,
            method: "PUT",
            body: JSON.stringify(request)
        })
    }

    static deleteTask(id) {
        return requestWithoutResponse({
            url: ApiBaseUrl + `/api/v1/task/${id}`,
            method: "DELETE"
        })
    }
}