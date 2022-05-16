import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class SharingService {

    static share(shareRequest) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/plan-access",
            method: "POST",
            body: JSON.stringify(shareRequest)
        })
    }

    static removeAccess(request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/plan-access",
            method: 'DELETE',
            body: JSON.stringify(request)
        })
    }

    static shareMultiple(shareRequest) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/plan-access/multiple",
            method: "POST",
            body: JSON.stringify(shareRequest)
        })
    }

    static getUsersWithAccess(planId) {
        return request({
            url: ApiBaseUrl + `/api/v1/plan-access?planId=${planId}`,
            method: "GET"
        })
    }
}