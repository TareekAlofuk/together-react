import * as React from "react";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import MemberList from "./Collection/MemberList";
import CollectionContainer from "../../shared/component/CollectionContainer";
import {connect} from "react-redux";
import {Divider, Header} from "semantic-ui-react";

interface Props {
    action: string;
    url: string;

    members: any[];
    loading: boolean;
    error: boolean;

    dispatch: (action: any) => void;
    reducerKey: string;

    title: string;
}

class MemberCollectionContainer extends React.Component<Props> {

    componentDidMount() {
        const action = GETAction(this.props.action, this.props.url);
        this.props.dispatch(action);
    }

    render() {
        return (
            <div>
                <Header size={"small"}>{this.props.title}</Header>
                <Divider/>
                <CollectionContainer loading={this.props.loading} error={this.props.error}
                                     collection={this.props.members}
                                     renderCollection={() => <MemberList members={this.props.members}/>}/>
            </div>
        )
    }
}

export default connect((store: any, props: any) => {
    console.log(store, props);
    return {
        loading: store[props.reducerKey].loading,
        error: store[props.reducerKey].error,
        members: store[props.reducerKey].array
    }
})(MemberCollectionContainer);