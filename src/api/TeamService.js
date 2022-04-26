import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class TeamService {

    static create(request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/team",
            method: "POST",
            body: JSON.stringify(request)
        })
    }

    static getMyTeam() {
        return request({
            url: ApiBaseUrl + "/api/v1/team/my",
            method: "GET"
        })
    }
}