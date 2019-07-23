import AutoField from "./AutoField";
import AutoFieldProps from "./AutoFieldProps";

export default class OnValueChangeHandler {
    private readonly field: AutoField<AutoFieldProps>;

    constructor(field: AutoField<AutoFieldProps>) {
        this.field = field;
    }

    public handle(e: any): void {

        if (this.field.props.readOnly) return;

        if (this.field.props.onValueChange) {
            this.field.props.onValueChange(e, this.field);
            return;
        }

        let value = this.field.extractValueFormInputEvent(e);
        let error = !this.field.isValid(value);
        this.field.setError(error);
        if (this.field.props.afterValueChanged) {
            this.field.setState({value: value}, () => {
                this.field.props.afterValueChanged!(e, value);
            });
        } else {
            this.field.setState({value: value});
        }

        this.notifyParent(value);
    }

    private notifyParent(value: any) {
        if (this.field.props.formRef) {
            this.field.props.formRef!.onAnyValueChange(this.field.getName(), value, this.field.props.formRef);
        }
    }
}