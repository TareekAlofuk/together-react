import * as React from 'react';
import ImageDropZone from "./ImageDropZone";
import Config from "../../../bootstrap/Config";
import {toastr} from "react-redux-toastr";

export interface IMemberFilesUploadProps {
    passportImageUrl?: string;
    faceImageUrl?: string;
}

export default class MemberPassportAndFaceImageUpload extends React.Component<IMemberFilesUploadProps, any> {

    constructor(props: IMemberFilesUploadProps) {
        super(props);
        this.state = {
            passport: null, passportUploadProgress: null,
            passportLoading: false, faceImageLoading: false,
            faceImage: null, faceImageUploadProgress: null,
        };

        this.passportPreview = this.props.passportImageUrl ? this.props.passportImageUrl : null;
        this.faceImagePreview = this.props.faceImageUrl ? this.props.faceImageUrl : null;
    }

    private passportPreview: any;
    private faceImagePreview: any;

    public render() {
        return (
            <div className="files-upload">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{flex: 0.49}}>
                        <ImageDropZone uploadUrl={Config.SERVER_URL + "api/members/upload-passport"}
                                       name={"passport"}
                                       onError={() => {
                                           toastr.error('Failed To Upload Passport Image', 'Check your internet connection');
                                       }}
                                       onSuccess={() => {
                                           toastr.success('Succeed Upload Passport Image', '');
                                       }}
                                       label={"Passport"} image={this.props.passportImageUrl}/>
                    </div>
                    <div style={{flex: 0.49}}>
                        <ImageDropZone
                            uploadUrl={Config.SERVER_URL + "api/members/upload-faceimage"}
                            name={"faceimage"}
                            onError={() => {
                                toastr.error('Failed To Upload Identity Image', 'Check your internet connection');
                            }}
                            onSuccess={() => {
                                toastr.success('Succeed Upload Identity Image', '');
                            }}
                            label={"Identity Image"} image={this.props.faceImageUrl}/>
                    </div>
                </div>
            </div>
        );
    }

    public isBusy(): boolean {
        return this.state.passportLoading || this.state.faceImageLoading;
    }
}
