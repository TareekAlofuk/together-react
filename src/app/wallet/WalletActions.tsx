import * as React from "react";
import {Divider, Header} from "semantic-ui-react";
import {Col, Row} from "react-grid-system";
import AutoCompleteMember from "../common/AutoCompleteMember";
import WalletActionReportContainer from "./WalletActionReportContainer";

interface State {
    member: any;
}

export default class WalletActions extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {member: null};
    }

    render(): JSX.Element {
        return <div>
            <Header>Select Member</Header>
            <Row>
                <Col>
                    <AutoCompleteMember onItemMemberSelected={item => this.setState({member: item})}/>
                </Col>
            </Row>
            <Divider/>
            {
                this.state.member &&
                <WalletActionReportContainer memberId={this.state.member.id}/>
            }
        </div>
    }
}