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

validator.validators.optional = function (value: any, options: any) {
    if (value === null || value == undefined) {
        return;
    }

    if (options.trim) {
        value = String(value).trim();
    }

    if (value === '') {
        return;
    }

    const rules = {...options};
    delete rules.trim;
    return validator.single(value, rules);
};


validator.extend(validator.validators.datetime, dateExtendObject);
