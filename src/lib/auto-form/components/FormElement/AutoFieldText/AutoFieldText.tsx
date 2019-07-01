import * as React from "react";
import AutoTextFieldProps, {AUTO_TEXT_FIELD_DEFAULT_PROPS} from "./AutoTextFieldProps";
import "../../../styles/common-style.css"
import "../../../styles/text_field_style.css";
import AutoFieldBase from "../Common/AutoFieldBase";

export default class AutoFieldText extends AutoFieldBase<AutoTextFieldProps> {

    static defaultProps = {...AUTO_TEXT_FIELD_DEFAULT_PROPS};

    renderField(): any {
        return <input
            onChange={this.onValueChange}
            value={this.state.value}
            className={this.getClassName()}
            type={this.props.type}
            placeholder={this.props.placeholder}
        />
    }

    protected getClassName = (): any => {
        const className = super.getClassName();
        return className + " auto-text-field";
    }

}
