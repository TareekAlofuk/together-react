import AutoForm from "./AutoForm";

export default class ValidationUtils {
    private form: AutoForm;

    constructor(form: AutoForm) {
        this.form = form;
    }

    public validate(): boolean {
        let valid: boolean = true;
        const fields = this.form.getAllFields();
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].validate()) {
                valid = false;
            }
        }
        return valid;
    }

    public hasErrors(): boolean {
        const fields = this.form.getAllFields();
        for (let i = 0; i < fields.length; i++)
            if (!fields[i].isValid()) return true;
        return false;
    };
}