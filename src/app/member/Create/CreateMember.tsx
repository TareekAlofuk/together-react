import * as React from 'react'
import AutoForm from '../../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import {Redirect} from "react-router";
import Config from '../../../bootstrap/Config';
import {Button} from "semantic-ui-react";
import AutoFieldSelect from "../../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldSelect";
import MembershipType from "../MembershipType";

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
                        <AutoField validationRules={{length: {minimum: 2}}}
                                   name='name' label='Name' placeholder='Name'
                                   component={AutoFieldText}/>,
                        <AutoField component={AutoFieldSelect} name={'type'}
                                   validationRules={{greaterThan: 0, lessThan: 3}}
                                   options={[{label: 'SLIVER', value: MembershipType.SILVER},
                                       {label: 'GOLD', value: MembershipType.GOLD},
                                       {label: 'BUSINESS', value: MembershipType.BUSINESS}]}
                        />,
                        <AutoField name={'expireDate'} component={AutoFieldText} type={'date'}
                                   defaultValue={'2019-10-10'}/>
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
    }
}
