import * as React from "react";
import AutoForm from "../../lib/auto-form/core/AutoForm/AutoForm";
import AutoField from "../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldText from "../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText";
import {Button, Divider, Header} from "semantic-ui-react";
import Config from "../../bootstrap/Config";
import {toastr} from "react-redux-toastr";
import {getWalletErrorMessage} from "./WalletError";
import MemberAutoCompleteField from "../common/MemberAutoCompleteField";
import {getWalletActionTypeText, WalletActionType} from "./WalletActionType";

interface Props {
    actionType: WalletActionType;
}

export default class WalletAction extends React.Component<Props> {

    render() {
        return (
            <div style={{width: 500}}>
                <Header size={"medium"}>{getWalletActionTypeText(this.props.actionType)}</Header>
                <Divider/>

                <AutoForm fields={[
                    <AutoField as={'AutoField'} name={'memberId'} component={MemberAutoCompleteField}
                               validationRules={{numericality: {greaterThan: 0}}}/>,
                    [
                        <AutoField as={'AutoField'} placeholder={"Amount"} name={'amount'} type={'number'} component={AutoFieldText}/>,
                        <AutoField as={'AutoField'} placeholder={"Receiver"} name={'receiver'} component={AutoFieldText}/>,
                    ]
                ]}
                          renderButton={(form: AutoForm) => <div>
                              <Button color={'green'}
                                      onClick={form.submit}>SUBMIT</Button>
                          </div>}
                          onSuccess={() => toastr.success('Succeed to submit', '')}
                          onError={(error) => {
                              let message = 'checkout your internet connection';
                              if (error && error.response && error.response.data && error.response.data.errorCode) {
                                  message = getWalletErrorMessage(error.response.data.errorCode);
                              }
                              toastr.error('Fail to submit', message);
                          }}
                          requestConfiguration={{
                              type: "http",
                              method: "post",
                              url: Config.SERVER_URL + "api/wallet/" + (this.props.actionType === WalletActionType.DEPOSIT ? "deposit" : "withdraw")
                          }}/>
            </div>
        )
    }

}