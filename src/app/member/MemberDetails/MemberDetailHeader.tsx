import {Header} from "semantic-ui-react";
import * as React from "react";
import MemberDetailHeaderActions from "./MemberDetailHeaderActions";

interface Props {
    title: string;
    member: any;
}

export default function MemberDetailHeader(props: Props) {
    return <div className={'member-detail-header'}>
        <Header className={'zero-margin'} size={"medium"}>{props.title}</Header>
        <MemberDetailHeaderActions member={props.member}/>
    </div>
}


