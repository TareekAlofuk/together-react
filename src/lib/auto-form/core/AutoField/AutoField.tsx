import * as React from "react";
import AutoFieldProps, {AUTO_FIELD_DEFAULT_PROPS} from "./AutoFieldProps";
import * as validator from "validate.js";
import IAutoField from "./IAutoField";
import OnValueChangeHandler from "./OnValueChangeHandler";
import AutoFormItem from "../AutoFormItem/AutoFormItem";

export interface AutoFieldState {
    value: any;
    error: boolean;
}

export default abstract class AutoField<T extends AutoFieldProps>
    extends AutoFormItem<T, AutoFieldState | any>
    implements IAutoField {

    static defaultProps = {...AUTO_FIELD_DEFAULT_PROPS};
    private handler: OnValueChangeHandler;

    protected constructor(props: T) {
        super(props);
        this.state = {value: this.props.defaultValue ? this.props.defaultValue : '', error: false};
        this.handler = new OnValueChangeHandler(this);
    }

    public onValueChange = (e: any): void => {
        this.handler.handle(e);
    };

    public extractValueFormInputEvent(e: any): any {
        if (e)
            return e.target.value;
        return '';
    }

    public validate(): boolean {
        let error = !this.isValid();
        this.setError(error);
        return !error;
    };

    public isValid(value: any = null): boolean {
        if (value === null || value === undefined)
            value = this.state.value;
        if (!this.props.validationRules) return true;
        let error = validator.single(value, this.props.validationRules);
        return error === undefined;
    };


    setError(error: boolean): void {
        this.setState({error: error})
    }

    public getName(): string {
        return this.props.name;
    };

    public setValue(value: any): any {
        this.setState({value: value}, () => this.validate());
    }

    public getValue() {
        return this.state.value;
    }

    public clear(): void {
        this.setValue('');
    };

    public getTag(): any {
        return this.props.tag;
    }

}