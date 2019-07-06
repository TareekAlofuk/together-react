import * as React from 'react'
import {BrowserRouter, Route, RouteComponentProps, Switch} from "react-router-dom";
import CreateMember from '../app/member/Create/CreateMember';
import EditMember from '../app/member/EditMember';
import InfoMember from  '../app/member/Create/InfoMember';
import {match} from "react-router";

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/member/create" component={() => <CreateMember />} />
                <Route exact path="/member/edit" component={() => <EditMember />} />

                <Route path="/member/InfoMember/:id" component={(route:any) => <InfoMember id={route.match.params["id"]} route={route} />} />


                <Route component={() => <h1>404 PAGE NOT FOUND</h1>} />
            </Switch>
        )
    }
}
