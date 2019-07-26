import * as React from "react";
import {Button, Divider, Header} from "semantic-ui-react";
import MemberPassportAndFaceImageUpload from "../Upload/MemberPassportAndFaceImageUpload";
import MemberFiles from "../Upload/MemberFiles";
import {Link, RouteComponentProps} from "react-router-dom";

interface Props {
    member: any;
    route: RouteComponentProps;
}

export default class MemberDetails extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div className={'member-details'}>

                <Detail value={this.props.member.name} label={"Name"}/>
                <Detail value={this.props.member.phone} label={"Phone"}/>
                <Detail value={this.props.member.phone2} label={"Secondary Phone"}/>
                <Detail value={this.props.member.email} label={"Email"}/>
                <Detail value={this.props.member.address} label={"Address"}/>
                <Detail value={this.props.member.birthDate} label={"BirthDate"}/>
                <Detail value={this.props.member.disabled ? 'DISABLED' : 'ACTIVE'} label={"Status"}/>
                <Detail value={this.props.member.archived ? 'ARCHIVED' : undefined} label={"Archive Status"}/>
                <Detail value={this.getMembershipType()} label={"Membership Type"}/>
                <Detail value={this.props.member.expiredDate} label={"Expiration Date"}/>

                <Divider/>

                <div className={'images'}>
                    <MemberPassportAndFaceImageUpload
                        faceImageUrl={this.props.member.faceImage}
                        passportImageUrl={this.props.member.passportImage}/>
                </div>

                <br/><br/>
                <Divider/>
                <div style={{width: '50%'}}>
                    {
                        this.props.member.files &&
                        <MemberFiles files={this.props.member.files}/>
                    }
                </div>

                <br/><br/>
                <Header size={'large'}>Actions : </Header>
                <Divider/>

                <div className={'actions'}>

                    <Button.Group>
                        <Button color={'yellow'} onClick={() => {
                            this.props.route.history.push(`/members/${this.props.member.id}/edit`, this.props.member)
                        }}>
                            EDIT
                        </Button>
                        <Link className={'ui orange button'}
                              to={`/members/${this.props.member.id}/change-credentials`}>
                            CHANGE CREDENTIALS
                        </Link>
                        <Button color={"green"} onClick={() => {
                            this.props.route.history.push(`/members/${this.props.member.id}/upgrade`,
                                {member: this.props.member});
                        }}>
                            RENEW/UPGRADE MEMBERSHIP
                        </Button>

                        <Link className={'ui blue button'}
                              to={`/members/${this.props.member.id}/report`}>
                            PRINT
                        </Link>


                    </Button.Group>

                </div>

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