import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class FeedbackService {

    static requestNew(request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/feedback/request",
            method: "POST",
            body: JSON.stringify(request)
        })
    }

    static send(request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/feedback/send",
            method: "POST",
            body: JSON.stringify(request)
        })
    }

    static getByTask(taskId) {
        return request({
            url: ApiBaseUrl + `/api/v1/feedback?taskId=${taskId}`,
            method: "GET"
        })
    }
}