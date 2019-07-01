import * as React from "react";
import AutoField from "../AutoField/AutoField";
import AutoFieldProps from "../AutoField/AutoFieldProps";
import {Row} from "react-grid-system";
import AutoForm from './AutoForm';
import AutoFormItem from "../AutoFormItem/AutoFormItem";
import AutoFormItemProps from "../AutoFormItem/AutoFormItemProps";


export default class FieldsRenderer {

    private fields: any[];
    private readonly form: AutoForm;


    constructor(form: AutoForm) {
        this.form = form;
        this.fields = form.props.fields;
    }

    public renderFields = (): any[] => {
        return this.fields.map((item: any, index: number) => {
            if (Array.isArray(item)) {
                return this.renderManyFields(item, index);
            }

            const type = item["type"]["name"];
            switch (type) {
                case 'AutoField':
                    return this.renderField(item, index, true);
                case 'AutoFileField':
                    return this.renderField(item, index, true);
                case 'AutoFormItem':
                    return this.renderFormItem(item, index);
                default :
                    throw Error('only AutoField or AutoFileField or AutoFormItem allowed');
            }
        });
    };

    private renderManyFields(items: AutoField<AutoFieldProps>[], index: number) {
        return <Row style={{marginLeft: 0, marginRight: 0}} key={index}>
            {
                items.map((item: AutoField<AutoFieldProps>, index) => {
                    return this.renderField(item, index, false);
                })
            }
        </Row>;
    }

    private renderField(item: AutoField<AutoFieldProps>, index: number, renderAsBlock: boolean): any {
        const {component: ComponentField, ...props} = item.props;

        return <ComponentField ref={(ref: any) => this.form.registerField(ref)} key={index}
                               formRef={this.form}
                               {...props}
                               renderAsBlock={renderAsBlock}/>;
    }

    private renderFormItem(item: AutoFormItem<AutoFormItemProps>, index: number): any {

        const {component: ComponentField, ...props} = item.props;
        return <ComponentField key={index}
                               formRef={this.form}
                               {...props}/>;
    }
}