import {Route, RouteComponentProps, Switch} from "react-router";
import NewMemberWizard from "./NewMemberWizard/CreateNewMemberPage";
import * as React from "react";
import MemberCollectionContainer from "./MemberCollectionContainer";
import ReduxActions from "../../bootstrap/ReduxActions";
import Config from "../../bootstrap/Config";
import MemberDetails from "./MemberDetails/MemberDetails";
import EditMember from "./EditMember";
import MembershipManagement from "./MembershipManagement";
import MemberCredentials from "./MemberCredentials";
import {NotFound} from "../../shared/component/NotFound";

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

        <Route exact path={"/members/:id(\\d+)"} component={(route: any) => <MemberDetails route={route} member={{
            id: 1,
            name: "Ali Faris",
            type: 1,
            expiredDate: "2019-09-09",
            phone: "0780003434",
            phone2: "045345345",
            passportImage: "https://i.ytimg.com/vi/WzX0zNAgScA/maxresdefault.jpg",
            faceImage: "https://scotch-res.cloudinary.com/image/upload/w_1500,q_auto:good,f_auto/media/1/MyiYcendTBiZK0iU35n6_using-the-react-router-4.png.jpg",
            files: [{displayFileName: "File 1"}, {displayFileName: "File 2"}],
        }}/>}/>


        <Route exact path={"/members/:id(\\d+)/edit"}
               component={(route: any) => <EditMember route={route} member={{}}/>}/>

        <Route exact path={'/members/:id(\\d+)/membership'}
               component={() => <MembershipManagement/>}/>

        <Route exact path={'/members/:id(\\d+)/credentials'}
               component={() => <MemberCredentials/>}/>

        <Route exact path={'/members/:id(\\d+)/report'}
               component={() => <h1>TODO : REPORT COMPONENT</h1>}/>

        <Route component={() => <NotFound message={'PAGE NOT FOUND'}/>}/>


    </Switch>
}