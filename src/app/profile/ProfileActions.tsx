import {Menu} from "semantic-ui-react";
import {withRouter} from "react-router";
import * as React from "react";
import {useState} from "react";

interface ProfileActionsProps {
    location: any;
    match: any;
    history: any;
    member: any;
}

function ProfileActions(props: ProfileActionsProps) {

    const [selected, setSelected] = useState('');
    return <Menu style={{margin: 0}} secondary>
        <Menu.Item active={selected === 'services'} name={'SERVICES'}
                   onClick={() => {
                       navigateToProfileSection(props.history.push, 'services', props.member);
                       setSelected('services');
                   }}/>

        <Menu.Item active={selected === 'wallet'} name={'WALLET ACTIONS'}
                   onClick={() => {
                       navigateToProfileSection(props.history.push, 'wallet', props.member);
                       setSelected('wallet');
                   }}/>

        <Menu.Item active={selected === 'main-files'} name={'PASSPORT+IDENTITY IMAGE'}
                   onClick={() => {
                       navigateToProfileSection(props.history.push, 'passport-identity-image', props.member);
                       setSelected('main-files');
                   }}/>

        <Menu.Item active={selected === 'attachments'} name={'Attachments'}
                   onClick={() => {
                       navigateToProfileSection(props.history.push, 'attachments', props.member);
                       setSelected('attachments')
                   }}/>
    </Menu>;
}

function navigateToProfileSection(pushFunc: any, route: string, member: any) {
    pushFunc(`/profile/${route}`, {member: member});
}

export default withRouter(ProfileActions);