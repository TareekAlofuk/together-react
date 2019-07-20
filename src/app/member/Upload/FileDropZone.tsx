import * as React from "react";
import Dropzone from "react-dropzone";
import FileUploader from "./FileUploader";
import {Button} from "semantic-ui-react";


interface FileDropZoneProps {
    label?: string;
    uploadUrl: string;
    name: string;
}

interface FileDropZoneState {
    file: any;
    loading: boolean;
    progress: any;
}

export default class FileDropZone extends React.Component<FileDropZoneProps, FileDropZoneState> {

    constructor(props: FileDropZoneProps) {
        super(props);
        this.state = {loading: false, file: null, progress: null};
    }

    render(): JSX.Element {
        return <>
            <div style={{textAlign: 'center', margin: '6px 0'}}>
                <b>{this.props.label}</b>
            </div>
            <Dropzone accept="image/*" onDrop={this.onDrop}>
                {
                    ({getRootProps, getInputProps}) => (
                        <div>
                            <div {...getRootProps()} className={'file-dropzone-container'}>
                                <input {...getInputProps()} />
                                {
                                    <p style={{textAlign: 'center'}}>
                                        DROP HERE OR CLICK TO SELECT
                                    </p>
                                }
                            </div>
                        </div>
                    )
                }
            </Dropzone>
            <div style={{marginTop: 16, textAlign: 'center'}}>
                {
                    this.state.file &&
                    <Button disabled={this.state.loading} style={{width: 160}} color={'green'}
                            onClick={this.upload}>
                        {
                            this.state.loading ?
                                <p>{this.state.progress}</p> :
                                "UPLOAD"
                        }
                    </Button>
                }
            </div>
        </>;
    }

    private upload = (): void => {
        const data = new FormData();
        const {file} = this.state;
        data.append(this.props.name, file);
        const url = this.props.uploadUrl;
        this.setState({loading: true});
        const uploader = new FileUploader(url, data, () => this.setState(
            {loading: false}), null, undefined,
            (completed: any) => this.setState({progress: completed})
        );
        uploader.upload();
    };

    private onDrop = (file: any): void => {
        const f = file[0];
        this.setState({file: f});
    }
}
