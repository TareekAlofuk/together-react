import * as React from "react";
import AutoForm from "../../../lib/auto-form/core/AutoForm/AutoForm";
import AutoField from "../../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldSelect from "../../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldSelect";
import {connect} from "react-redux";
import AutoFieldTextArea from "../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldTextArea";
import AutoFieldText from "../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText";
import {GETAction} from "reduxpp/dist/action/AxiosAction";
import Config from "../../../bootstrap/Config";
import ReduxActions from "../../../bootstrap/ReduxActions";
import {Button, Header} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import RegisterServiceAutoFormPriceCalculator from "./PriceCalculator";
import NetworkingComponent from "../../common/NetworkingComponent";
import {toastr} from "react-redux-toastr";
import {getServiceErrorMessage} from "../ServiceError";
import AutoFieldRadioButton
    from "../../../lib/auto-form/components/FormElement/AutoFieldRadioButton/AutoFieldRadioButton";

interface Props {
    loading: boolean;
    error: boolean;
    services: any[];
    dispatch: (action: any) => void;
    member: any;
    route: RouteComponentProps;
}

class RegisterService extends React.Component<Props> {

    private form: AutoForm;

    componentWillMount() {
        this.dispatchFetchServicesAction();
    }

    private dispatchFetchServicesAction() {
        const url = Config.SERVER_URL + "api/services/all";
        const membershipType = this.props.member.type;
        const action = GETAction(ReduxActions.GET_SERVICES_DETAILS, url, {membershipType: membershipType});
        this.props.dispatch(action);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.member.id !== this.props.member.id) {
            this.dispatchFetchServicesAction();
        }
    }

    render(): JSX.Element {
        return <NetworkingComponent loading={this.props.loading}
                                    error={this.props.error}
                                    component={() => this.renderForm()}
                                    notReadyRender={() => <Header size={'medium'}>NO SERVICES ASSOCIATED TO THIS
                                        MEMBER</Header>}
                                    ready={this.props.services && this.props.services.length > 0}/>
    }

    private renderForm(): JSX.Element {
        return <div id={"register-service-form"}>
            <AutoForm ref={ref => this.form = ref}
                      fields={[
                          <AutoField as={'AutoField'} component={AutoFieldSelect} name={'serviceId'}
                                     validationRules={{numericality: {greaterThan: 0}}}
                                     afterValueChanged={this.onServiceChange}
                                     md={6}
                                     options={this.getServicesOptions()}/>,

                          <AutoField as={'AutoField'} type={"hidden"} defaultValue={this.props.member.id} component={AutoFieldText}
                                     name={"memberId"}/>,

                          <AutoField as={'AutoField'} name={'discountType'}
                                     title={'Discount Type'} component={AutoFieldRadioButton}
                                     defaultValue={'ratio'} afterValueChanged={() => this.calculateNewPrice()}
                                     options={[{label: 'Ratio', value: 'ratio'}, {label: 'Fixed', value: 'fixed'}]}/>,
                          [
                              <AutoField as={'AutoField'} label="Price" afterValueChanged={() => this.calculateNewPrice()}
                                         inlineLabel placeholder={"Price"} name={'price'}
                                         type={'number'} component={AutoFieldText}/>,
                              <AutoField as={'AutoField'} label="Commission" afterValueChanged={() => this.calculateNewPrice()}
                                         inlineLabel placeholder={"Commission"}
                                         name={'commission'} type={'number'} component={AutoFieldText}/>,
                              <AutoField as={'AutoField'} label="Discount"
                                         inlineLabel placeholder={"Discount"} name={'discount'}
                                         type={'number'} component={AutoFieldText}/>,
                              <AutoField as={'AutoField'} label="Count" defaultValue={'1'}
                                         afterValueChanged={() => this.calculateNewPrice()}
                                         validationRules={{numericality: {greaterThan: 0}}}
                                         inlineLabel placeholder={"Count"} name={'count'}
                                         type={'number'} component={AutoFieldText}/>,
                              <AutoField as={'AutoField'} label="Final Price" inlineLabel placeholder={"Final Price"} name={'finalPrice'}
                                         type={'number'} readOnly component={AutoFieldText}/>
                          ],

                          <AutoField as={'AutoField'} name={"notes"} component={AutoFieldTextArea}/>
                      ]}
                      renderButton={(form) => <div>
                          <Button onClick={() => form.submit()} color={'green'}>REGISTER</Button>
                      </div>}
                      onSuccess={() => {
                          toastr.success('Success to register service', '');
                      }}
                      onError={(error) => {
                          let message = 'Check your internet connection';
                          if (error && error.response && error.response.data && error.response.data.errorCode) {
                              message = getServiceErrorMessage(error.response.data.errorCode);
                          }
                          toastr.error('Fail to register service', message);
                      }}
                      clearOnSuccess
                      requestConfiguration={{
                          type: "http",
                          url: Config.SERVER_URL + "api/services",
                          method: "post"
                      }}/>
        </div>;
    }

    private onServiceChange = (e: any, value: any) => {
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
    };

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