import * as React from 'react'
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import CreateMember from '../app/member/Create/CreateMember';
import EditMember from '../app/member/EditMember';
import InfoMember from '../app/member/Create/InfoMember';
import { match } from "react-router";
import MemberBase from '../app/member/MemberBase';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/member" component={() => <MemberBase />} />
                <Route component={() => <h1>404 PAGE NOT FOUND</h1>} />
            </Switch>
        )
    }
}
