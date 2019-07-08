import AutoForm from "./AutoForm";
import AutoFileField, {AutoFileFieldProps} from "../AutoField/AutoFileField";
import RequestSender from "./RequestSender";
import AutoField from "../AutoField/AutoField";
import AutoFieldProps from "../AutoField/AutoFieldProps";
import AutoFormItem from "../AutoFormItem/AutoFormItem";
import AutoFormItemProps from "../AutoFormItem/AutoFormItemProps";
import RequestSenderFactory from "./request/RequestSenderFactory";

export default class Submitter {
    private readonly form: AutoForm;
    private data: FormData;

    constructor(form: AutoForm) {
        this.form = form;
        this.data = new FormData();
    }

    public submit = (): void => {

        this.form.props.fields.map((field: AutoFormItem<AutoFormItemProps> | AutoFormItem<AutoFormItemProps>[]) => {
            if (Array.isArray(field)) {
                field.map((field: AutoFormItem<AutoFormItemProps>) => field.props.onFormSubmit && field.props.onFormSubmit(this.form));
                return;
            }
            field.props.onFormSubmit && field.props.onFormSubmit(this.form);
        });

        if (this.form.props.onSubmit && this.form.props.onSubmit(this.form)) {
            return;
        }

        if (!this.form.validate()) {
            return;
        }
        let data = this.getData();

        // const requestSender = new RequestSender(this.form.props.url, data, this.form.props.method,
        //     () => this.form.onComplete(),
        //     (reason) => this.form.onError(reason),
        //     (response) => this.form.onSuccess(response),
        //     this.form.props.withUpload, this.form.props.requestConfig
        // );
        const requestSenderFactory = new RequestSenderFactory(this.form.props.requestConfiguration, data, this.form.fields,
            () => this.form.onComplete(),
            (error: any) => this.form.onError(error),
            (response: any) => this.form.onSuccess(response)
        );
        const requestSender = requestSenderFactory.getRequestSender();
        requestSender.send();
        this.form.setLoading(true);
    };

    private getData(): FormData {
        this.data = this.valuesAsFormData();
        this.appendFilesToData();
        return this.data;
    }

    private valuesAsFormData(): FormData {
        const values: any = this.form.getValues();
        const keys = Object.keys(values);
        let formData = new FormData();
        for (let i = 0; i < keys.length; i++) {
            formData.append(keys[i], values[keys[i]]);
        }
        return formData;
    };

    private appendFilesToData() {
        const fileFields = this.getFilesFields();
        fileFields.map(fileField => {
            const file = (fileField as AutoFileField<AutoFileFieldProps>).getFile();
            if (!file) {
                return;
            }
            const name = fileField.getName();
            if (Array.isArray(file)) {
                file.map(item => this.data.append(`${name}[]`, item));
            } else {
                this.data.append(name, file);
            }
        });

        const keys = Object.keys(this.form.attachedFiles);
        keys.map((key: any) => {
            (this.data as FormData).append(key, this.form.attachedFiles[key]);
        });
    }

    private getFilesFields = (): AutoField<AutoFieldProps>[] => {
        const fields = this.form.getAllFields();
        return fields.filter(
            (field: AutoField<AutoFieldProps>) => field.props.isFile
        );
    };
}