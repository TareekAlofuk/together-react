import * as React from 'react';
import PageBase from "../common/pages/PageBase";
import MenuOption from "../common/pages/MenuOption";
import {RouteComponentProps, RouteProps} from "react-router";
import RegisterServiceSegment from "./Register/RegisterServiceSegment";
import ServicesUsageSegment from "./Usage/ServicesUsageSegment";


export default function ServicePageBase() {
    return <PageBase menuOptions={options} routes={routes}/>
}

const options: MenuOption[] = [
    {name: 'register', label: 'Register Service', route: '/services/register'},
    {name: 'report', label: 'Usage', route: '/services/usage'},
    {name: 'delete-service', disabled: true, label: 'Delete Service', route: '/services/delete'},
    {name: 'services-store', disabled: true, label: 'Store', route: '/services'},
    {name: 'services-rule', disabled: true, label: 'Rules', route: '/services'},
];

const routes: RouteProps[] = [
    {
        exact: true, path: '/services', component: (route: RouteComponentProps): any => {
            return <RegisterServiceSegment route={route}/>;
        }
    },
    {
        exact: true, path: '/services/register', component: (route: RouteComponentProps): any => {
            return <RegisterServiceSegment route={route}/>;
        }
    },
    {
        exact: true, path: '/services/usage', component: (route: RouteComponentProps): any => {
            return <ServicesUsageSegment route={route}/>
        }
    },
    {
        exact: true, path: '/services/register/:id(\\d+)', component: (route: any): any => {
            return null;
        }
    },
    {
        exact: true, path: '/services/usage/:id(\\d+)', component: (route: any): any => {
            return null;
        }
    }
];