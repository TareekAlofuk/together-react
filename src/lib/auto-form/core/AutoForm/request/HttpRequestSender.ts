import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import BaseRequestSender from "./BaseRequestSender";

export default class HttpRequestSender extends BaseRequestSender {

    private readonly data: any;
    private readonly method: string;
    private readonly config?: AxiosRequestConfig;
    private readonly withUpload?: boolean;


    constructor(url: string, data: FormData, method: string,
        onComplete: () => void,
        onError: (reason: any) => void,
        onSuccess: (response: any) => void,
        withUpload?: boolean, config?: AxiosRequestConfig) {
        super(url, onComplete, onError, onSuccess);
        this.data = data;
        this.method = method;
        this.config = config;
        this.withUpload = withUpload;
    }

    public send(): void {
        let requestPromise = this.getRequestPromise();
        requestPromise.then((response: AxiosResponse) => {
            this.onSuccess(response.data);
            this.onComplete();
        }).catch(e => {
            this.onError(e);
            this.onComplete();
        });
    };


    private getRequestPromise(): Promise<any> {
        let requestPromise = undefined;
        if (this.method === "post") {
            requestPromise = this.sendPostRequest();
        } else if (this.method === "get") {
            requestPromise = this.sendGetRequest();
        } else if (this.method === "put") {
            requestPromise = this.sendPutRequest();
        } else if (this.method === "delete") {
            requestPromise = this.sendDeleteRequest();
        } else if (this.method === "patch") {
            requestPromise = this.sendPatchRequest();
        }
        return requestPromise;
    }

    protected sendGetRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = { ...this.config }
        }
        if (this.data) {
            config.params = this.data;
        }
        return Axios.get(this.url, config);
    }

    protected sendPostRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = { ...this.config }
        }
        if (this.withUpload) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return Axios.post(this.url, this.data, this.config);
    }

    protected sendPutRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = { ...this.config }
        }
        if (this.withUpload) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return Axios.put(this.url, this.data, this.config);
    }

    protected sendDeleteRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = { ...this.config }
        }

        return Axios.delete(this.url, this.config);
    }

    protected sendPatchRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = { ...this.config }
        }
        if (this.withUpload) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return Axios.patch(this.url, this.data, this.config);
    }
}