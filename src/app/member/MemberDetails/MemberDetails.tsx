import * as React from "react";
import {Divider, Header, Icon, Loader, Menu} from "semantic-ui-react";
import MemberPassportAndFaceImageUpload from "../Upload/MemberPassportAndFaceImageUpload";
import MemberFiles from "../Upload/MemberFiles";
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../../bootstrap/ReduxActions";
import Config from "../../../bootstrap/Config";
import {Col, Row} from "react-grid-system";
import FileDropZone from "../Upload/FileDropZone";
import {toastr} from "react-redux-toastr";
import {addItemToLast} from "reduxpp/dist/action/FetchArrayAction";

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


                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Header style={{margin: 0}} size={"medium"}>Member Detail Page</Header>
                    <Menu style={{margin: 0}} secondary>
                        <Menu.Item name={'EDIT'}
                                   onClick={() => this.props.route.history.push(
                                       `/members/${this.props.member.id}/edit`, this.props.member)
                                   }/>

                        <Menu.Item disabled name={'CREDENTIALS'}
                                   onClick={() => this.props.route.history.push(
                                       `/members/${this.props.member.id}/credentials`, this.props.member)
                                   }/>

                        <Menu.Item name={'RENEW/UPGRADE'}
                                   onClick={() => this.props.route.history.push(
                                       `/members/${this.props.member.id}/upgrade`,
                                       {member: this.props.member})
                                   }/>

                        <Menu.Item name={'PRINT'}
                                   onClick={() => this.props.route.history.push(
                                       `/members/${this.props.member.id}/report`,
                                       {member: this.props.member})
                                   }/>
                    </Menu>
                </div>

                <Divider/>

                <Row>
                    <Col>
                        <Detail value={this.props.member.title} label={"Title"}/>
                        <Detail value={this.props.member.name} label={"Name"}/>
                        <Detail value={this.props.member.phone} label={"Phone"}/>
                        <Detail value={this.props.member.phone2} label={"Secondary Phone"}/>
                        <Detail value={this.props.member.email} label={"Email"}/>
                        <Detail value={this.props.member.address} label={"Address"}/>
                        <Detail value={this.props.member.jobTitle} label={"Job"}/>
                        <Detail value={this.props.member.birthDate} label={"BirthDate"}/>
                    </Col>
                    <Col>
                        <Detail value={this.props.member.joinDate} label={"JoinDate"}/>
                        <Detail value={this.props.member.expirationDate} label={"ExpirationDate"}/>
                        <Detail value={this.props.member.passportExpirationDate} label={"Passport ExpirationDate"}/>
                        <Detail value={this.props.member.passportNo} label={"Passport No"}/>
                        <Detail value={this.props.member.disabled ? 'DISABLED' : 'ACTIVE'} label={"Status"}/>
                        <Detail value={this.props.member.archived ? 'ARCHIVED' : undefined} label={"Archive Status"}/>
                        <Detail value={this.getMembershipType()} label={"Membership Type"}/>
                    </Col>
                </Row>


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

    private getMembershipType(): string {
        switch (this.props.member.type) {
            case MembershipType.SILVER:
                return "SILVER";
            case MembershipType.GOLD:
                return "GOLD";
            case MembershipType.BUSINESS:
                return "BUSINESS";
            default:
                return "UNKNOWN";
        }
    }

}

enum MembershipType {
    SILVER = 1,
    GOLD = 2,
    BUSINESS = 3

}

function Detail(props: any) {
    if (props.value === null || props.value === undefined) {
        return null;
    }

    return <div className={'detail-item'}>
        <span>{props.label}</span>
        <span>{props.value}</span>
    </div>;
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