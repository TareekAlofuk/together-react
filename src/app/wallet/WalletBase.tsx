import * as React from 'react';
import {Container} from 'react-grid-system';
import {RouteComponentProps} from 'react-router-dom';
import WalletRouteSwitch from "./WalletRouteSwitch";
import WalletBaseMenuOptions from "./WalletBaseMenuOptions";

export interface IMemberBaseProps {
    route: RouteComponentProps
}


export default class WalletBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <Container style={{margin: 24}} fluid={true} className={'page'} id="member-page">

                <div className={'page-container'}>

                    <WalletBaseMenuOptions/>

                    <div className={'vertical-separator'}/>

                    <div className={'option-content'}>
                        <WalletRouteSwitch/>
                    </div>

                </div>

            </Container>
        );
    }
}
