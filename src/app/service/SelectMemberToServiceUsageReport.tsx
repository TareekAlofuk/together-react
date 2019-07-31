import * as React from "react";
import {RouteComponentProps} from "react-router";
import AutoCompleteMember from "../common/AutoCompleteMember";

interface Props {
    route: RouteComponentProps
}

export default class SelectMemberToServiceUsageReport extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div>
                <AutoCompleteMember onItemMemberSelected={(item: any) => {
                    this.props.route.history.push(`/services/usage/${item.id}`,
                        {member: {...item}});
                }}/>
            </div>
        )
    }

}