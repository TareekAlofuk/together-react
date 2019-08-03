import * as React from 'react'
import "./styles.css";
import NavBar from './NavBar';
import AutoCompleteMember from "../../app/common/AutoCompleteMember";
import {withRouter} from "react-router";

export default class AppBar extends React.Component {
    render() {
        return (
            <div id="app-bar">
                <div className="logo">
                    <img src="/images/logo.png"/>
                    <span style={{color: '#FFFF'}}>Together</span>
                </div>
                <NavBar/>
                <div className="actions">
                    <WithMemberProfileNavigatorWithRouter/>
                </div>
            </div>
        )
    }
}


function MemberProfileNavigator(props: any) {
    return <AutoCompleteMember onItemMemberSelected={(item: any) => {
        if (item == null)
            return;
        props.history.push('/profile', {member: item});
    }}/>
}

const WithMemberProfileNavigatorWithRouter = withRouter(MemberProfileNavigator);