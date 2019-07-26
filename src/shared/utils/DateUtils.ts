export default class DateUtils {

    static toString(value: Date) {
        const day = value.getDate() > 9 ? value.getDate() : ('0' + value.getDate());
        const month = value.getMonth() + 1 > 9 ? value.getMonth() + 1 : ('0' + (value.getMonth() + 1));
        const year = value.getFullYear();
        return year + "-" + month + "-" + day;
    }

    static fixEFCoreDate(value: string) {
        if (value) {
            return value.replace("T00:00:00", "");
        }
        return value;
    }

}