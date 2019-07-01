import * as React from "react";
import AutoFormItemProps from "./AutoFormItemProps";


export default abstract class AutoFormItem<T extends AutoFormItemProps, S = any>
    extends React.Component<T, S> {

    render() {
        return this.renderContent();
    }

    public abstract renderContent(): any

}