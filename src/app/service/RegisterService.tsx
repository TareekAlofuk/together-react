import * as React from "react";
import AutoForm from "../../lib/auto-form/core/AutoForm/AutoForm";
import AutoField from "../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldSelect from "../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldSelect";
import {connect} from "react-redux";
import AutoFieldTextArea from "../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldTextArea";
import AutoFieldText from "../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import Config from "../../bootstrap/Config";
import ReduxActions from "../../bootstrap/ReduxActions";
import {Button, Divider, Header, Loader} from "semantic-ui-react";
import {Redirect, RouteComponentProps} from "react-router";
import RegisterServiceAutoFormPriceCalculator from "./PriceCalculator";

interface Props {
    loading: boolean;
    error: boolean;
    services: any[];
    memberId: number;
    dispatch: (action: any) => void;
    route: RouteComponentProps;
}

class RegisterService extends React.Component<Props> {

    private form: AutoForm;

    componentWillMount() {
        if (!this.props.route.location.state) {
            return
        }
        const url = Config.SERVER_URL + "api/services/all";
        const membershipType = this.props.route.location.state["member"]["type"];
        const action = GETAction(ReduxActions.GET_SERVICES_DETAILS, url, {membershipType: membershipType});
        this.props.dispatch(action);
    }

    render(): JSX.Element {
        if (!this.props.route.location.state) {
            return <Redirect to={'/services/register'}/>
        }


        if (this.props.loading)
            return <Loader inline/>;
        else if (this.props.error || !this.props.services)
            return <h1>Error</h1>;
        else if (this.props.services.length === 0)
            return <h1>NO SERVICES ASSOCIATED WITH THIS MEMBER</h1>;

        return (
            <div id={"register-service-form"}>
                <Header size={"small"}>Register Service</Header>
                <Divider/>

                <AutoForm ref={ref => this.form = ref}
                          fields={[
                              <AutoField component={AutoFieldSelect} name={'serviceId'}
                                         validationRules={{numericality: {greaterThan: 0}}}
                                         afterValueChanged={(e, value) => {
                                             const service = this.getServiceInfo(value);
                                             const discountField = this.form.getField('discount');

                                             if (service.discount) {
                                                 discountField.setValue(service.discount);
                                                 this.calculateNewPrice();
                                             } else {
                                                 discountField.setValue('');
                                                 this.form.getField('price').setValue('');
                                                 this.form.getField('commission').setValue('');
                                                 this.form.getField('finalPrice').setValue('');
                                             }

                                         }}
                                         options={this.getServicesOptions()}/>,
                              <AutoField type={"hidden"} defaultValue={this.props.memberId} component={AutoFieldText}
                                         name={"memberId"}/>,
                              [
                                  <AutoField label="Price" afterValueChanged={() => this.calculateNewPrice()}
                                             inlineLabel placeholder={"Price"} name={'price'}
                                             type={'number'} component={AutoFieldText}/>,
                                  <AutoField label="Commission" afterValueChanged={() => this.calculateNewPrice()}
                                             inlineLabel placeholder={"Commission"}
                                             name={'commission'} type={'number'} component={AutoFieldText}/>,
                                  <AutoField label="Discount"
                                             inlineLabel placeholder={"Discount"} name={'discount'}
                                             type={'number'} readOnly component={AutoFieldText}/>,
                                  <AutoField label="Count" defaultValue={'1'}
                                             afterValueChanged={() => this.calculateNewPrice()}
                                             validationRules={{numericality: {greaterThan: 0}}}
                                             inlineLabel placeholder={"Count"} name={'count'}
                                             type={'number'} component={AutoFieldText}/>,
                                  <AutoField label="New Price" inlineLabel placeholder={"New Price"} name={'finalPrice'}
                                             type={'number'} readOnly component={AutoFieldText}/>
                              ],

                              <AutoField name={"notes"} component={AutoFieldTextArea}/>
                          ]}
                          renderButton={(form) => <div>
                              <Button onClick={() => form.submit()} color={'green'}>REGISTER</Button>
                          </div>}
                          requestConfiguration={{
                              type: "http",
                              url: Config.SERVER_URL + "api/services",
                              method: "post"
                          }}/>
            </div>
        )
    }

    private calculateNewPrice = () => {
        const serviceField = this.form.getField('serviceId');
        const service = this.getServiceInfo(serviceField.getValue());
        const calculator = new RegisterServiceAutoFormPriceCalculator(this.form, service);
        calculator.calculate();
    };

    private getServicesOptions(): any[] {
        return this.props.services.map(item => {
            return {label: item.title, value: item.id}
        });
    }

    public getServiceInfo(id: any): any {
        for (let i = 0; i < this.props.services.length; i++) {
            if (this.props.services[i].id === id) {
                return this.props.services[i];
            }
        }
        return null;
    }

}

export default connect((store: any) => {
    return {
        loading: store.ServicesDetails.loading,
        error: store.ServicesDetails.error,
        services: store.ServicesDetails.array
    }
})(RegisterService)