import {Route, RouteComponentProps, Switch} from "react-router";
import NewMemberWizard from "./NewMemberWizard/NewMemberWizard";
import * as React from "react";
import MemberCollectionContainer from "./MemberCollectionContainer";
import ReduxActions from "../../bootstrap/ReduxActions";
import Config from "../../bootstrap/Config";
import MemberDetails from "./MemberDetails/MemberDetails";
import EditMember from "./EditMember";
import MemberCredentials from "./MemberCredentials";
import {NotFound} from "../../shared/component/NotFound";
import MemberSearch from "./Collection/MemberSearch";
import UpgradeMembership from "./UpgradeMembership";

export default function MemberRouteSwitch() {
    return <Switch>

        <Route exact path="/members" component={() => {
            const url = Config.SERVER_URL + "api/members";
            return <MemberCollectionContainer title={'Recent Members'} action={ReduxActions.GET_RECENT_MEMBERS}
                                              reducerKey={"RecentMembers"}
                                              url={url}/>
        }}/>

        <Route exact path="/members/recent" component={() => {
            const url = Config.SERVER_URL + "api/members/recent";
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

        <Route exact path="/members/will-expired" component={() => {
            const url = Config.SERVER_URL + "api/members/will-expire";
            return <MemberCollectionContainer title="Memberships Will Expired Soon"
                                              action={ReduxActions.GET_NEARLY_EXPIRED_MEMBERS}
                                              reducerKey={"WillExpireMembers"}
                                              url={url}/>
        }}/>

        <Route exact path="/members/wizard"
               component={(route: RouteComponentProps) => <NewMemberWizard route={route}/>}/>

        <Route exact path={"/members/:id(\\d+)"}
               component={(route: any) => <MemberDetails memberId={route.match.params.id} route={route}/>}/>


        <Route exact path={"/members/:id(\\d+)/edit"}
               component={(route: any) => <EditMember route={route} member={{}}/>}/>

        <Route exact path={'/members/:id(\\d+)/upgrade'}
               component={(route: any) => <UpgradeMembership route={route} memberId={route.match.params.id}/>}/>

        <Route exact path={'/members/:id(\\d+)/credentials'}
               component={(route: any) => <MemberCredentials
                   memberId={route.match.params.id}/>}/>

        <Route exact path={'/members/:id(\\d+)/report'}
               component={() => <h1>TODO : REPORT COMPONENT</h1>}/>

        <Route exact path={'/members/search'} component={MemberSearch}/>


        <Route exact path="/members/passport-will-expire" component={() => {
            const url = Config.SERVER_URL + "api/members/passport-will-expire";
            return <MemberCollectionContainer title="Passport Will Expired Soon"
                                              action={ReduxActions.GET_PASSPORT_NEARLY_EXPIRED}
                                              reducerKey={"WillExpirePassport"}
                                              url={url}/>
        }}/>

        <Route exact path="/members/on-birth-date" component={() => {
            const url = Config.SERVER_URL + "api/members/on-birth-date";
            return <MemberCollectionContainer title="Member With BirthDate"
                                              action={ReduxActions.GET_MEMBER_WITH_BIRTH_DATE}
                                              reducerKey={"MemberWithBirthDate"}
                                              url={url}/>
        }}/>

        <Route component={() => <NotFound message={'PAGE NOT FOUND'}/>}/>

    </Switch>
}