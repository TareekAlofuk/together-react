import * as React from "react";
import AutoField from "../../../core/AutoField/AutoField";
import AutoFieldProps from "../../../core/AutoField/AutoFieldProps";
import {Col, Row} from "react-grid-system";

export default class AutoFieldRenderer {

    private field: AutoField<AutoFieldProps>;

    constructor(autoField: AutoField<AutoFieldProps>) {
        this.field = autoField;
    }

    public renderContent(content: any = null): any {
        const Wrapper = this.field.props.renderAsBlock ? Row : React.Fragment;
        let wrapperProps = this.field.props.renderAsBlock ? {
            ...this.getSizeProps(),
            style: {marginRight: 0, marginLeft: 0}
        } : {};

        return (
            <Wrapper {...wrapperProps}>
                <Col>
                    {
                        content
                    }
                </Col>
            </Wrapper>
        )
    }

    private getSizeProps = () => {
        const sizes: any = {};
        if (this.field.props.xs)
            sizes["xs"] = this.field.props.xs;
        if (this.field.props.sm)
            sizes["sm"] = this.field.props.sm;
        if (this.field.props.md)
            sizes["md"] = this.field.props.md;
        if (this.field.props.lg)
            sizes["lg"] = this.field.props.lg;
        return sizes;
    };
}