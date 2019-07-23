import * as React from 'react'
import AutoForm from '../../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import Config from '../../../bootstrap/Config';
import {Button} from "semantic-ui-react";
import AutoFieldSelect from "../../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldSelect";
import MembershipType from "../MembershipType";
import DateUtils from "../../../shared/utils/DateUtils";

interface Props {
    renderButton?: boolean;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    onComplete?: () => void;
}

export default class CreateMember extends React.Component<Props> {

    constructor(props: any) {
        super(props);
    }

    private form: AutoForm;

    render() {
        const url = Config.SERVER_URL + "api/members";
        return (
            <div>
                <AutoForm
                    ref={ref => this.form = ref}
                    fields={[
                        <AutoField component={AutoFieldSelect} name={'title'}
                                   inlineLabel label="Title" labelWidth={'140px'}
                                   validationRules={{presence: true, length: {minimum: 2}}}
                                   options={this.titleOption()}
                        />,

                        <AutoField validationRules={{length: {minimum: 2}}}
                                   name='name' label='Name' placeholder='Name ...'
                                   inlineLabel labelWidth={'140px'}
                                   component={AutoFieldText}/>,

                        <AutoField validationRules={{length: {minimum: 2}}}
                                   name='phone' label='Phone' placeholder='Phone ...'
                                   inlineLabel labelWidth={'140px'}
                                   component={AutoFieldText}/>,

                        <AutoField component={AutoFieldSelect} name={'type'}
                                   inlineLabel label="Membership Type" labelWidth={'140px'}
                                   validationRules={{numericality: {greaterThan: 0, lessThan: 4}}}
                                   options={[{label: 'SLIVER', value: MembershipType.SILVER},
                                       {label: 'GOLD', value: MembershipType.GOLD},
                                       {label: 'BUSINESS', value: MembershipType.BUSINESS}]}
                        />,
                        <AutoField name={'expirationDate'} component={AutoFieldText} type={'date'}
                                   inlineLabel label={'Expiration Date'} labelWidth={'140px'}
                                   onOtherChange={this.expirationDateOnOtherChange}
                                   validationRules={{datetime: {dateOnly: true}}}/>,

                        <AutoField validationRules={{length: {minimum: 2}}}
                                   name='passportNo' label='Passport No' placeholder='Passport No ...'
                                   inlineLabel labelWidth={'140px'}
                                   component={AutoFieldText}/>,

                        <AutoField validationRules={{datetime: {dateOnly: true}}}
                                   name='passportExpirationDate' label='Passport Expiration Date'
                                   placeholder='Passport Expiration Date'
                                   inlineLabel labelWidth={'140px'}
                                   type={'date'}
                                   component={AutoFieldText}/>,

                        <AutoField validationRules={{datetime: {dateOnly: true}}}
                                   name='birthDate' label='BirthDate'
                                   placeholder='BirthDate'
                                   inlineLabel labelWidth={'140px'}
                                   type={'date'}
                                   component={AutoFieldText}/>,
                    ]}
                    onSuccess={this.props.onSuccess}
                    onError={this.props.onError}
                    onComplete={this.props.onComplete}
                    requestConfiguration={{type: "http", url: url, method: "post"}}
                    renderButton={() => {
                        if (this.props.renderButton === false)
                            return null;
                        return <Button onClick={this.save}>SEND</Button>;
                    }}
                />
            </div>
        )
    }

    public save = () => {
        if (!this.form.validate()) {
            this.props.onComplete && this.props.onComplete();
            return;
        }
        this.form.submit();
    };

    public titleOption = () => {
        return [
            {label: "MR", value: "MR"},
            {label: "MS", value: "MS"},
            {label: "MRS", value: "MRS"},
            {label: "MISS", value: "MISS"},
            {label: "DR", value: "DR"},
            {label: "PROF", value: "PROF"},
        ];
    };

    private expirationDateOnOtherChange = (key: string, value: any, form: AutoForm) => {
        if (key === "type") {
            let newExpirationDate = null;
            switch (value) {
                case MembershipType.SILVER:
                    newExpirationDate = this.getDateFromNowAfter(24);
                    break;
                case MembershipType.GOLD:
                    newExpirationDate = this.getDateFromNowAfter(18);
                    break;
                case MembershipType.BUSINESS:
                    newExpirationDate = this.getDateFromNowAfter(12);
                    break;
                default:
                    return;
            }
            form.getField("expirationDate").setValue(DateUtils.toString(newExpirationDate));
        }
    };

    private getDateFromNowAfter(months: number) {
        const date = new Date();
        date.setMonth(date.getMonth() + months);
        return date;
    }
}
