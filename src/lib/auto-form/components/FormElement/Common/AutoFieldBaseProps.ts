import AutoFieldProps, {AUTO_FIELD_DEFAULT_PROPS} from "../../../core/AutoField/AutoFieldProps";

export default interface AutoFieldBaseProps extends AutoFieldProps {
    size?: "small" | "medium" | "large";
    theme?: "light" | "default" | "dark";
    className?: string;
}


export const AUTO_FIELD_BASE_DEFAULT_PROPS = {
    ...AUTO_FIELD_DEFAULT_PROPS,
    size: "medium",
    theme: "default",
};
