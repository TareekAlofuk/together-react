import * as React from "react";
import {connect} from "react-redux";
import CollectionContainer from "../../../shared/component/CollectionContainer";
import ServiceUsageCollection from "./ServiceUsageCollection";
import Config from "../../../bootstrap/Config";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../../bootstrap/ReduxActions";

interface Props {
    loading: boolean;
    error: boolean;
    services: any[];
    dispatch: (action: any) => void;
    member: any;
}

class ServicesUsage extends React.Component<Props> {

    componentWillMount() {
        this.dispatchFetchServicesUsageAction();
    }

    private dispatchFetchServicesUsageAction() {
        const url = Config.SERVER_URL + "api/services/usage/" + this.props.member.id;
        const action = GETAction(ReduxActions.GET_SERVICES_USAGE, url);
        this.props.dispatch(action);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.member.id !== this.props.member.id) {
            this.dispatchFetchServicesUsageAction();
        }
    }

    render(): JSX.Element {
        return (
            <CollectionContainer loading={this.props.loading}
                                 error={this.props.error}
                                 collection={this.props.services}
                                 renderCollection={() => <ServiceUsageCollection services={this.props.services}/>}/>
        )
    }

}

export default connect((store: any) => {
    return {
        loading: store.ServicesUsage.loading,
        error: store.ServicesUsage.error,
        services: store.ServicesUsage.array
    }
})(ServicesUsage);