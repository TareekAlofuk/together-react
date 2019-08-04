import * as React from "react";
import {Divider, Header, Loader} from "semantic-ui-react";
import MemberPassportAndFaceImageUpload from "../Upload/MemberPassportAndFaceImageUpload";
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
import MemberAttachmentsContainer from "../Upload/MemberAttachmentsContainer";

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
                <MemberAttachmentsWithRedux memberId={this.props.memberId}/>

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
    memberId: number;
    dispatch: (action: any) => void;
}

class MemberAttachments extends React.Component<MemberAttachmentProps> {

    render() {

        return <div style={{width: '50%'}}>
            <Header dividing size={"medium"}>Attachments:</Header>
            {
                <MemberAttachmentsContainer memberId={this.props.memberId}/>
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
}

const MemberAttachmentsWithRedux = connect()(MemberAttachments);