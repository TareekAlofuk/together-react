import * as React from "react";
import AutoField from "../../../core/AutoField/AutoField";
import AutoFieldProps from "../../../core/AutoField/AutoFieldProps";


export default class LabelRenderer {
    private field: AutoField<AutoFieldProps>;

    constructor(field: AutoField<AutoFieldProps>) {
        this.field = field;
    }

    public render(size: "small" | "medium" | "large") {
        if (!this.field.props.label) return null;
        const style: any = {};
        if (!this.field.props.inlineLabel) {
            style.marginBottom = 8;
        }
        if (this.field.props.labelWidth) {
            style.width = this.field.props.labelWidth;
            style.minWidth = this.field.props.labelWidth;
        }

        const fontSizes: any = {"small": 12, "medium": 14, "large": 18};
        style.fontSize = fontSizes[size];

        return <>
            <label style={style}>
                {this.field.props.label}
            </label>
            <span style={{padding: 8}}/>
        </>
    };
}