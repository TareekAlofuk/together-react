import IAutoForm from "../AutoForm/IAutoForm";
import AutoForm from "../AutoForm/AutoForm";

export default interface AutoFormItemProps {
    formRef?: IAutoForm;
    onFormSubmit?: (form: IAutoForm) => void;
    component?: any;
    onOtherChange?: (key: any, value: any, form: AutoForm) => void;

    [propName: string]: any;
}