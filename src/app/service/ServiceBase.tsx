import * as React from 'react';
import PageBase from "../common/pages/PageBase";
import MenuOption from "../common/pages/MenuOption";
import {RouteComponentProps, RouteProps} from "react-router";
import SelectMemberToRegisterService from "./SelectMemberToRegisterService";
import SelectMemberToServiceUsageReport from "./SelectMemberToServiceUsageReport";
import RegisterService from "./RegisterService";
import ServicesUsage from "./ServicesUsage";


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
            return <SelectMemberToRegisterService route={route}/>;
        }
    },
    {
        exact: true, path: '/services/register', component: (route: RouteComponentProps): any => {
            return <SelectMemberToRegisterService route={route}/>;
        }
    },
    {
        exact: true, path: '/services/usage', component: (route: RouteComponentProps): any => {
            return <SelectMemberToServiceUsageReport route={route}/>
        }
    },
    {
        exact: true, path: '/services/register/:id(\\d+)', component: (route: any): any => {
            return <RegisterService memberId={route.match.params.id} route={route}/>
        }
    },
    {
        exact: true, path: '/services/usage/:id(\\d+)', component: (route: any): any => {
            return <ServicesUsage memberId={route.match.params.id}/>
        }
    }
];