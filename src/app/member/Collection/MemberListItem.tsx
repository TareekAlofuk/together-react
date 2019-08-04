import * as React from 'react';
import {getMembershipTypeText} from "../MembershipType";
import DateUtils from "../../../shared/utils/DateUtils";
import {Link, withRouter} from "react-router-dom";
import {Button} from "semantic-ui-react";

export interface IMemberListItemProps {
    member: any;
    history: any;
    match: any;
    location: any;
}

class MemberListItem extends React.Component<IMemberListItemProps> {
    public render() {
        return (
            <div className="member-list-item">
                <div className="member-id">
                    <span>{this.props.member.id}</span>
                </div>
                <div className="member-avatar">
                    <img className="member-avatar" src="https://ya-webdesign.com/images/avatar-png-1.png"/>
                    <div className="member-info">
                        <div className="member-name">{this.props.member.title + " " + this.props.member.name}</div>
                    </div>
                </div>
                <div className="member-phone">
                    <span>
                        {this.props.member.phone}
                        {this.props.member.secondaryPhone ? ` / ${this.props.member.secondaryPhone}` : ''}
                    </span>
                </div>
                <div className="member-email">
                    <span>
                        {this.props.member.email ? this.props.member.email : 'NO-EMAIL'}
                    </span>
                </div>
                <div className={`member-type member-type-${this.props.member.type}`}>
                    <span>
                        {getMembershipTypeText(this.props.member.type)}
                    </span>
                </div>
                <div className="member-job-title">
                    <span>
                        {this.props.member.jobTitle}
                    </span>
                </div>

                <div className="member-join-date">
                    <span>
                        {DateUtils.fixEFCoreDate(this.props.member.joinDate)}
                    </span>
                </div>

                <div className="member-actions">
                    <Button className={'ui icon button blue'}>
                        <i className={'icon mobile alternate'}/>
                    </Button>
                    <Button className={'ui icon button blue'}>
                        <i className={'icon envelope'}/>
                    </Button>
                    <Button className={'ui icon button yellow'}
                            onClick={() => {
                                this.props.history.push(
                                    `/members/${this.props.member.id}/edit`,
                                    {...this.props.member})
                            }}>
                        <i className={'icon edit'}/>
                    </Button>
                    <Link className={'ui icon button blue'}
                          to={`/members/${this.props.member.id}`}>
                        <i className={'icon file'}/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(MemberListItem);