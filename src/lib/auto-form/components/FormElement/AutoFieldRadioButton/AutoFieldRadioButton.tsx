import * as React from "react";
import "../../../styles/radio_style.css"
import ISelectOption from "../AutoFieldSelect/ISelectOption";
import AutoFieldBaseProps, {AUTO_FIELD_BASE_DEFAULT_PROPS} from "../Common/AutoFieldBaseProps";
import AutoField from "../../../core/AutoField/AutoField";
import AutoFieldProps from "../../../core/AutoField/AutoFieldProps";

interface Props extends AutoFieldProps, AutoFieldBaseProps {
    options: ISelectOption[];
    optionClassName?: string;
    title?: string;
}

export default class AutoFieldRadioButton extends AutoField<Props> {

    static defaultProps = {...AUTO_FIELD_BASE_DEFAULT_PROPS, classNamePrefix: '', title: ''};

    renderContent(): any {
        return (
            <div className={this.getClassName()}>
                <span className={"auto-field-title"}>{this.props.title}</span>
                {
                    this.props.options.map((option: ISelectOption, index: number) =>
                        <label key={index} className={`auto-field-radio-container ${this.props.optionClassName ? this.props.optionClassName : ''}`}>
                            {option.label}
                            <input type="radio" data-value={option.value} checked={this.state.value == option.value}
                                   onChange={this.onValueChange}/>
                            <span className="auto-field-radio-checkmark"/>
                        </label>)
                }
            </div>
        )
    }

    extractValueFormInputEvent(e: any) {
        return e.target.getAttribute("data-value");
    }

    protected getClassName() {
        if (this.props.className)
            return this.props.className;

        return "auto-field-radio "
            + this.props.size
            + ` theme-${this.props.theme}`
            + ` ${this.state.error ? "error" : ""}`
    };

}