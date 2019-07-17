import {Route, RouteComponentProps, Switch} from "react-router";
import NewMemberWizard from "./NewMemberWizard/CreateNewMemberPage";
import * as React from "react";
import MemberCollectionContainer from "./MemberCollectionContainer";
import ReduxActions from "../../bootstrap/ReduxActions";
import Config from "../../bootstrap/Config";

export default function MemberRouteSwitch() {
    return <Switch>
        <Route exact path="/members" component={() => {
            const url = Config.SERVER_URL + "api/members";
            return <MemberCollectionContainer title={'Recent Members'} action={ReduxActions.GET_RECENT_MEMBERS}
                                              reducerKey={"RecentMembers"}
                                              url={url}/>
        }}/>
        <Route exact path="/members/disabled" component={() => {
            const url = Config.SERVER_URL + "api/members/disabled";
            return <MemberCollectionContainer title={"Disabled Memberships"} action={ReduxActions.GET_DISABLED_MEMBERS}
                                              reducerKey={"DisabledMembers"}
                                              url={url}/>
        }}/>

        <Route exact path="/members/archived" component={() => {
            const url = Config.SERVER_URL + "api/members/archived";
            return <MemberCollectionContainer title={"Archived Members"} action={ReduxActions.GET_ARCHIVED_MEMBERS}
                                              reducerKey={"ArchivedMembers"}
                                              url={url}/>
        }}/>

        <Route exact path="/members/expired" component={() => {
            const url = Config.SERVER_URL + "api/members/expired";
            return <MemberCollectionContainer title={"Expired Memberships"} action={ReduxActions.GET_EXPIRED_MEMBERS}
                                              reducerKey={"ExpiredMembers"}
                                              url={url}/>
        }}/>

        <Route exact path="/members/nearly-expired" component={() => {
            const url = Config.SERVER_URL + "api/members/will-expired";
            return <MemberCollectionContainer title="Memberships Will Expired Soon"
                                              action={ReduxActions.GET_NEARLY_EXPIRED_MEMBERS}
                                              reducerKey={"WillExpireMembers"}
                                              url={url}/>
        }}/>

        <Route exact path="/members/wizard"
               component={(route: RouteComponentProps) => <NewMemberWizard route={route}/>}/>
        <Route component={() => <h1>TODO : 404 FOR MEMBER PAGE</h1>}/>
    </Switch>
}