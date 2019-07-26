import * as React from "react";
import ISelectOption from "./ISelectOption";
import AutoFieldBase from "../Common/AutoFieldBase";
import AutoFieldBaseProps, {AUTO_FIELD_BASE_DEFAULT_PROPS} from "../Common/AutoFieldBaseProps";
import "../../../styles/select_style.css";
import "../../../styles/common-style.css"
import Select from "react-select/creatable";

interface Props extends AutoFieldBaseProps {
    options: ISelectOption[];
    clearable?: boolean;
}

export default class AutoFieldCreatableSelect extends AutoFieldBase<Props> {

    static defaultProps = {...AUTO_FIELD_BASE_DEFAULT_PROPS};

    renderField(): any {
        return <div className={`auto-field-select-container ${this.getClassName()}`}>
            <Select name={this.props.name}
                    className={'auto-field-select ' + this.props.className}
                    onChange={this.onValueChange}
                    options={this.props.options}
                    value={this.getSelectValue()}
                    isClearable={this.props.clearable}
                    styles={this.getStyle()}/>
        </div>
    }

    private getSelectValue(): any {
        for (let i = 0; i < this.props.options.length; i++) {
            if (this.props.options[i].value === this.state.value) {
                return {value: this.state.value, label: this.props.options[i].label};
            }
        }
        if (this.state.value.trim()) {
            return {value: this.state.value, label: this.state.value};
        }
        return {value: '', label: ''};
    }

    getClassName(): any {
        const className = super.getClassName();
        if (className) {
            return className.replace("auto-field ", " ");
        }
    }

    public extractValueFormInputEvent(e: any): any {
        if (!e) return;
        return e.value;
    }

    private getStyle(): any {
        const bgColors = {"default": "#EFEFEF", "light": "#FFFFFF", "dark": "#2B2B2B"};
        return {
            control: (styles: any) => ({
                ...styles,
                backgroundColor: this.state.error ? '#F48FB1' : bgColors[this.props.theme!],
                border: 'none'
            }),
        }
    }


}