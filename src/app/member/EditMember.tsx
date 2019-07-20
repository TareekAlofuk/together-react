import * as React from 'react'
import AutoForm from '../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import Config from '../../bootstrap/Config';
import {RouteComponentProps} from "react-router";

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

    componentDidMount() {
        console.log(this.props.route);
    }

    render() {
        const member = this.props.route ? this.props.route.location.state : this.props.member;
        const url = Config.SERVER_URL + "api/members/" + this.props.member.id;
        return (
            <div>
                <AutoForm
                    ref={ref => this.form = ref}
                    initialValues={member}
                    onComplete={this.props.onComplete}
                    onError={this.props.onError}
                    onSuccess={this.props.onSuccess}
                    onSubmit={form => {
                        console.log(form.getValues());
                        return false;
                    }}
                    fields={[
                        <AutoField name='name' placeholder='Name...' component={AutoFieldText}/>,
                        <AutoField name='phone' placeholder='Phone...' component={AutoFieldText}/>,
                        <AutoField name='phone2' placeholder='Secondary Phone...' component={AutoFieldText}/>,
                        <AutoField name='email' placeholder='Email...' component={AutoFieldText}/>,
                        <AutoField name='address' placeholder='Address...' component={AutoFieldText}/>,
                        <AutoField name='birthDate' type='date' placeholder='Birth Date...' component={AutoFieldText}/>,
                        <AutoField name='jobTitle' placeholder='Job Title...' component={AutoFieldText}/>,
                    ]}
                    renderButton={() => this.props.editButton === false ? null :
                        <button onClick={this.save}>EDIT</button>}
                    requestConfiguration={{method: 'put', url: url, type: 'http'}}
                />
            </div>
        )
    }

    public save(): void {
        if (this.form) {
            this.form.submit();
        }
    }
}
