import {Route, Switch} from "react-router";
import * as React from "react";
import SelectMemberToRegisterService from "./SelectMemberToRegisterService";
import RegisterService from "./RegisterService";
import ServicesUsage from "./ServicesUsage";
import SelectMemberToServiceUsageReport from "./SelectMemberToServiceUsageReport";

export default function ServiceRouteSwitch() {
    return <Switch>

        <Route exact path="/services" component={(route: any) => {
            return <SelectMemberToRegisterService route={route}/>
        }}/>

        <Route exact path="/services/register" component={(route: any) => {
            return <SelectMemberToRegisterService route={route}/>
        }}/>

        <Route exact path="/services/usage" component={(route: any) => {
            return <SelectMemberToServiceUsageReport route={route}/>
        }}/>

        <Route exact path={'/services/register/:id(\\d+)'}
               component={(route: any) => <RegisterService route={route} memberId={route.match.params.id}/>}/>
        <Route exact path={'/services/usage/:id(\\d+)'}
               component={(route: any) => <ServicesUsage memberId={route.match.params.id}/>}/>

    </Switch>
}