import * as React from "react";
import {getWalletActionTypeText, WalletActionType} from "./WalletActionType";
import "./../../styles/wallet.css"

interface Props {
    actions: any[];
}

export default class WalletActionReport extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div>
                <div className={'wallet-action-list'}>
                    <div className={'wallet-action-item captions'}>
                        <span>Action</span>
                        <span>Time</span>
                        <span>Amount</span>
                        <span>New Amount</span>
                        <span>Receiver</span>
                        <span>Ref. Person</span>
                    </div>
                    {
                        this.props.actions.map((item: any) => {
                            return <div className={'wallet-action-item'}>
                                <span
                                    className={`${item.walletActionType === WalletActionType.DEPOSIT ? 'deposit-action' : 'withdraw-action'}`}>
                                    {getWalletActionTypeText(item.walletActionType)}
                                </span>
                                <span>{(item.time)}</span>
                                <span>{(item.amount)}</span>
                                <span>{(item.newAmount)}</span>
                                <span>{(item.receiver)}</span>
                                <span>{(item.referencePerson)}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }

}