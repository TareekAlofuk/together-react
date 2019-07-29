import * as React from "react";
import LabelRenderer from "./LabelRenderer";
import AutoFieldBaseProps from "./AutoFieldBaseProps";
import {AUTO_TEXT_FIELD_DEFAULT_PROPS} from "../AutoFieldText/AutoTextFieldProps";
import AutoField from "../../../core/AutoField/AutoField";
import AutoFieldRenderer from "./AutoFieldRenderer";


interface Props extends AutoFieldBaseProps {
}

export default abstract class AutoFieldBase<T extends Props> extends AutoField<T> {

    static defaultProps = {...AUTO_TEXT_FIELD_DEFAULT_PROPS};

    renderContent() {
        const labelRenderer = new LabelRenderer(this);
        const fieldRenderer: AutoFieldRenderer = new AutoFieldRenderer(this);
        const field = (
            <div className={"auto-field-container"} style={{
                flexDirection: this.props.inlineLabel ? 'column' : 'row',
                alignItems: 'flex-start'
            }}>
                {
                    labelRenderer.render(this.props.size!)
                }
                {
                    this.renderField()
                }
            </div>
        );
        return fieldRenderer.renderContent(field);
    }

    protected getClassName() {
        if (this.props.className)
            return this.props.className;

        return "auto-field "
            + this.props.size
            + ` theme-${this.props.theme}`
            + ` ${this.state.error ? "error" : ""}`
    };

    public abstract renderField(): any;

}