import {notification} from "antd";

export default class NotificationComponent {

    static success(message) {
        notification.success({
            message: "PDP",
            description: message
        })
    }

    static error(message) {
        notification.error({
            message: "PDP",
            description: message
        })
    }
}