import moment from "moment";

export default class TimeUtil {

    static toDateTimeWithMs = (instant) => {
        return moment.unix(instant).format("YYYY-MM-DD HH:mm:ss")
    }
}
