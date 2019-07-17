import {Route, RouteComponentProps, Switch} from "react-router";
import NewMemberWizard from "./NewMemberWizard/CreateNewMemberPage";
import * as React from "react";

export default function MemberRouteSwitch() {
    return <Switch>
        <Route exact path="/member" component={() => <h1>MEMBER CONTAINER</h1>}/>
        <Route exact path="/member/wizard"
               component={(route: RouteComponentProps) => <NewMemberWizard route={route}/>}/>
        <Route component={() => <h1>NO MEMBER PAGE</h1>}/>
    </Switch>
}