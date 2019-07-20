import * as React from 'react';
import {Container} from 'react-grid-system';
import {Switch, Route} from 'react-router-dom';
import NewMemberWizard from './NewMemberWizard/CreateNewMemberPage';
import MemberList from './Collection/MemberList';
import {Button, Divider, Input, Menu} from "semantic-ui-react";
import MemberRouteSwitch from "./MemberRouteSwitch";
import {RouteComponentProps} from "react-router-dom";
import MemberBaseMenuOptions from "./MemberBaseMenuOptions";

export interface IMemberBaseProps {
    route: RouteComponentProps
}

export default class MemberBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <Container style={{marginRight: 16, marginLeft: 16}} fluid={true} className={'page'} id="member-page">

                <div className={'page-container'}>

                    <MemberBaseMenuOptions/>

                    <div className={'vertical-separator'}/>

                    <div className={'option-content'}>
                        <MemberRouteSwitch/>
                    </div>

                </div>

            </Container>
        );
    }
}
