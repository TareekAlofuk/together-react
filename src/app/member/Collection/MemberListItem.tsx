import * as React from 'react';
import {Button} from "semantic-ui-react";
import {getMembershipTypeText} from "../MembershipType";
import DateUtils from "../../../shared/utils/DateUtils";

export interface IMemberListItemProps {
    member: any;
}

export default class MemberListItem extends React.Component<IMemberListItemProps> {
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
                    <Button color='yellow' icon="edit"/>
                    <Button color='blue' icon="file"/>
                </div>
            </div>
        );
    }
}
