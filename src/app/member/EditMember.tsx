import * as React from 'react'
import AutoForm from '../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import Config from '../../bootstrap/Config';
import {RouteComponentProps} from "react-router";
import AutoFieldSelect from "../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldSelect";
import MembershipType from "./MembershipType";
import DateUtils from "../../shared/utils/DateUtils";
import AutoFormItem from "../../lib/auto-form/core/AutoFormItem/AutoFormItem";
import AutoFormDivider from "../../lib/auto-form/components/Utils/AutoFormDivider";
import {JOB_TITLE_SELECT_OPTIONS} from "./JobTitleOptions";
import {Button} from "semantic-ui-react";
import AutoFieldCreatableSelect
    from "../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldCreatableSelect";
import {memberTitleOption} from "./Form/MemberTitleOptions";

interface Props {
    editButton?: boolean;
    member: any;
    onComplete?: () => void;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    route?: RouteComponentProps;
}

export default class EditMember extends React.Component<Props> {

    private form: AutoForm = null;

    render() {
        const member = this.props.route ? this.props.route.location.state.member : this.props.member;
        const url = Config.SERVER_URL + "api/members/" + this.props.member.id;
        return (
            <div className={'member-form-container'}>
                <AutoForm
                    ref={ref => this.form = ref}
                    initialValues={member}
                    onComplete={this.props.onComplete}
                    onError={this.props.onError}
                    onSuccess={this.props.onSuccess}
                    fields={[
                        <AutoField component={AutoFieldSelect} name={'title'}
                                   inlineLabel label="Title" labelWidth={'140px'}
                                   validationRules={{presence: true, length: {minimum: 2}}}
                                   options={memberTitleOption()}
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

                        <AutoFormItem component={AutoFormDivider}/>,

                        <AutoField name='secondaryPhone'
                                   inlineLabel labelWidth={'140px'} label='Secondary Phone'
                                   placeholder='Secondary Phone...' component={AutoFieldText}/>,

                        <AutoField name='email'
                                   inlineLabel labelWidth={'140px'} label='Email'
                                   validationRules={{optional: {trim: true, email: true}}}
                                   placeholder='Email...' component={AutoFieldText}/>,

                        <AutoField name='address'
                                   inlineLabel labelWidth={'140px'} label='Address'
                                   placeholder='Address...' component={AutoFieldText}/>,

                        <AutoField name='jobTitle'
                                   inlineLabel labelWidth={'140px'} label='Job Title'
                                   options={JOB_TITLE_SELECT_OPTIONS}
                                   placeholder='Job Title...' component={AutoFieldCreatableSelect} clearable/>,
                    ]}
                    renderButton={() => this.props.editButton === false ? null :
                        <div className={'member-form-button-wrapper'}>
                            <Button color={"green"} onClick={this.save}>EDIT</Button>
                        </div>
                    }
                    requestConfiguration={{method: 'put', url: url, type: 'http'}}
                />
            </div>
        )
    }

    public save(): void {
        if (this.form) {
            if (!this.form.validate()) {
                this.props.onComplete && this.props.onComplete();
                return;
            }
            this.form.submit();
        }
    }

    private expirationDateOnOtherChange = (key: string, value: any, form: AutoForm) => {
        if (key === "type") {
            let newExpirationDate = null;
            switch (value) {
                case MembershipType.SILVER:
                    newExpirationDate = DateUtils.getDateFromNowAfterByMonths(24);
                    break;
                case MembershipType.GOLD:
                    newExpirationDate = DateUtils.getDateFromNowAfterByMonths(18);
                    break;
                case MembershipType.BUSINESS:
                    newExpirationDate = DateUtils.getDateFromNowAfterByMonths(12);
                    break;
                default:
                    return;
            }
            form.getField("expirationDate").setValue(DateUtils.toString(newExpirationDate));
        }
    };
}
