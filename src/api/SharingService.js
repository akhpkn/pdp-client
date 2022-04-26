import {ApiBaseUrl, requestWithoutResponse} from "./ApiUtils";

export default class SharingService {

    static share(shareRequest) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/plan-access",
            method: "POST",
            body: JSON.stringify(shareRequest)
        })
    }
}