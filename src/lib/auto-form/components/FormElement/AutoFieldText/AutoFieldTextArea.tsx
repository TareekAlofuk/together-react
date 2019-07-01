import * as React from "react";
import "../../../styles/common-style.css"
import "../../../styles/text_field_style.css";
import AutoFieldBase from "../Common/AutoFieldBase";
import AutoTextAreaFieldProps, {AUTO_TEXT_AREA_FIELD_DEFAULT_PROPS} from "./AutoTextAreaFieldProps";

export default class AutoFieldTextArea extends AutoFieldBase<AutoTextAreaFieldProps> {

    static defaultProps = {...AUTO_TEXT_AREA_FIELD_DEFAULT_PROPS};

    renderField(): any {
        return <textarea
            onChange={this.onValueChange}
            value={this.state.value}
            className={this.getClassName()}
            placeholder={this.props.placeholder}
            rows={this.props.rows}
        />
    }

    protected getClassName = (): any => {
        const className = super.getClassName();
        return className + " auto-text-field";
    }

}
