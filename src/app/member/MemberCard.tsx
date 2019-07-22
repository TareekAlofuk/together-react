import * as React from "react";

interface Props {
    member: any;
}

export default class MemberCard extends React.Component<Props> {
    render() {
        return <div className='member-card-section'>

            <div className='member-card'>
                <p className='member-card-name'>{this.props.member.name}</p>
                <p className='member-card-id'>{this.props.member.id}</p>
            </div>

            <div style={{textAlign: 'center', marginTop: 16}}>
                <a className={'ui button'}
                   target={'_blank'}
                   href={`/print-card.html?id=` + encodeURI(this.props.member.id)
                   + '&name=' + encodeURI(this.props.member.name)}>
                    PRINT
                </a>
            </div>

        </div>;
    }
}