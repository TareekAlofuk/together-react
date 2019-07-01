import * as React from "react";
import "../../../styles/file_input_style.css"
import AutoFieldBaseProps, {AUTO_FIELD_BASE_DEFAULT_PROPS} from "../Common/AutoFieldBaseProps";
import AutoFileField, {AutoFileFieldProps} from "../../../core/AutoField/AutoFileField";

interface Props extends AutoFileFieldProps, AutoFieldBaseProps {
}

export default class AutoFieldInputFile extends AutoFileField<Props> {

    static defaultProps = {...AUTO_FIELD_BASE_DEFAULT_PROPS};

    renderContent() {
        return (
            <div className={'auto-field-file-container ' + this.getClassName()}>
                <input multiple={this.props.multiple} onChange={this.onFilesSelected} type="file" id="file"/>
                <label htmlFor="file" className="btn-2">{this.props.label}</label>
                <span style={{padding: 8}}/>
                <span>{this.getFileName()}</span>
            </div>
        )
    }

    protected getClassName() {
        if (this.props.className)
            return this.props.className;

        return ""
            + this.props.size
            + ` theme-${this.props.theme}`
            + ` ${this.state.error ? "error" : ""}`
    };

}