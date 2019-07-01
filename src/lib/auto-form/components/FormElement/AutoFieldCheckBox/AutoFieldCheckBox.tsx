import * as React from "react";
import "../../../styles/checkbox_style.css"
import AutoField from "../../../core/AutoField/AutoField";
import AutoFieldProps from "../../../core/AutoField/AutoFieldProps";

interface Props extends AutoFieldProps {
}

export default class AutoFieldCheckBox extends AutoField<Props> {

    renderContent(): any {
        return (
            <div className={"auto-field"}>
                <label className="auto-field-checkbox-container">
                    {this.props.label}
                    <input type="checkbox" checked={this.state.value} onChange={this.onValueChange}/>
                    <span className="auto-field-checkmark"/>
                </label>
            </div>
        )
    }

    extractValueFormInputEvent(e: any) {
        if (this.state.value === '') {
            return true;
        }
        return !this.state.value;
    }

}