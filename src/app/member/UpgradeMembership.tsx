import * as React from "react";
import AutoForm from "../../lib/auto-form/core/AutoForm/AutoForm";
import AutoField from "../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldText from "../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText";
import AutoFieldSelect from "../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldSelect";
import MembershipType, {getMembershipTypeText} from "./MembershipType";
import {Button, Divider, Header} from "semantic-ui-react";
import Config from "../../bootstrap/Config";
import AutoFormItem from "../../lib/auto-form/core/AutoFormItem/AutoFormItem";
import AutoFormItemProps from "../../lib/auto-form/core/AutoFormItem/AutoFormItemProps";
import DateUtils from "../../shared/utils/DateUtils";
import {Redirect, RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {toastr} from "react-redux-toastr";

interface Props {
    memberId: number;
    route: RouteComponentProps;
}

export default class UpgradeMembership extends React.Component<Props> {

    constructor(props: any) {
        super(props);
        this.state = {loading: false};
    }

    render() {
        if (!this.props.route.location.state as any["member"]) {
            return <Redirect to={`/members/${this.props.memberId}`}/>
        }

        return (
            <div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Header size={"small"}>Member : {this.props.route.location.state as any["member"]["name"]}</Header>
                        <Header size={"small"}>Current Membership Type
                            : {getMembershipTypeText(this.props.route.location.state as any["member"]["type"])}</Header>
                        <Header size={"small"}>Expiration Date
                            : {this.props.route.location.state as any["member"]["expirationDate"]}</Header>
                    </div>
                    <div>
                        <Link className={'ui red button'} to={`/members/${this.props.memberId}`}>BACK</Link>
                    </div>
                </div>

                <Divider/>


                <Header size={"medium"}>RENEW/UPGRADE</Header>
                <Divider hidden/>

                <AutoForm fields={[
                    <AutoField as={'AutoField'} component={AutoFieldText} name="until" type={"date"}
                               inlineLabel label="New Expiration Date" labelWidth={'140px'}
                               validationRules={{datetime: {dateOnly: true}}}/>,
                    <AutoField as={'AutoField'} component={AutoFieldSelect} name={"membershipType"} options={this.membershipOptions()}
                               inlineLabel label="New Membership Type" labelWidth={'140px'}
                               validationRules={{numericality: {greaterThan: 0, lessThan: 4}}}
                    />,
                    <AutoFormItem as={'AutoFormItem'} component={RenewButtons}/>
                ]} renderButton={form =>
                    <div>
                        <Button loading={form.state.loading} disabled={form.state.loading} color={'green'}
                                onClick={() => form.submit()}>UPGRADE/RENEW</Button>
                    </div>
                } requestConfiguration={{
                    method: "post",
                    url: Config.SERVER_URL + `api/members/${this.props.memberId}/upgrade`,
                    type: "http"
                }}
                          onSuccess={() => {
                              const message = this.props.route.location.state as any["member"]["name"] + "'s membership info has been changed";
                              toastr.success('Succeed To Upgrade/Renew Membership', message);
                          }}
                          onError={() => {
                              toastr.error('Fail To Upgrade/Renew', "please check your internet connection and try again");
                          }}
                          clearOnSuccess
                />

            </div>
        )
    }


    private membershipOptions = () => {
        return [
            {label: "Silver", value: MembershipType.SILVER},
            {label: "Gold", value: MembershipType.GOLD},
            {label: "Business", value: MembershipType.BUSINESS}
        ]
    }

}

class RenewButtons extends AutoFormItem<AutoFormItemProps, any> {
    renderContent(): JSX.Element {
        return <div>
            <Divider hidden/>
            <Button.Group>
                <Button onClick={() => this.onMemberChange(1)} color={'blue'}>+1 Month</Button>
                <Button onClick={() => this.onMemberChange(12)} color={'blue'}>+1 Year</Button>
                <Button onClick={() => this.onMemberChange(18)} color={'blue'}>+18 Month</Button>
                <Button onClick={() => this.onMemberChange(24)} color={'blue'}>+2 Year</Button>
            </Button.Group>
        </div>
    }

    private onMemberChange = (months: number) => {
        const newDate = new Date();
        newDate.setMonth(newDate.getMonth() + months);
        const form = this.props.formRef;
        form.getField("until").setValue(DateUtils.toString(newDate));
    }
}