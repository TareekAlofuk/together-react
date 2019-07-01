import {RequestConfiguration} from "../AutoFormProps";
import HttpRequestSender from "./HttpRequestSender";
import AutoField from "../../AutoField/AutoField";
import AutoFieldProps from "../../AutoField/AutoFieldProps";

export default class RequestSenderFactory {
    protected data: any;
    protected fields: AutoField<AutoFieldProps>[];
    protected config: RequestConfiguration;
    protected onComplete: any;
    protected onError: any;
    protected onSuccess: any;


    constructor(config: RequestConfiguration, data: any, fields: AutoField<AutoFieldProps>[], onComplete: any, onError: any, onSuccess: any) {
        this.data = data;
        this.fields = fields;
        this.config = config;
        this.onComplete = onComplete;
        this.onError = onError;
        this.onSuccess = onSuccess;
    }

    public getRequestSender() {
        const extractorType = this.config.extractFirebaseFunc ? "func" : "path";
        const extractorData = this.config.extractFirebaseFunc ? this.config.url : this.config.extractFirebaseFunc;


        switch (this.config.type) {
            case "http":
                return new HttpRequestSender(this.config.url, this.data, this.config.method!, this.onComplete, this.onError, this.onSuccess,
                    this.config.withUpload, this.config.axiosConfig);

            default:
                throw Error("REQUEST TYPE NOTE SUPPORTED")

        }
    }
}