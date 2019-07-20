import Axios from "axios";

export default class FileUploader {
    private url: string;
    private data: any;
    private onComplete?: () => void;
    private onError?: (error: any) => void;
    private onSuccess?: (response: any) => void;
    private onProgress?: (percent: number, loaded: number, total: number) => void;

    public constructor(url: string, data: any, onComplete?: any, onError?: any, onSuccess?: any, onProgress?: any) {
        this.url = url;
        this.data = data;
        this.onComplete = onComplete;
        this.onError = onError;
        this.onSuccess = this.onSuccess;
        this.onProgress = onProgress;
    }

    public upload(): void {
        Axios.post(this.url, this.data, {
            onUploadProgress: progress => {
                console.log(progress);
                const percentCompleted = Math.round((progress.loaded * 100) / progress.total);
                this.onProgress && this.onProgress(percentCompleted, progress.loaded, progress.total);
            }, headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response => this.onSuccess && this.onSuccess(response))
            .catch(error => this.onError && this.onError(error))
            .then(() => {
                this.onComplete && this.onComplete();
            })
    }
}