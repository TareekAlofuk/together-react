import * as React from "react";
import AutoCompleteMember from "../common/AutoCompleteMember";
import {RouteComponentProps} from "react-router";

interface Props {
    route: RouteComponentProps;
}

export default class SelectMemberForWalletActionReport extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div>
                <AutoCompleteMember
                    onItemMemberSelected={item => item && this.props.route.history.push(`/wallet/report`, {member: item})}/>
            </div>
        )
    }

}