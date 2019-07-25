import * as React from "react";
import {Header} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface Props {
    memberId: any;
}

export default class WizardCompletedStep extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div style={{
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img style={{width: 256, height: 256}} src={'/images/icons/checked.png'}/>
                <Header size={'medium'}>Process Completed</Header>
                <Link className={'ui large blue button'} to={`/members/${this.props.memberId}`}>
                    GOTO MEMBER DETAILS
                </Link>
            </div>
        )
    }

}