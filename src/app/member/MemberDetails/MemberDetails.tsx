import * as React from "react";
import {Divider, Header, Icon, Loader} from "semantic-ui-react";
import MemberPassportAndFaceImageUpload from "../Upload/MemberPassportAndFaceImageUpload";
import MemberFiles from "../Upload/MemberFiles";
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../../bootstrap/ReduxActions";
import Config from "../../../bootstrap/Config";
import FileDropZone from "../Upload/FileDropZone";
import {toastr} from "react-redux-toastr";
import {addItemToLast} from "reduxpp/dist/action/FetchArrayAction";
import MemberDetailHeader from "./MemberDetailHeader";
import MemberMainInfo from "./MemberMainInfo";

interface Props {
    member: any;
    route: RouteComponentProps;
    loading: boolean;
    error: boolean;
    memberId: number;
    dispatch: (action: any) => void;
}

class MemberDetails extends React.Component<Props> {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        const url = Config.SERVER_URL + "api/members/" + this.props.memberId;
        const action = GETAction(ReduxActions.FETCH_MEMBER_DETAIL, url);
        this.props.dispatch(action);
    }

    render(): JSX.Element {

        if (this.props.loading) {
            return <Loader inline/>
        }
        if (this.props.error || !this.props.member) {
            return <h1>Error</h1>
        }

        return (
            <div className={'member-details'}>


                <MemberDetailHeader title={'Member Detail Page'} member={this.props.member}/>
                <Divider/>

                <MemberMainInfo member={this.props.member}/>

                <Divider/>

                <div className={'images'}>
                    <MemberPassportAndFaceImageUpload
                        memberId={this.props.memberId}
                        faceImageUrl={this.props.member.faceImage ? Config.SERVER_URL + "storage/" + this.props.member.faceImage : null}
                        passportImageUrl={this.props.member.passportImage ? Config.SERVER_URL + "storage/" + this.props.member.passportImage : null}/>
                </div>

                <br/><br/>
                <Divider hidden/>
                <MemberAttachmentContainer memberId={this.props.memberId}/>

                <br/>
            </div>
        )
    }

}

export default connect((store: any) => {
    return {
        loading: store.MemberDetail.loading,
        error: store.MemberDetail.error,
        member: store.MemberDetail.object,

    }
})(MemberDetails);


interface MemberAttachmentProps {
    loading: boolean;
    error: boolean;
    attachments: any[];
    memberId: number;
    dispatch: (action: any) => void;
}

class MemberAttachments extends React.Component<MemberAttachmentProps> {

    componentWillMount() {
        const url = Config.SERVER_URL + `api/members/${this.props.memberId}/attachments`;
        const action = GETAction(ReduxActions.GET_MEMBER_ATTACHMENTS, url);
        this.props.dispatch(action);
    }

    render() {
        let component = null;

        if (this.props.loading) {
            component = this.loading();
        } else if (this.props.error || !this.props.attachments) {
            component = this.error();
        } else if (this.props.attachments.length === 0) {
            component = this.empty();
        } else {
            component = <MemberFiles files={this.props.attachments}/>;
        }

        return <div style={{width: '50%'}}>
            <Header dividing size={"medium"}>Attachments:</Header>
            {
                component
            }

            <Divider/>
            <FileDropZone label={"Upload File"}
                          onError={() => toastr.error('Fail to upload attachment', '')}
                          onSuccess={(response: any) => {
                              toastr.success('Succeed to upload attachments', '');
                              const action = addItemToLast(ReduxActions.GET_MEMBER_ATTACHMENTS, {...response.data});
                              this.props.dispatch(action);
                          }}
                          uploadUrl={Config.SERVER_URL + `api/members/${this.props.memberId}/attachment`}
                          name={"file"}/>
        </div>
    }

    private loading = () => {
        return <div style={{textAlign: 'center', padding: 24}}>
            <Loader inline/>
        </div>
    };

    private error = () => {
        return <div style={{padding: 24}}>
            <Header size={"small"}>Fail to load attachments</Header>
            <Icon size={'large'} color={"red"} name={"exclamation triangle"}/>
        </div>
    };

    private empty = () => {
        return <div style={{textAlign: 'center'}}>
            <Header size={"small"}>No Attachments</Header>
            <Icon size={'large'} name={'file'}/>
        </div>;
    }
}

const MemberAttachmentContainer = connect((store: any) => {
    return {
        loading: store.MemberAttachments.loading,
        error: store.MemberAttachments.error,
        attachments: store.MemberAttachments.array,
    }
})(MemberAttachments);