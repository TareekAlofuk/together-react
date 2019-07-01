import AutoFormItemProps from "../AutoFormItem/AutoFormItemProps";
import AutoField from "./AutoField";

export default interface AutoFieldProps extends AutoFormItemProps {
    label?: string;
    labelWidth?: string;
    inlineLabel?: boolean;
    name: string;
    placeholder?: string;
    type?: string;
    defaultValue?: any;
    readOnly?: boolean;
    isFile?: boolean;

    validationRules?: object;
    tag?: any;

    xs?: number,
    sm?: number;
    md?: number;
    lg?: number;

    renderAsBlock?: boolean;

    onValueChange?: (e: any, field: AutoField<AutoFieldProps>) => void;
    afterValueChanged?: (e: any, value: any) => void;
}


export const AUTO_FIELD_DEFAULT_PROPS = {
    defaultValue: '',
    readOnly: false,
    validationRules: {},
    renderAsBlock: true,
    direction: 'ltr',
    inlineLabel: false,
    type: "text",
    placeholder: ''
};