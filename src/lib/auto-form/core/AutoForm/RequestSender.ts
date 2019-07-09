import Axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";

export default class RequestSender {
    private readonly data: any;
    private readonly url: string;
    private readonly method: "post" | "get";
    private readonly onComplete: () => void;
    private readonly onError: (reason: any) => void;
    private readonly onSuccess: (response: any) => void;
    private readonly config?: AxiosRequestConfig;
    private readonly withUpload?: boolean;


    constructor(url: string, data: FormData, method: "post" | "get",
                onComplete: () => void,
                onError: (reason: any) => void,
                onSuccess: (response: any) => void,
                withUpload?: boolean, config?: AxiosRequestConfig) {
        this.data = data;
        this.url = url;
        this.method = method;
        this.onComplete = onComplete;
        this.onError = onError;
        this.config = config;
        this.withUpload = withUpload;
        this.onSuccess = onSuccess;
    }

    public send() {
        let requestPromise = this.getRequestPromise();
        requestPromise.then((response: AxiosResponse) => {
            this.onSuccess(response.data);
            this.onComplete();
        }).catch(e => {
            this.onError(e);
            this.onComplete();
        });
    };


    private getRequestPromise(): AxiosPromise {
        let requestPromise = undefined;
        if (this.method === "post") {
            requestPromise = this.sendPOSTRequest();
        } else if(this.method === "get"){
            requestPromise = this.sendGETRequest();
        }else if(this.method === "put"){
            requestPromise = this.sendPutRequest();
        }else if(this.method === "patch"){
            requestPromise = this.sendPatchRequest();
        }else if(this.method === "delete"){
            requestPromise = this.sendDeleteRequest();
        }
        return requestPromise;
    }

    protected sendGETRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = {...this.config}
        }
        if (this.data) {
            config.params = this.data;
        }
        return Axios.get(this.url, config);
    }

    protected sendPutRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = {...this.config}
        }
        if (this.withUpload) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return Axios.put(this.url, this.data, this.config);
    }

    protected sendPatchRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = {...this.config}
        }
        if (this.withUpload) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return Axios.patch(this.url, this.data, this.config);
    }

    protected sendDeleteRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = {...this.config}
        }
        if (this.withUpload) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return Axios.delete(this.url, this.config);
    }

    protected sendPOSTRequest() {
        let config: AxiosRequestConfig = {};
        if (this.config) {
            config = {...this.config}
        }
        if (this.withUpload) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return Axios.post(this.url, this.data, this.config);
    }
}