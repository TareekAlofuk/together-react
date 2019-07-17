import * as React from 'react';
import {Container} from 'react-grid-system';
import MemberRouteSwitch from "./MemberRouteSwitch";
import {Link, RouteComponentProps} from "react-router-dom";

export interface IMemberBaseProps {
    route: RouteComponentProps
}

export default class MemberBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <Container style={{marginRight: 16, marginLeft: 16}} fluid={true} className={'page'} id="member-page">

                <div className={'page-container'}>

                    <div className={'page-menu'}>
                        <Link className={'page-menu-option'} to={'/members'}>Home</Link>
                        <Link className={'page-menu-option'} to={'/members/wizard'}>Create Wizard</Link>
                    </div>

                    <div className={'vertical-separator'}/>

                    <div className={'option-content'}>
                        <MemberRouteSwitch/>
                    </div>

                </div>

            </Container>
        );
    }
}
