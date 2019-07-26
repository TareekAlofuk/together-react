import * as React from 'react';
import MemberListItem from './MemberListItem';

export interface IMemberListProps {
    members: any[];
    loading?: boolean;
    error?: boolean;
}

export default class MemberList extends React.Component<IMemberListProps> {
    public render() {
        return (
            <div className="member-list">
                {
                    this.props.members.map(
                        member => <MemberListItem key={member.id} member={member}/>)
                }
            </div>
        );
    }
}