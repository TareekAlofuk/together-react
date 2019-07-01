import * as React from "react";
import AutoFormItem from "../../core/AutoFormItem/AutoFormItem";
import AutoFormItemProps from "../../core/AutoFormItem/AutoFormItemProps";

interface Props extends AutoFormItemProps {
    hidden?: boolean;
    size?: "small" | "medium" | "large";
    color?: string
}

export default class AutoFormDivider extends AutoFormItem<Props> {

    static defaultProps = {hidden: false, size: "medium", color: "#EFEFEF"};

    renderContent() {
        return <div style={this.getStyle()}/>
    }

    getStyle() {
        const margin = {"small": 16, "medium": 24, "large": 36};
        return {
            marginTop: margin[this.props.size!],
            marginBottom: margin[this.props.size!],
            marginLeft: 0, marginRight: 0,
            backgroundColor: this.props.hidden ? '#00000000' : this.props.color!,
            height: 1,
        };
    }

}