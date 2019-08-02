import {Route, Switch} from "react-router";
import * as React from "react";
import WalletAction, {WalletActionType} from "./WalletAction";
import WalletActionReportContainer from "./WalletActionReportContainer";

export default function WalletRouteSwitch() {
    return <Switch>

        <Route exact path="/wallet/deposit" component={(route: any) => {
            return <WalletAction actionType={WalletActionType.DEPOSIT}/>
        }}/>

        <Route exact path="/wallet/withdraw" component={(route: any) => {
            return <WalletAction actionType={WalletActionType.WITHDRAW}/>
        }}/>

        <Route exact path="/wallet/report" component={(route: any) => {
            return <WalletActionReportContainer  route={route}/>
        }}/>

    </Switch>
}