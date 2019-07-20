import * as React from 'react';
import {Container} from 'react-grid-system';
import {RouteComponentProps} from 'react-router-dom';
import MemberRouteSwitch from "./MemberRouteSwitch";
import MemberBaseMenuOptions from "./MemberBaseMenuOptions";
import {toastr} from 'react-redux-toastr'

export interface IMemberBaseProps {
    route: RouteComponentProps
}


export default class MemberBase extends React.Component<IMemberBaseProps> {

    componentDidMount() {
        toastr.error('The title', 'The message', {timeOut: 50000});
    }

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
