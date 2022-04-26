import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class CommentService {

    static getByTask(taskId) {
        return request({
            url: ApiBaseUrl + `/api/v1/comment?taskId=${taskId}`,
            method: "GET"
        })
    }

    static create(request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/comment",
            method: "POST",
            body: JSON.stringify(request)
        })
    }

    static update(commentId, request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + `/api/v1/comment/${commentId}`,
            method: "PUT",
            body: JSON.stringify(request)
        })
    }

    static delete(commentId) {
        return requestWithoutResponse({
            url: ApiBaseUrl + `/api/v1/comment/${commentId}`,
            method: "DELETE"
        })
    }
}
