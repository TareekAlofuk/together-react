import * as React from "react";
import {connect} from "react-redux";
import CollectionContainer from "../../shared/component/CollectionContainer";
import WalletActionReport from "./WalletActionReport";
import Config from "../../bootstrap/Config";
import {GETAction, resetAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../bootstrap/ReduxActions";
import {Divider, Header} from "semantic-ui-react";
import AutoCompleteMember from "../common/AutoCompleteMember";
import {RouteComponentProps} from "react-router";

interface Props {
    loading: boolean;
    error: boolean;
    actions: any[];
    dispatch: (action: any) => void;
    route: RouteComponentProps;
}

interface State {
    memberId: number;
}

class WalletActionReportContainer extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {memberId: null};
    }


    fetchReport() {
        this.props.dispatch(resetAction(ReduxActions.GET_WALLET_ACTIONS));
        const url = Config.SERVER_URL + "api/wallet/report";
        const action = GETAction(ReduxActions.GET_WALLET_ACTIONS, url, {memberId: this.state.memberId});
        this.props.dispatch(action);
    }

    render(): JSX.Element {
        return (
            <div>
                <Header>Select Member</Header>
                <AutoCompleteMember onItemMemberSelected={item => {
                    if (!item)
                        return;
                    this.setState({memberId: item.id}, () => this.fetchReport());
                }}/>
                <Divider/>
                <CollectionContainer loading={this.props.loading} error={this.props.error}
                                     collection={this.props.actions}
                                     renderCollection={() => <WalletActionReport actions={this.props.actions}/>}/>
            </div>
        )
    }

}

export default connect((store: any) => {
    return {
        loading: store.WalletActions.loading,
        error: store.WalletActions.error,
        actions: store.WalletActions.array
    }
})(WalletActionReportContainer)