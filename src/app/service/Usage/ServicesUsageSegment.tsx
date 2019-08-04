import * as React from 'react';
import AutoCompleteMember from "../../common/AutoCompleteMember";
import {Divider, Header} from "semantic-ui-react";
import RegisterService from "../Register/RegisterService";
import {RouteComponentProps} from "react-router";
import {Col, Row} from "react-grid-system";
import ServicesUsage from "./ServicesUsage";


interface State {
    member: any;
}

interface Props {
    route: RouteComponentProps
}

export default class ServicesUsageSegment extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {member: null};
    }

    render() {
        return (
            <div>
                <Header size={"small"}>Services Usage</Header>
                <Divider/>
                <Row>
                    <Col md={6}>
                        <div style={{margin: 16}}>
                            <AutoCompleteMember placeholder={'SELECT MEMBER'} align={'left'}
                                                onItemMemberSelected={member => this.setState({member: member})}/>
                        </div>
                    </Col>
                </Row>
                {
                    this.state.member &&
                    <ServicesUsage member={this.state.member}/>
                }
            </div>
        );
    }
}