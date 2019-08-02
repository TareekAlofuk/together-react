import * as React from "react";
import AutoForm from "../../lib/auto-form/core/AutoForm/AutoForm";
import AutoField from "../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldText from "../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText";
import {Button} from "semantic-ui-react";
import Config from "../../bootstrap/Config";
import AutoFieldProps from "../../lib/auto-form/core/AutoField/AutoFieldProps";
import AutoCompleteMember from "../common/AutoCompleteMember";
import {Row} from "react-grid-system";

interface Props {
    actionType: WalletActionType;
}

export default class WalletAction extends React.Component<Props> {

    render() {
        return (
            <div style={{width: 500}}>
                <AutoForm fields={[
                    <AutoField name={'memberId'} component={MemberAutoCompleteField}
                               validationRules={{numericality: {greaterThan: 0}}}/>,
                    [
                        <AutoField name={'amount'} type={'number'} component={AutoFieldText}/>,
                        <AutoField name={'receiver'} component={AutoFieldText}/>,
                    ]
                ]}
                          renderButton={(form: AutoForm) => <div>
                              <Button color={'green'}
                                      onClick={form.submit}>SUBMIT</Button>
                          </div>}
                          requestConfiguration={{
                              type: "http",
                              method: "post",
                              url: Config.SERVER_URL + "api/wallet/deposit"
                          }}/>
            </div>
        )
    }

}


class MemberAutoCompleteField extends AutoField<AutoFieldProps> {

    renderContent(): any {

        return <Row>
            <AutoCompleteMember error={this.state.error}
                                onItemMemberSelected={(item: any) => this.onValueChange(item ? item.id : -1)}/>
        </Row>
    }

    extractValueFormInputEvent(e: any): any {
        return e;
    }
}

export enum WalletActionType {
    DEPOSIT = 1,
    WITHDRAW = 2
}

export function getWalletActionTypeText(actionType: WalletActionType) {
    if (actionType === WalletActionType.DEPOSIT) return "DEPOSIT";
    else if (actionType === WalletActionType.WITHDRAW) return "WITHDRAW";
    return "UNKNOWN";
}