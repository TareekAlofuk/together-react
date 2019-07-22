import * as React from 'react';
import AutoForm from '../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import Config from '../../bootstrap/Config';

export interface IMemberCredentialsProps {
    saveButton?: boolean;
    onSuccess?: any;
    onError?: any;
    onComplete?: any;
}

export default class MemberCredentials extends React.Component<IMemberCredentialsProps> {
    private form: AutoForm;

    public render() {
        return (
            <div>
                <AutoForm
                    ref={ref => this.form = ref}
                    fields={[
                        <AutoField inlineLabel label="Username"
                                   component={AutoFieldText} name="name" placeholder="Username..."/>,
                        <AutoField inlineLabel label="Password" component={AutoFieldText} name="name"
                                   placeholder="Password..."/>,
                    ]}
                    onSuccess={this.props.onSuccess} onError={this.props.onError} onComplete={this.props.onComplete}
                    renderButton={() => this.props.saveButton === false ? null :
                        <button onClick={this.save}>SAVE</button>}
                    requestConfiguration={{
                        type: "http",
                        method: "post",
                        url: Config.SERVER_URL + "api/members/credentials"
                    }}
                />
            </div>
        );
    }

    public save(): void {
        this.form.submit();
    }
}
