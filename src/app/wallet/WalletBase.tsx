import * as React from 'react';
import {RouteComponentProps, RouteProps} from 'react-router-dom';
import PageBase from "../common/pages/PageBase";
import MenuOption from "../common/pages/MenuOption";
import WalletAction from "./WalletAction";
import WalletActionReportContainer from "./WalletActionReportContainer";
import {WalletActionType} from "./WalletActionType";

export interface IMemberBaseProps {
    route: RouteComponentProps
}


export default class WalletBase extends React.Component<IMemberBaseProps> {
    public render() {
        return (
            <PageBase menuOptions={options} routes={routes}/>
        );
    }
}

const options: MenuOption[] = [
    {name: 'deposit', label: 'Deposit', route: '/wallet/deposit'},
    {name: 'withdraw', label: 'Withdraw', route: '/wallet/withdraw'},
    {name: 'actions', label: 'Report', route: '/wallet/actions'},
];
const routes: RouteProps[] = [
    {exact: true, path: '/wallet/deposit', component: () => <WalletAction actionType={WalletActionType.DEPOSIT}/>},
    {exact: true, path: '/wallet/withdraw', component: () => <WalletAction actionType={WalletActionType.WITHDRAW}/>},
    {exact: true, path: '/wallet/actions', component: (route: any) => <WalletActionReportContainer route={route}/>},
];