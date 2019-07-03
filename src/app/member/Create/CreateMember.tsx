import * as React from 'react'
import AutoForm from '../../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import AutoFieldBase from "../../../lib/auto-form/components/FormElement/Common/AutoFieldBase";
import AutoFieldCheckBox from "../../../lib/auto-form/components/FormElement/AutoFieldCheckBox/AutoFieldCheckBox";
import AutoFieldInputFile from "../../../lib/auto-form/components/FormElement/AutoFieldFileInput/AutoFieldInputFile";

interface Props {

}

export default class CreateMember extends React.Component<Props> {




    render() {
        return (
            <div>

                <AutoForm

                    fields={[
                        <AutoField name='name' label='Name'  placeholder='Name' component={AutoFieldText}/>,

                    ]}

                    onSubmit={form => {
                        console.log(form.getValues());
                        return false;
                    }}



                    onSuccess={
                        response  => {
                            if (response.success == true){
                                console.log(response.member.id)
                               // this.props.navigation.navigate('HomeScreen')
                            }

                        }
                    }
                    onError={e => console.log(e)}
                    onComplete={() => console.log('complete')}

                    requestConfiguration={{ type: "http", url: "http://www.mocky.io/v2/5d19db4e2f0000a148fd7253", method: "post" }}




                    renderButton={form => <button onClick={form.submit}>SEND</button>}
                />
            </div>
        )
    }
}
