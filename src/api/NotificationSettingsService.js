import {ApiBaseUrl, request, requestWithoutResponse} from "./ApiUtils";

export default class NotificationSettingsService {

    static get() {
        return request({
            url: ApiBaseUrl + "/api/v1/notification-settings",
            method: "GET"
        })
    }

    static enable() {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/notification-settings/enable",
            method: "PUT"
        })
    }

    static disable() {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/notification-settings/disable",
            method: "PUT"
        })
    }

    static editDeadlineSettings(request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/notification-settings/deadline",
            method: "PUT",
            body: JSON.stringify(request)
        })
    }

    static editReportSettings(request) {
        return requestWithoutResponse({
            url: ApiBaseUrl + "/api/v1/notification-settings/report",
            method: "PUT",
            body: JSON.stringify(request)
        })
    }
}