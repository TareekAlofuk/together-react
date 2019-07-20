import * as React from 'react';
import {Component} from "react";
import {Divider, Header, Input} from "semantic-ui-react";
import CollectionContainer from "../../../shared/component/CollectionContainer";
import MemberList from "./MemberList";
import {connect} from "react-redux";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import Config from "../../../bootstrap/Config";
import ReduxActions from "../../../bootstrap/ReduxActions";

interface Props {
    members: any[];
    loading: boolean;
    error: boolean;
    dispatch: (action: any) => void;
}

class MemberSearch extends Component<Props> {
    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Header style={{margin: 0}} size={"small"}>Search</Header>
                    <Input icon={'search'} onKeyPress={this.onKeyPress} placeholder={"name or id"}/>
                </div>
                <Divider/>
                <CollectionContainer loading={this.props.loading} error={this.props.error}
                                     collection={this.props.members}
                                     renderCollection={() => <MemberList members={this.props.members}/>}/>
            </div>
        );
    }

    private onKeyPress = (e: any) => {
        const query = e.target.value;
        if (e.key === "Enter" && query.trim() !== '') {
            const url = Config.SERVER_URL + "api/members/search";
            const action = GETAction(ReduxActions.SEARCH_FOR_MEMBER, url, {query: query});
            this.props.dispatch(action);
        }
    }
}

export default connect((store: any) => {
    return {
        loading: store.MemberSearchResult.loading,
        error: store.MemberSearchResult.error,
        members: store.MemberSearchResult.array
    }
})(MemberSearch);
