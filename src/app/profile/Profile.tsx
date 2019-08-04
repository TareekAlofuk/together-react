import * as React from 'react';
import MemberDetailHeader from "../member/MemberDetails/MemberDetailHeader";
import {Redirect, withRouter} from "react-router";
import Config from "../../bootstrap/Config";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import ReduxActions from "../../bootstrap/ReduxActions";
import {connect} from "react-redux";
import MemberMainInfo from "../member/MemberDetails/MemberMainInfo";
import NetworkingComponent from "../common/NetworkingComponent";
import {Divider} from "semantic-ui-react";
import ProfileActions from "./ProfileActions";
import ProfileRouteSwitch from "./ProfileRouteSwitch";

interface Props {
    location: any;
    match: any;
    history: any;
    member: any;
    loadingMember: boolean;
    errorMember: boolean;
    dispatch: (action: any) => void;
}

class Profile extends React.Component<Props> {

    componentWillMount(): void {
        if (this.props.location.state && this.props.location.state.member) {
            const url = Config.SERVER_URL + "api/members/" + this.props.location.state.member.id;
            const action = GETAction(ReduxActions.FETCH_MEMBER_DETAIL, url);
            this.props.dispatch(action);
        }
    }

    render() {
        if (!this.props.location.state || !this.props.location.state.member)
            return <Redirect to={'/members'}/>;
        const member = this.props.location.state.member;
        return (
            <div id={'profile'} style={{margin: 24, padding: 16, background: '#FFF', minHeight: 500, borderRadius: 3}}>
                <MemberDetailHeader title={`Member Profile : ${member.name}`} member={member}/>
                <Divider/>
                <NetworkingComponent loading={this.props.loadingMember}
                                     error={this.props.errorMember}
                                     ready={!!this.props.member}
                                     component={() => <MemberMainInfo member={this.props.member}/>}/>

                <Divider hidden/><Divider hidden/><Divider hidden/>
                {
                    this.props.member && <ProfileActions member={this.props.member}/>
                }
                <Divider/>
                {
                    this.props.member && <ProfileRouteSwitch member={this.props.member}/>
                }

            </div>
        );
    }
}


const ProfileWithRouter = withRouter(Profile);
export default connect((store: any) => {
    return {
        loadingMember: store.MemberDetail.loading,
        errorMember: store.MemberDetail.error,
        member: store.MemberDetail.object,
    }
})(ProfileWithRouter);
