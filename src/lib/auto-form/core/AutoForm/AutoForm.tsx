import * as React from "react";
import AutoFormProps from "./AutoFormProps";
import FieldsRenderer from "./FieldsRenderer";
import AutoField from "../AutoField/AutoField";
import AutoFieldProps from "../AutoField/AutoFieldProps";
import Submitter from "./Submitter";
import ValidationUtils from "./ValidationUtils";
import ValuesUtils from "./ValuesUtils";
import "../../styles/style.css"
import IAutoForm from "./IAutoForm";

export default class AutoForm
    extends React.Component<AutoFormProps, any>
    implements IAutoForm {

    private validationUtils: ValidationUtils;
    private valueUtils: ValuesUtils;
    private renderer: FieldsRenderer;

    public attachedValues: any = {};
    public attachedFiles: any = {};
    public fields: AutoField<AutoFieldProps>[] = [];

    constructor(props: AutoFormProps) {
        super(props);
        this.validationUtils = new ValidationUtils(this);
        this.valueUtils = new ValuesUtils(this);
        this.renderer = new FieldsRenderer(this);
        if (this.props.initialValues) {
            this.setValues(this.props.initialValues);
        }
        this.state = {loading: false};
    }


    render() {
        this.fields = [];
        return (
            <div className={'auto-form'}>
                {this.renderer.renderFields()}
                {this.props.renderButton(this)}
                {
                    (this.props.renderLoadingIndicator && this.state.loading) &&
                    this.props.renderLoadingIndicator(this)
                }
            </div>
        );
    }

    submit = (): void => {
        const submitter = new Submitter(this);
        submitter.submit();
    };

    registerField(ref: AutoField<AutoFieldProps>): void {
        ref && this.fields.push(ref);
    }

    attachValue(key: any, value: any): void {
        this.attachedValues[key] = value;
    }

    deAttachValue(key: any): void {
        delete this.attachedValues[key];
    }

    attachFile(key: any, file: any): void {
        this.attachedFiles[key] = key;
    }

    deAttachFile(key: any): void {
        delete this.attachedFiles[key];
    }

    public getAllFields(): AutoField<AutoFieldProps>[] {
        return this.fields;
    };

    public setLoading(loading: boolean = true): void {
        this.setState({loading: loading});
        (loading && this.props.onLoadingStart) && this.props.onLoadingStart(this);
    };

    public onComplete(): void {
        this.props.onComplete && this.props.onComplete(this);
        this.props.onLoadingEnd && this.props.onLoadingEnd(this);
        this.setLoading(false);
    };

    public onError(reason: any): void {
        this.props.onError && this.props.onError(reason, this);
        this.setLoading(false);
    };

    public clear(): void {
        this.valueUtils.clear()
    };

    public getValues(): any {
        return this.valueUtils.getValues();
    }

    public setValues(values: any): void {
        this.valueUtils.setValues(values);
    }

    public getTags(): any {
        return this.valueUtils.getTags()
    };

    public getField(name: string): AutoField<AutoFieldProps> | null {
        const fields = this.getAllFields();
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field.props.name === name) return field;
        }
        return null;
    }

    public hasErrors(): boolean {
        return this.validationUtils.hasErrors()
    }

    public validate(): boolean {
        return this.validationUtils.validate()
    };

    public onAnyValueChange(key: any, value: any): void {
        this.props.onAnyValueChange && this.props.onAnyValueChange(key, value);
        this.props.fields.map((item: any) => {
            if (Array.isArray(item)) {
                item.map((item: any) => item.props.onOtherChange && item.props.onOtherChange(key, value, this));
                return;
            }
            item.props.onOtherChange && item.props.onOtherChange(key, value, this);
        })
    };

    onLoad(): void {
        this.props.onLoadingStart && this.props.onLoadingStart(this);
    }

    onSuccess(response: any): void {
        this.setLoading(false);
        if (this.props.clearOnSuccess) {
            this.clear();
        }
        this.props.onSuccess && this.props.onSuccess(response, this);
    }

}
