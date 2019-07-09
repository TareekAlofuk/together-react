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

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <button>
                    PRINT
                </button>
            </div>

        </div>;
    }
}