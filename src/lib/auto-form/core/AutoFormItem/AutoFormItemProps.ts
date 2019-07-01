import IAutoForm from "../AutoForm/IAutoForm";

export default interface AutoFormItemProps {
    formRef?: IAutoForm;
    onFormSubmit?: (form: IAutoForm) => void;
    component?: any;
    onOtherChange?: (key: any, value: any, form: IAutoForm) => void;

    [propName: string]: any;
}