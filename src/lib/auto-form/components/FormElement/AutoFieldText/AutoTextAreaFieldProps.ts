import AutoFieldBaseProps, {AUTO_FIELD_BASE_DEFAULT_PROPS} from "../Common/AutoFieldBaseProps";

export default interface AutoTextAreaFieldProps extends AutoFieldBaseProps {
    placeholder?: string;
    rows?: number;
}


export const AUTO_TEXT_AREA_FIELD_DEFAULT_PROPS = {
    ...AUTO_FIELD_BASE_DEFAULT_PROPS,
    placeholder: "",
    rows: 5
};