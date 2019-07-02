import * as React from 'react'
import AutoForm from '../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';

export default class EditMember extends React.Component {
    render() {
        return (
            <div>
                <AutoForm
                    fields={[
                        <AutoField name='name' placeholder='Name...' component={AutoFieldText} />,
                        <AutoField name='phone' placeholder='Name...' component={AutoFieldText} />,
                        <AutoField name='phone2' placeholder='Name...' component={AutoFieldText} />,
                        <AutoField name='email' placeholder='Name...' component={AutoFieldText} />,
                        <AutoField name='address' placeholder='Name...' component={AutoFieldText} />,
                        <AutoField name='birthDate' type='date' placeholder='Name...' component={AutoFieldText} />,
                        <AutoField name='jobTitle' placeholder='Name...' component={AutoFieldText} />,
                    ]}
                    renderButton={() => <button>EDIT</button>}
                    requestConfiguration={{ method: 'post', url: 'http://www.mocky.io/v2/5d19db4e2f0000a148fd7253', type: 'http' }}
                />
            </div>
        )
    }
}
