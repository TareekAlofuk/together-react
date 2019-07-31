import * as React from "react";

export default function Detail(props: any) {
    if (props.value === null || props.value === undefined) {
        return null;
    }

    return <div className={'detail-item'}>
        <span>{props.label}</span>
        <span>{props.value}</span>
    </div>;
}
