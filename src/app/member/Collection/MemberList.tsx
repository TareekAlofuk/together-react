import * as React from 'react';
import MemberListItem from './MemberListItem';
import {Button} from "semantic-ui-react";
import SendSmsModel from "../EngagingAction/SendSmsModel";
import SendEmailModel from "../EngagingAction/SendEmailModel";

export interface IMemberListProps {
    members: any[];
    loading?: boolean;
    error?: boolean;
}

interface State {
    smsModel: boolean;
    emailModel: boolean;
    selectedMembers: any[];
}

export default class MemberList extends React.Component<IMemberListProps, State> {

    constructor(props: IMemberListProps) {
        super(props);
        this.state = {selectedMembers: [], smsModel: false, emailModel: false};
    }

    public render() {
        return (
            <div className={'member-list-container'}>
                {
                    (this.state.selectedMembers && this.state.selectedMembers.length > 0) &&
                    <div style={{paddingBottom: 16, textAlign: 'right'}}>
                        <Button onClick={() => this.setState({smsModel: true})} className={'ui icon button'}>
                            <i className={'icon mobile alternate'}/>
                        </Button>
                        <Button onClick={() => this.setState({emailModel: true})} className={'ui icon button'}>
                            <i className={'icon envelope'}/>
                        </Button>
                    </div>
                }
                <div className="member-list">
                    {
                        this.props.members.map(
                            member => <MemberListItem
                                onSelect={(member: any, selected: boolean) => {
                                    if (!selected) {
                                        const selectedMembers = this.state.selectedMembers
                                            .filter(item => item.id !== member.id);
                                        this.setState({selectedMembers: selectedMembers});
                                    } else {
                                        const selectedMembers = [...this.state.selectedMembers];
                                        selectedMembers.push(member);
                                        this.setState({selectedMembers: selectedMembers});
                                    }
                                }}
                                key={member.id} member={member}/>)
                    }
                </div>
                <SendSmsModel open={this.state.smsModel}
                              defaultMessage={'default message'}
                              handleClose={() => this.setState({smsModel: false})}
                              members={this.state.selectedMembers}/>
                <SendEmailModel open={this.state.emailModel}
                                defaultSubject={'default subject'}
                                defaultMessage={'default message'}
                                handleClose={() => this.setState({emailModel: false})}
                                members={this.state.selectedMembers}/>
            </div>
        );
    }
}