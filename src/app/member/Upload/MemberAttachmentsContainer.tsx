import * as React from "react";
import CollectionContainer from "../../../shared/component/CollectionContainer";
import MemberFiles from "./MemberFiles";
import {connect} from "react-redux";
import Config from "../../../bootstrap/Config";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../../bootstrap/ReduxActions";

interface Props {
    loading: true,
    error: true,
    attachments: any[];
    dispatch: (action: any) => void;
    memberId: number;
}

class MemberAttachmentsContainer extends React.Component<Props> {

    componentWillMount() {
        const url = Config.SERVER_URL + `api/members/${this.props.memberId}/attachments`;
        const action = GETAction(ReduxActions.GET_MEMBER_ATTACHMENTS, url);
        this.props.dispatch(action);
    }


    render() {
        return <CollectionContainer loading={this.props.loading} error={this.props.error}
                                    collection={this.props.attachments}
                                    renderCollection={() => <MemberFiles files={this.props.attachments}/>}
        />
    }
}

export default connect((store: any) => {
    return {
        loading: store.MemberAttachments.loading,
        error: store.MemberAttachments.error,
        attachments: store.MemberAttachments.array,
    }
})(MemberAttachmentsContainer);