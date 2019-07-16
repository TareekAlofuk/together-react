import * as React from 'react';
import {Container} from 'react-grid-system';
import {Switch, Route} from 'react-router-dom';
import NewMemberWizard from './NewMemberWizard/CreateNewMemberPage';
import {RouteComponentProps} from 'react-router';
import MemberList from './Collection/MemberList';
import {Button, Divider, Input, Menu} from "semantic-ui-react";

export interface IMemberBaseProps {
}

export default class MemberBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <Container fluid={true} style={{marginLeft: 16, marginRight: 16}} className="default-page" id="member-page">
                <div className={'xxxxx'} style={{display: 'flex'}}>
                    <Menu secondary vertical style={{background: '#FFF', margin: '0', borderRadius: 1 , padding : 24}}>
                        <a className={'item'} style={{width : '100%'}}>
                            HOME
                        </a>
                        <Menu.Item name='UNACTIVE'/>
                        <Menu.Item name='ARCHIVED'/>
                        <Menu.Item name='CREATE WIZARD'/>
                        <Menu.Item name='EXPIRED & NEARLY EXPIRED'/>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Input icon='search' placeholder='Search...'/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <div style={{width: 16}}/>
                    <div style={{background: '#FFF', flex: 1, borderRadius: 3 , minHeight : '80vh' , padding : '0 24px'}}>
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
                    </div>
                </div>
            </Container>
        );
    }
}
