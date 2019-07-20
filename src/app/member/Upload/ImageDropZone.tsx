import * as React from "react";
import Dropzone from "react-dropzone";
import FileUploader from "./FileUploader";
import {Button} from "semantic-ui-react";


interface ImageDropZoneProps {
    image: any;
    label?: string;
    uploadUrl : string;
    name : string;
}

interface ImageDropZoneState {
    image: any;
    loading: boolean;
    progress: any;
}

export default class ImageDropZone extends React.Component<ImageDropZoneProps, ImageDropZoneState> {

    private preview: any = null;

    constructor(props: ImageDropZoneProps) {
        super(props);
        this.state = {loading: false, image: null, progress: null};
        this.preview = props.image ? props.image : null;
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
                            <div {...getRootProps()} className={'image-dropzone-container'}>
                                <input {...getInputProps()} />
                                {
                                    this.props.image ?
                                        this.renderImageContainer()
                                        :
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
                    this.state.image ?
                        <Button disabled={this.state.loading} style={{width: 160}} color={'green'}
                                onClick={this.uploadImage}>
                            {
                                this.state.loading ?
                                    <p>{this.state.progress}</p> :
                                    "UPLOAD"
                            }
                        </Button>
                        :
                        <a style={{width: 160}} className={'ui blue button'}
                           target={"_blank"}
                           href={this.props.image}>
                            VIEW
                        </a>
                }
            </div>
        </>;
    }

    private uploadImage = (): void => {
        const data = new FormData();
        const {image} = this.state;
        data.append(this.props.name, image);
        const url = this.props.uploadUrl;
        this.setState({loading: true});
        const uploader = new FileUploader(url, data, () => this.setState(
            {loading: false}), null, undefined,
            (completed: any) => this.setState({progress: completed})
        );
        uploader.upload();
    };

    private renderImageContainer() {
        return <div className={'image-container'}>
            <img style={{width: 'auto', height: 200}}
                 src={this.preview}/>
            <br/>
            <p>DRAG OR CLICK HERE TO SELECT</p>
        </div>;
    };

    private onDrop = (file: any): void => {
        const f = file[0];
        this.preview = URL.createObjectURL(f);
        this.setState({image: f});
    }
}
