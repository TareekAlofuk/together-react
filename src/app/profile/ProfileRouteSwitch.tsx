import {Route, Switch} from "react-router";
import * as React from "react";
import {Header} from "semantic-ui-react";
import ServicesUsage from "../service/Usage/ServicesUsage";
import WalletActionReportContainer from "../wallet/WalletActionReportContainer";
import MemberPassportAndFaceImageUpload from "../member/Upload/MemberPassportAndFaceImageUpload";
import Config from "../../bootstrap/Config";

interface Props {
    member: any;
}

export default function ProfileRouteSwitch(props: Props) {
    return <Switch>

        <Route exact path="/profile/services" component={(route: any) => {
            return <ServicesUsage memberId={props.member.id}/>
        }}/>

        <Route exact path="/profile/wallet" component={(route: any) => {
            return <div>XXX</div>
        }}/>

        <Route exact path="/profile/passport-identity-image" component={(route: any) => {
            return <MemberPassportAndFaceImageUpload
                faceImageUrl={Config.SERVER_URL + "storage/" + props.member.faceImage}
                passportImageUrl={Config.SERVER_URL + "storage/" + props.member.passportImage}
                memberId={props.member.id}/>
        }}/>

        <Route exact path="/profile/attachments" component={(route: any) => {
            return <div>YYY</div>
        }}/>

        <Route exact path="/profile" component={(route: any) => {
            return <div style={{padding: '100px 0'}} className={'centered-box'}>
                <Header size={'large'}>SELECT OPTION</Header>
            </div>
        }}/>

    </Switch>
}