import * as React from 'react'
import AutoForm from '../../../lib/auto-form/core/AutoForm/AutoForm';
import AutoField from '../../../lib/auto-form/core/AutoField/AutoField';
import AutoFieldText from '../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText';
import {Redirect, Route, RouteComponentProps} from "react-router";
import Axios from "axios";
import {url} from "inspector";
import {log} from "util";
import AutoFieldCheckBox from "../../../lib/auto-form/components/FormElement/AutoFieldCheckBox/AutoFieldCheckBox";


type MyProps = { id: number, route: any };
type MyState = {
    id: number,
    loading: boolean,
    name: string,
    phone: string,
    phone2: string,
    email: string,
    address: string,
    birthdate: string,
    jobTitle: string,
    disabled: boolean,
    archived: boolean,
    passport: string,
    faceImag: string
};
export default class InfoMember extends React.Component<MyProps, MyState> {

    constructor(props: any) {

        super(props);

        this.state = {
            loading: true,
            id: 0,
            address: "",
            archived: false,
            birthdate: "",
            disabled: false,
            email: "",
            faceImag: "",
            jobTitle: '',
            name: '',
            passport: '',
            phone: '',
            phone2: ''
        };


        Axios.get('http://www.mocky.io/v2/5d2060e73000004f00bb0b06').then(value => {
            this.setState({loading: false});
            this.setState(value.data.member);


            console.log(this.state);

        });

    }

    render() {

        if (this.state.loading == true) {
            return (<h1>Loading</h1>);
        }

        return (
            <>


                <AutoForm

                    fields={[
                        <AutoField name='name' label='Name' defaultValue={this.state.name} component={AutoFieldText}/>,

                        <AutoField name='phone' label='phone' defaultValue={this.state.phone}
                                   component={AutoFieldText}/>,
                        <AutoField name='phone2' label='phone2' defaultValue={this.state.phone2}
                                   component={AutoFieldText}/>,
                        <AutoField name='email' label='email' defaultValue={this.state.email}
                                   component={AutoFieldText}/>,
                        <AutoField name='address' label='address' defaultValue={this.state.address}
                                   component={AutoFieldText}/>,
                        <AutoField name='birthdate' label='birthdate' defaultValue={this.state.birthdate}
                                   component={AutoFieldText}/>,
                        <AutoField name='jobTitle' label='jobTitle' defaultValue={this.state.jobTitle}
                                   component={AutoFieldText}/>,
                        <AutoField name='disabled' label='disabled' defaultValue={this.state.disabled}
                                   component={AutoFieldCheckBox}/>,
                        <AutoField name='archived' label='archived' defaultValue={this.state.archived}
                                   component={AutoFieldCheckBox}/>,
                        <AutoField name='passport' label='passport' defaultValue={this.state.passport}
                                   component={AutoFieldText}/>,

                    ]}


                    renderButton={form => <button onClick={form.submit} type='submit'>Send</button>}

                    onSuccess={response => {
                        this.props.route.history.push('/');
                    }}

                    requestConfiguration={{type: 'http', url: 'http://google.com', method: 'get'}}/>


            </>
        )
    }
}