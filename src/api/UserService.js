import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class UserService {

    static loadUsersByEmail(email) {
        return request({
            url: ApiBaseUrl + `/api/v1/user?email=${email}`,
            method: "GET"
        })
    }

    static getProfile() {
        return request({
            url: ApiBaseUrl + "/api/v1/user/profile",
            method: "GET"
        })
    }

    static updateProfile(updateRequest) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/user/profile",
            method: "PUT",
            body: JSON.stringify(updateRequest)
        })
    }
}