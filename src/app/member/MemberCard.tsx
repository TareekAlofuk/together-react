import * as React from "react";
import {getMembershipTypeText} from "./MembershipType";

interface Props {
    member: any;
}

export default class MemberCard extends React.Component<Props> {
    render() {

        const params = "id=" + encodeURI(this.props.member.id) + "&" +
            "name=" + encodeURI(this.props.member.name) + "&" +
            "expirationDate" + encodeURI(this.props.member.expirationDate) + "&" +
            "title" + encodeURI(this.props.member.title);

        return <div className='member-card-section'>

            <div className='member-card'>
                <p className={`card-type card-type-${this.props.member.type}`}>
                    {getMembershipTypeText(this.props.member.type)}
                </p>
                <p className='member-card-name'>
                    {this.props.member.title} {this.props.member.name}
                </p>
                <p className='member-card-id'>Expiration Date : {this.props.member.expirationDate}</p>
            </div>

            <div style={{textAlign: 'center', marginTop: 16}}>
                <a className={'ui button'}
                   target={'_blank'}
                   href={`/print-card.html?${params}`}>
                    PRINT
                </a>
            </div>

        </div>;
    }
}