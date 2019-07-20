import * as React from 'react';
import {PureComponent} from 'react';
import {connect} from "react-redux";
import MemberList from "../MemberList";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../../../bootstrap/ReduxActions";
import Config from "../../../../bootstrap/Config";
import CollectionContainer from "../../../../shared/component/CollectionContainer";

interface Props {
    members: any[];
    loading: boolean;
    error: boolean;

    dispatch: (action: any) => any
}

class MemberSearchResult extends PureComponent<Props> {

    componentDidMount() {
        const url = Config.SERVER_URL + "api/members";
        const action = GETAction(ReduxActions.SEARCH_FOR_MEMBER, url);
        this.props.dispatch(action);
    }

    render() {
        return (
            <CollectionContainer loading={this.props.loading} error={this.props.error} collection={this.props.members}
                                 renderCollection={() => <MemberList members={this.props.members}/>}/>
        );
    }
}

export default connect((store: any) => {
    return {
        loading: store.MemberSearchResult.loading,
        error: store.MemberSearchResult.error,
        result: store.MemberSearchResult.array
    }
})(MemberSearchResult);
