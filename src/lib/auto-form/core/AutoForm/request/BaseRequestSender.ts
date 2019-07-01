import RequestSender from "./RequestSender";

export default abstract class BaseRequestSender implements RequestSender {

    protected readonly url: string;
    protected readonly onComplete: () => void;
    protected readonly onError: (reason: any) => void;
    protected readonly onSuccess: (response: any) => void;


    public constructor(url: string,
                       onComplete: () => void,
                       onError: (reason: any) => void,
                       onSuccess: (response: any) => void) {
        this.url = url;
        this.onComplete = onComplete;
        this.onError = onError;
        this.onSuccess = onSuccess;
    }

    abstract send(): void ;

}