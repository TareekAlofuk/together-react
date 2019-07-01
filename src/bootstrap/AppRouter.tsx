import * as React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateMember from '../app/member/Create/CreateMember';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/member/create" component={() => <CreateMember />} />
                <Route component={() => <h1>404 PAGE NOT FOUND</h1>} />
            </Switch>
        )
    }
}
