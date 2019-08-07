import * as React from 'react'
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import MemberBase from '../app/member/MemberBase';
import ServiceBase from "../app/service/ServiceBase";
import WalletBase from "../app/wallet/WalletBase";
import Profile from "../app/profile/Profile";
import SessionManager from "../shared/utils/SessionManager";
import {Header} from "semantic-ui-react";

export default class AppRouter extends React.Component {
    render() {
        const userType = SessionManager.getUserType();
        return (
            <Switch>
                {
                    (userType === "Admin") &&
                    <Route path="/members" component={(route: RouteComponentProps) => <MemberBase route={route}/>}/>
                }
                {
                    (userType === "Admin" || userType === "Control") &&
                    <Route path="/services" component={() => <ServiceBase/>}/>
                }
                {
                    (userType === "Admin" || userType === "Accountant") &&
                    <Route path="/wallet" component={(route: RouteComponentProps) => <WalletBase route={route}/>}/>
                }
                <Route path="/profile" component={(route: RouteComponentProps) => <Profile/>}/>
                <Route exact path={'/logout'} component={() => <Redirect to={'/'}/>}/>
                <Route exact path={'/'} component={() => {
                    let redirectTo = '/404';
                    if (SessionManager.isAdmin()) {
                        redirectTo = '/members';
                    } else if (SessionManager.isControl()) {
                        redirectTo = '/services';
                    } else if (SessionManager.isAccountant()) {
                        redirectTo = '/wallet';
                    }
                    return <Redirect to={redirectTo}/>
                }}/>
                <Route component={() => <div style={{textAlign: 'center'}}>
                    <img className={'ui large image'} style={{margin: '100px auto'}} src={'/images/404.svg'} alt={''}/>
                    <Header size={'medium'}>404 PAGE NOT FOUND</Header>
                </div>}/>
            </Switch>
        )
    }
}


//TODO : print card
//TODO : services form => discount editable , discount type
//TODO : REMOVE ALL SLEEP