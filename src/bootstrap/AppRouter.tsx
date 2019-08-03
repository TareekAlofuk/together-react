import * as React from 'react'
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import MemberBase from '../app/member/MemberBase';
import ServiceBase from "../app/service/ServiceBase";
import WalletBase from "../app/wallet/WalletBase";
import Profile from "../app/profile/Profile";

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/members" component={(route: RouteComponentProps) => <MemberBase route={route}/>}/>
                <Route path="/services" component={(route: RouteComponentProps) => <ServiceBase route={route}/>}/>
                <Route path="/wallet" component={(route: RouteComponentProps) => <WalletBase route={route}/>}/>
                <Route path="/users" component={(route: RouteComponentProps) => <div>TODO</div>}/>
                <Route path="/profile" component={(route: RouteComponentProps) => <Profile/>}/>
                <Route exact path={'/'} component={() => <Redirect to={'/members'}/>}/>
                <Route component={() => <h1>404 PAGE NOT FOUND</h1>}/>
            </Switch>
        )
    }
}
