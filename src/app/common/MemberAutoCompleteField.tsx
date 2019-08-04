import AutoField from "../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldProps from "../../lib/auto-form/core/AutoField/AutoFieldProps";
import {Row} from "react-grid-system";
import AutoCompleteMember from "./AutoCompleteMember";
import * as React from "react";

export default class MemberAutoCompleteField extends AutoField<AutoFieldProps> {

    renderContent(): any {

        return <div>
            <Row style={{margin: 0}}>
                <AutoCompleteMember error={this.state.error}
                                    onItemMemberSelected={(item: any) => this.onValueChange(item ? item.id : -1)}/>
            </Row>
        </div>
    }

    extractValueFormInputEvent(e: any): any {
        return e;
    }
}
