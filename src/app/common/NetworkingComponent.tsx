import * as React from "react";
import {Loader} from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

interface Props {
    loading: boolean;
    error: boolean;
    component: () => JSX.Element;
    ready: boolean;
    notReadyRender?: () => JSX.Element;
    errorMessage?: string;
}

export default function NetworkingComponent(props: Props) {
    if (props.loading)
        return <Loading wrapperStyle={{padding: '100px 0'}} loading={true}/>;
    else if (props.error)
        return <ErrorMessage message={props.errorMessage}/>;

    if (!props.ready) {
        if (props.notReadyRender)
            return props.notReadyRender();
        return null;
    }

    return props.component();
}