import * as React from 'react';
import Dropzone from "react-dropzone";
import Axios from 'axios';
import Config from '../../bootstrap/Config';
import AxiosResponse from 'axios';
export interface IMemberFilesUploadProps {
}

export default class MemberFilesUpload extends React.Component<IMemberFilesUploadProps, any> {

    constructor(props: IMemberFilesUploadProps) {
        super(props);
        this.state = {
            passport: null, passportUploadProgress: null,
            passportLoading: false, faceImageLoading: false,
            faceImage: null, faceImageUploadProgress: null,
        };
    }

    private passportPreview: any;

    public render() {
        return (
            <div className="files-upload">

                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 0.5, padding: 16, textAlign: 'center' }}>
                        <Dropzone accept="image/*" onDrop={(file: any) => {
                            const passportImage = file[0];
                            this.passportPreview = URL.createObjectURL(passportImage);
                            this.setState({ passport: passportImage });
                        }}>
                            {
                                ({ getRootProps, getInputProps }) => (
                                    <div>
                                        <div {...getRootProps()} style={{ padding: 24, justifyContent: 'center', background: '#F0F0F0', minHeight: 120, display: 'flex', alignItems: 'center', borderRadius: 5 }}>
                                            <input {...getInputProps()} />
                                            {
                                                this.state.passport ?
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                        <img style={{ width: 160, height: 'auto' }} src={this.passportPreview} />
                                                        <br />
                                                        <p>DRAG OR CLICK HERE TO SELECT </p>
                                                        {
                                                            this.state.passportUploadProgress &&
                                                            <p>{this.state.passportUploadProgress}</p>
                                                        }
                                                    </div>
                                                    :
                                                    <p style={{ textAlign: 'center' }}>PASSPORT IMAGE , DROP HERE OR CLICK TO SELECT</p>

                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </Dropzone>
                        <button onClick={() => {
                            const data = new FormData();
                            const { passport } = this.state;
                            data.append('passport', passport);
                            const url = Config.SERVER_URL + "api/members/upload-passport";
                            this.setState({ passportLoading: true });
                            const uploader = new FileUploader(url, data, () => this.setState({ passportLoading: false }), null, undefined, (completed: any) => this.setState({ passportUploadProgress: completed })
                            );
                            uploader.upload();
                        }}>UPLOAD PASSPORT IMAGE</button>
                    </div>
                    <div style={{ flex: 0.5, padding: 16 }}>
                        <Dropzone accept="image/*" onDrop={(file: any) => {
                            const faceImage = file[0];
                            Object.assign(faceImage, { preview: URL.createObjectURL(faceImage) });
                            this.setState({ faceImage: faceImage });
                        }}>
                            {
                                ({ getRootProps, getInputProps }) => (
                                    <div>
                                        <div {...getRootProps()} style={{ padding: 24, justifyContent: 'center', background: '#F0F0F0', minHeight: 120, display: 'flex', alignItems: 'center', borderRadius: 5 }}>
                                            <input {...getInputProps()} />
                                            <p style={{ textAlign: 'center' }}>FACE IMAGE , DROP HERE OR CLICK TO SELECT</p>
                                        </div>
                                    </div>
                                )
                            }
                        </Dropzone>
                        <button onClick={() => {
                            const data = new FormData();
                            const { faceImage } = this.state;
                            delete faceImage.preview;
                            data.append("faceImage", this.state.faceImage);
                            this.setState({ faceImageLoading: true });
                            const url = Config.SERVER_URL + "api/members/upload-passport";
                            const fileUploader = new FileUploader(url, data, () => this.setState({ faceImageLoading: false }), undefined, undefined, ((completed: any) => {
                                console.log(completed);
                                this.setState({ faceImageLoading: completed })
                            }));
                            fileUploader.upload();
                        }}>UPLOAD FACE IMAGE</button>
                    </div>

                </div>
            </div>
        );
    }

    public isBusy(): boolean {
        return this.state.passportLoading || this.state.faceImageLoading;
    }


}


class FileUploader {
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
            }, headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => this.onSuccess && this.onSuccess(response))
            .catch(error => this.onError && this.onError(error))
            .then(() => {
                this.onComplete && this.onComplete();
            })
    }
}