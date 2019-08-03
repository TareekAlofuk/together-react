import {Header, Icon} from "semantic-ui-react";
import * as React from "react";

interface Props {
    message?: string;
}

export default function (props: Props) {
    return <div className={'centered-box'}>
        <Icon name={'exclamation triangle'} size={'huge'} color={'red'}/>
        {
            props.message && <Header size={'small'}>{props.message}</Header>
        }
    </div>
}