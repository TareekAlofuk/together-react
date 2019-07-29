import * as React from 'react';
import {Container} from 'react-grid-system';
import {RouteComponentProps} from 'react-router-dom';
import ServiceRouteSwitch from "./ServiceRouteSwitch";
import ServiceBaseMenuOptions from "./ServiceBaseMenuOptions";

export interface IMemberBaseProps {
    route: RouteComponentProps
}


export default class ServiceBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <Container style={{margin: 24}} fluid={true} className={'page'} id="member-page">

                <div className={'page-container'}>

                    <ServiceBaseMenuOptions/>

                    <div className={'vertical-separator'}/>

                    <div className={'option-content'}>
                        <ServiceRouteSwitch/>
                    </div>

                </div>

            </Container>
        );
    }
}
