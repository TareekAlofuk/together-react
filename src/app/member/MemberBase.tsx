import * as React from 'react';
import {Container} from 'react-grid-system';
import {Switch, Route} from 'react-router-dom';
import NewMemberWizard from './NewMemberWizard/CreateNewMemberPage';
import {RouteComponentProps} from 'react-router';
import MemberList from './Collection/MemberList';

export interface IMemberBaseProps {
}

export default class MemberBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <Container fluid={false} className="default-page" id="member-page">
                <Switch>
                    <Route exact path="/member" component={() => <MemberList members={[
                        {
                            id: 1,
                            name: 'ali faris',
                            phone: '099999999',
                            secondaryPhone: '000000',
                            email: 'test@gmail.com'
                        },
                        {
                            id: 2, name: 'mustafa', phone: '222333', email: 'email@gmail.com'
                        }
                    ]}/>}/>
                    <Route exact path="/member/wizard"
                           component={(route: RouteComponentProps) => <NewMemberWizard route={route}/>}/>
                    <Route component={() => <h1>NO MEMBER PAGE</h1>}/>
                </Switch>
            </Container>
        );
    }
}
