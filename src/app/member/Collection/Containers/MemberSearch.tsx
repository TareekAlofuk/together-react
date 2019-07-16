import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import MemberList from "../MemberList";

interface Props {
    members: any[];
    loading: boolean;
    error: boolean;
}

class MemberSearch extends PureComponent<Props> {
    render() {
        return (
            <div>
                <MemberList members={this.props.members} error={this.props.error} loading={this.props.loading}/>
            </div>
        );
    }
}

export default connect((store: any) => {
    return {
        loading: store.MemberSearchResult.loading,
        error: store.MemberSearchResult.error,
        result: store.MemberSearchResult.array
    }
})(MemberSearch);
