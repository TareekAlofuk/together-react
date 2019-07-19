import * as React from "react";
import {Header, Icon} from "semantic-ui-react";

export function NotFound(props: any) {
    return <div style={{padding: 24, textAlign: 'center'}}>
        <Icon size={'massive'} name={'window close outline'}/>
        <Header size={'small'}>{props.message}</Header>
    </div>
}