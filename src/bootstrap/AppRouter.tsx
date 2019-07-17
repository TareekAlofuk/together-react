import * as React from 'react'
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import MemberBase from '../app/member/MemberBase';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/members" component={(route : RouteComponentProps) => <MemberBase route={route} />} />
                <Route component={() => <h1>404 PAGE NOT FOUND</h1>} />
            </Switch>
        )
    }
}
