import {Route, Switch} from "react-router";
import * as React from "react";
import {Header} from "semantic-ui-react";
import ServicesUsage from "../service/Usage/ServicesUsage";
import MemberPassportAndFaceImageUpload from "../member/Upload/MemberPassportAndFaceImageUpload";
import Config from "../../bootstrap/Config";
import WalletActionReportContainer from "../wallet/WalletActionReportContainer";
import MemberAttachmentsContainer from "../member/Upload/MemberAttachmentsContainer";

interface Props {
    member: any;
}

export default function ProfileRouteSwitch(props: Props) {
    return <Switch>

        <Route exact path="/profile/services" component={() => {
            return <ServicesUsage member={props.member}/>
        }}/>

        <Route exact path="/profile/wallet" component={() => {
            return <WalletActionReportContainer memberId={props.member.id}/>
        }}/>

        <Route exact path="/profile/passport-identity-image" component={() => {
            return <MemberPassportAndFaceImageUpload
                faceImageUrl={Config.SERVER_URL + "storage/" + props.member.faceImage}
                passportImageUrl={Config.SERVER_URL + "storage/" + props.member.passportImage}
                memberId={props.member.id}/>
        }}/>

        <Route exact path="/profile/attachments" component={() => {
            return <MemberAttachmentsContainer memberId={props.member.id}/>
        }}/>

        <Route exact path="/profile" component={() => {
            return <div style={{padding: '100px 0'}} className={'centered-box'}>
                <Header size={'large'}>SELECT OPTION</Header>
            </div>
        }}/>

    </Switch>
}