import {Loader} from "semantic-ui-react";
import * as React from "react";

interface Props {
    loading: boolean;
    wrapperStyle?: any;
}

export default function Loading(props: Props) {
    if (!props.loading) return null;
    return <div style={props.wrapperStyle} className={'centered-box'}>
        <Loader inline active/>
    </div>
}