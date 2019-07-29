import * as React from 'react'
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import MemberBase from '../app/member/MemberBase';
import RegisterService from "../app/service/RegisterService";
import ServiceBase from "../app/service/ServiceBase";

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/members" component={(route: RouteComponentProps) => <MemberBase route={route}/>}/>
                <Route path="/services" component={(route: RouteComponentProps) => <ServiceBase route={route} />}/>
                <Route exact path={'/'} component={() => <Redirect to={'/members'}/>}/>
                <Route component={() => <h1>404 PAGE NOT FOUND</h1>}/>
            </Switch>
        )
    }
}
