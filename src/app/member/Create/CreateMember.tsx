import * as React from 'react'
import AutoForm from '../../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import { Redirect } from "react-router";
import Config from '../../../bootstrap/Config';

interface Props {

}

export default class CreateMember extends React.Component<Props> {


    constructor(props: any) {
        super(props);
    }

    render() {
        const url = Config.SERVER_URL + "api/members";
        return (
            <div>
                <AutoForm
                    fields={[
                        <AutoField name='name' label='Name' placeholder='Name' component={AutoFieldText} />,
                    ]}
                    onSubmit={form => {
                        console.log(form.getValues());
                        return false;
                    }}
                    onSuccess={response => console.log(response)}
                    requestConfiguration={{ type: "http", url: url, method: "post" }}
                    renderButton={form => <button onClick={form.submit}>SEND</button>}
                />
            </div>
        )
    }
}
