import * as React from "react";
import {connect} from "react-redux";
import CollectionContainer from "../../shared/component/CollectionContainer";
import WalletActionReport from "./WalletActionReport";
import Config from "../../bootstrap/Config";
import {GETAction, resetAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../bootstrap/ReduxActions";

interface Props {
    loading: boolean;
    error: boolean;
    actions: any[];
    memberId: number;
    dispatch: (action: any) => void;
}


class WalletActionReportContainer extends React.Component<Props> {

    componentDidMount() {
        this.props.dispatch(resetAction(ReduxActions.GET_WALLET_ACTIONS));
        const url = Config.SERVER_URL + "api/wallet/report";
        const action = GETAction(ReduxActions.GET_WALLET_ACTIONS, url, {memberId: this.props.memberId});
        this.props.dispatch(action);
    }

    render(): JSX.Element {
        return (
            <CollectionContainer loading={this.props.loading} error={this.props.error}
                                 collection={this.props.actions}
                                 renderCollection={() => <WalletActionReport actions={this.props.actions}/>}/>
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