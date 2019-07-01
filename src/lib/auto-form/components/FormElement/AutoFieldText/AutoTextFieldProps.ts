import AutoFieldBaseProps, {AUTO_FIELD_BASE_DEFAULT_PROPS} from "../Common/AutoFieldBaseProps";

export default interface AutoTextFieldProps extends AutoFieldBaseProps {
    placeholder?: string;
}


export const AUTO_TEXT_FIELD_DEFAULT_PROPS = {
    ...AUTO_FIELD_BASE_DEFAULT_PROPS,
    placeholder: ""
};