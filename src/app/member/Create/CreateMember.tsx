import * as React from 'react'
import AutoForm from '../../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import {Redirect} from "react-router";

interface Props {

}
type MyState = { redirect: boolean , id:number };

export default class CreateMember extends React.Component<Props , MyState> {


    constructor(props:any){
        super(props);
        this.state = {
            redirect: false,
            id : 0
        };
    }

    render() {


        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/member/infoMember/' + this.state.id ,

            }}
            />;
        }



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
                            this.setState({redirect : true , id : response.member.id});
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
