import {Route, Switch} from "react-router";
import * as React from "react";
import RegisterService from "./RegisterService";
import AutoCompleteEmployee from "../common/AutoCompleteEmployee";

export default function ServiceRouteSwitch() {
    return <Switch>

        <Route exact path="/services" component={() => {
            return <RegisterService memberId={1}/>
        }}/>

        <Route exact path={'/services/delete'} component={() => <AutoCompleteEmployee/>}/>

    </Switch>
}