import * as React from "react";
import AutoForm from "../../lib/auto-form/core/AutoForm/AutoForm";
import {Button, Header} from "semantic-ui-react";
import AutoField from "../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldSelect from "../../lib/auto-form/components/FormElement/AutoFieldSelect/AutoFieldSelect";
import AutoFieldText from "../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText";
import AutoFormItem from "../../lib/auto-form/core/AutoFormItem/AutoFormItem";

interface Props {
}

export default class MembershipManagement extends React.Component<Props> {

    render() {
        return (
            <div>
                <Header size={"large"}>Membership Management</Header>
                <AutoForm fields={[
                    <AutoField name={"type"} component={AutoFieldSelect} options={[
                        {label: "SILVER", value: 1},
                        {label: "GOLD", value: 2},
                        {label: "BUSINESS", value: 3},
                    ]}/>,
                    <AutoField name={'expireDate'} component={AutoFieldText} type={'date'}/>,
                ]} renderButton={() => <Button>SAVE</Button>} requestConfiguration={{
                    type: "http",
                    url: ""
                }}/>
            </div>
        )
    }

}


