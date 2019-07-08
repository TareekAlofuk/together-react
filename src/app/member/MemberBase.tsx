import * as React from 'react';
import { Container } from 'react-grid-system';
import { Switch, Route } from 'react-router-dom';
import NewMemberWizard from './NewMemberWizard/CreateNewMemberPage';
import { RouteComponentProps } from 'react-router';

export interface IMemberBaseProps {
}

export default class MemberBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <Container fluid={false} className="default-page" id="member-page">
                <Switch>
                    <Route exact path="/member/wizard" component={(route: RouteComponentProps) => <NewMemberWizard route={route} />} />
                    <Route component={() => <h1>NO MEMBER PAGE</h1>} />
                </Switch>
            </Container>
        );
    }
}
