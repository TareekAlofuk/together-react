import * as React from 'react';
import Dropzone from "react-dropzone";
import Axios from 'axios';
import Config from '../../bootstrap/Config';
export interface IMemberFilesUploadProps {
}

export default class MemberFilesUpload extends React.Component<IMemberFilesUploadProps, any> {

    constructor(props: IMemberFilesUploadProps) {
        super(props);
        this.state = { passport: null, passportUploadProgress: null };
    }

    public render() {
        return (
            <div className="files-upload">

                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 0.5, padding: 16, textAlign: 'center' }}>
                        <Dropzone accept="image/*" onDrop={file => {
                            const passportImage = file[0];
                            const x = Object.assign(passportImage, { preview: URL.createObjectURL(passportImage) });
                            console.log(x);
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
                                                        <img style={{ width: 160, height: 'auto' }} src={this.state.passport.preview} />
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
                            data.append('passport', this.state.passport);
                            const url = Config.SERVER_URL + "api/members/upload-passport";
                            Axios.post(url, data, {
                                onUploadProgress: progress => {
                                    console.log(progress);
                                    if (progress.total === progress.loaded) {
                                        this.setState({ passportUploadProgress: null });
                                        return;
                                    }
                                    const percentCompleted = Math.round((progress.loaded * 100) / progress.total);
                                    this.setState({ passportUploadProgress: percentCompleted });
                                }, headers: { 'Content-Type': 'multipart/form-data' }
                            });
                        }}>UPLOAD PASSPORT IMAGE</button>
                    </div>
                    <div style={{ flex: 0.5, padding: 16 }}>
                        <Dropzone accept="image/*">
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
                        <button>UPLOAD FACE IMAGE</button>
                    </div>

                </div>

                <Dropzone multiple>
                    {
                        ({ getRootProps, getInputProps }) => (
                            <div>
                                <div {...getRootProps()} style={{ padding: 24, justifyContent: 'center', background: '#F0F0F0', minHeight: 120, display: 'flex', alignItems: 'center', borderRadius: 5 }}>
                                    <input {...getInputProps()} />
                                    <p style={{ textAlign: 'center' }}>PASSPORT IMAGE , DROP HERE OR CLICK TO SELECT</p>
                                </div>
                            </div>
                        )
                    }
                </Dropzone>
            </div>
        );
    }
}
