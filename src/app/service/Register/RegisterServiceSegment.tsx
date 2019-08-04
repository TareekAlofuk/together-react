import * as React from 'react';
import {Divider, Header} from "semantic-ui-react";
import RegisterService from "./RegisterService";
import {RouteComponentProps} from "react-router";
import {Col, Row} from "react-grid-system";
import AutoCompleteMember from "../../common/AutoCompleteMember";


interface State {
    member: any;
}

interface Props {
    route: RouteComponentProps
}

export default class RegisterServiceSegment extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {member: null};
    }

    render() {
        return (
            <div>
                <Header size={"small"}>Register Service</Header>
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
                    <RegisterService member={this.state.member} route={this.props.route}/>
                }
            </div>
        );
    }
}