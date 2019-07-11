import * as React from 'react';
import { Button } from "semantic-ui-react";

export interface IMemberListProps {
}

export default class MemberList extends React.Component<IMemberListProps> {
    public render() {

        // Id Name ProfileImage Phone/Phone2 Email
        return (
            <div className="member-list">
                <div className="member-list-item">
                    <div className="member-id">
                        <span>1</span>
                    </div>
                    <div className="member-avatar">
                        <img className="member-avatar" src="https://ya-webdesign.com/images/avatar-png-1.png" />
                        <div className="member-info">
                            <div className="member-name">ALI FARIS</div>
                        </div>
                    </div>
                    <div className="member-phone">
                        <span>
                            07801234567 / 07801234567
                        </span>
                    </div>
                    <div className="member-email">
                        <span>
                            alihcompiler@gmail.com
                        </span>
                    </div>
                    <div className="member-actions">
                        <Button color='yellow' icon="edit" />
                        <Button color='blue' icon="file" />
                    </div>
                </div>
                <div className="member-list-item">
                    <div className="member-id">
                        <span>1</span>
                    </div>
                    <div className="member-avatar">
                        <img className="member-avatar" src="https://ya-webdesign.com/images/avatar-png-1.png" />
                        <div className="member-info">
                            <div className="member-name">ALI FARIS</div>
                        </div>
                    </div>
                    <div className="member-phone">
                        <span>
                            07801234567 / 07801234567
                        </span>
                    </div>
                    <div className="member-email">
                        <span>
                            alihcompiler@gmail.com
                        </span>
                    </div>
                    <div className="member-actions">
                        <Button color='yellow' icon="edit" />
                        <Button color='blue' icon="file" />
                    </div>
                </div>
            </div>
        );
    }
}
