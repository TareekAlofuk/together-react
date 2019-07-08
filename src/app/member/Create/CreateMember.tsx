import * as React from 'react'
import AutoForm from '../../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import { Redirect } from "react-router";
import Config from '../../../bootstrap/Config';

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
                        <AutoField name='name' label='Name' placeholder='Name' component={AutoFieldText} />,
                    ]}
                    onSuccess={this.props.onSuccess}
                    onError={this.props.onError}
                    onComplete={this.props.onComplete}
                    requestConfiguration={{ type: "http", url: url, method: "post" }}
                    renderButton={() => {
                        if (this.props.renderButton === false)
                            return null;
                        return <button onClick={this.save}>SEND</button>;
                    }}
                />
            </div>
        )
    }

    public save = () => {
        this.form.submit();
    }
}
