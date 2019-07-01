import * as React from "react";
import ISelectOption from "./ISelectOption";
import AutoFieldBase from "../Common/AutoFieldBase";
import AutoFieldBaseProps, {AUTO_FIELD_BASE_DEFAULT_PROPS} from "../Common/AutoFieldBaseProps";
import "../../../styles/select_style.css";
import "../../../styles/common-style.css"
import Select from "react-select";

interface Props extends AutoFieldBaseProps {
    options: ISelectOption[];
}

export default class AutoFieldSelect extends AutoFieldBase<Props> {

    static defaultProps = {...AUTO_FIELD_BASE_DEFAULT_PROPS};

    renderField(): any {
        return <div className={`auto-field-select-container ${this.getClassName()}`}>
            <Select name={this.props.name}
                    className={'auto-field-select ' + this.props.className}
                    onChange={this.onValueChange}
                    options={this.props.options}
                    styles={this.getStyle()}/>
        </div>
    }

    getClassName(): any {
        const className = super.getClassName();
        if (className) {
            return className.replace("auto-field ", " ");
        }
    }

    public extractValueFormInputEvent(e: any): any {
        return e.value;
    }

    private getStyle(): any {
        const bgColors = {"default": "#EFEFEF", "light": "#FFFFFF", "dark": "#2B2B2B"};
        return {
            control: (styles: any) => ({...styles, backgroundColor: bgColors[this.props.theme!], border: 'none'}),
        }
    }


}