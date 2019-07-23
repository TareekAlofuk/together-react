import * as moment from "moment";
import * as validator from 'validate.js';

const dateExtendObject = {
    parse: function (value: any) {
        return +moment.utc(value);
    },
    format: function (value: any, options: any) {
        let format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
    }
};


validator.extend(validator.validators.datetime, dateExtendObject);
