import moment from "moment";

export default class TimeUtil {

    static toDateTimeWithMs = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD HH:mm:ss")
    }

    static toDateTime = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD HH:mm")
    }

    static toDate = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD")
    }
}
