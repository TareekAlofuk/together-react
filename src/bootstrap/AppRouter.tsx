import * as React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateMember from '../app/member/Create/CreateMember';
import EditMember from '../app/member/EditMember';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/member/create" component={() => <CreateMember />} />
                <Route exact path="/member/edit" component={() => <EditMember />} />

                <Route component={() => <h1>404 PAGE NOT FOUND</h1>} />
            </Switch>
        )
    }
}
