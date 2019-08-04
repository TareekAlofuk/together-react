import {Route, RouteProps, Switch} from "react-router";
import * as React from "react";

interface PageRouteSwitchProps {
    routes: RouteProps[];
}

export default function PageRouteSwitch(props: PageRouteSwitchProps) {
    return <Switch>
        {
            props.routes.map((route: RouteProps, index: number) => {
                return <Route key={index} {...route}/>
            })
        }
    </Switch>
}