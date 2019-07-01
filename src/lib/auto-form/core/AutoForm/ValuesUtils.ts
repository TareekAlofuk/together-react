import AutoForm from "./AutoForm";

export default class ValuesUtils {
    private form: AutoForm;

    constructor(form: AutoForm) {
        this.form = form;
    }

    public clear(): void {
        const fields = this.form.getAllFields();
        for (let i = 0; i < fields.length; i++) {
            fields[i].clear();
        }
        this.form.attachedFiles = [];
        this.form.attachedValues = [];
    }

    public getTags(): object {
        let tags: any = {};
        const fields = this.form.getAllFields();
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            tags[field.props.name] = field.getTag();
        }
        return tags;
    };

    public setValues(values: any) {
        const keys = Object.keys(values);
        const fields = this.form.getAllFields();
        keys.forEach(key => {
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                if (field.getName() == key) {
                    const value = values[key];
                    if (value != null || value != undefined) field.setValue(value);
                    break;
                }
            }
        });
    }

    public getValues() {
        if (this.form.hasErrors()) return {};
        let values: any = {};
        const fields = this.form.getAllFields();
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            values[field.props.name] = field.getValue();
        }
        return values;
    }

}