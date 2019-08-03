import {Menu} from "semantic-ui-react";
import * as React from "react";
import {withRouter} from "react-router";


interface Props {
    history: any;
    location: any;
    match: any;
    member: any;
}

function MemberDetailHeaderActions(props: Props) {
    return <Menu style={{margin: 0}} secondary>
        <Menu.Item name={'EDIT'}
                   onClick={() => navigateToMemberPage(props.history.push, 'edit', props.member)}/>

        <Menu.Item disabled name={'CREDENTIALS'}
                   onClick={() => navigateToMemberPage(props.history.push, 'credentials', props.member)}/>

        <Menu.Item name={'RENEW/UPGRADE'}
                   onClick={() => navigateToMemberPage(props.history.push, 'upgrade', props.member)}/>

        <Menu.Item name={'PRINT'}
                   onClick={() => navigateToMemberPage(props.history.push, 'report', props.member)}/>
    </Menu>;
}

function navigateToMemberPage(pushFunc: any, route: string, member: any) {
    pushFunc(`/members/${member.id}/${route}`, {member: member});
}

export default withRouter(MemberDetailHeaderActions);
