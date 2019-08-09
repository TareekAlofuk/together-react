import * as React from "react";
import {Button, Header, List, Modal} from "semantic-ui-react";
import AutoForm from "../../../lib/auto-form/core/AutoForm/AutoForm";
import Config from "../../../bootstrap/Config";
import AutoField from "../../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldTextArea from "../../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldTextArea";
import {Col, Row} from "react-grid-system";

interface Props {
    open: boolean;
    defaultMessage: string;
    handleClose: () => void;
    members: { id: any, name: string }[];
}

export default class SendSmsModel extends React.Component<Props> {
    private form: AutoForm = null;

    render(): JSX.Element {
        return (
            <Modal open={this.props.open}>
                <Modal.Header>
                    SEND SMS
                </Modal.Header>
                <Modal.Content>
                    <Row>
                        <Col>
                            <AutoForm ref={ref => this.form = ref} fields={[
                                <AutoField name={'message'} component={AutoFieldTextArea} rows={5}
                                           defaultValue={this.props.defaultMessage}
                                           placeholder={'SMS Message'}/>,
                            ]}
                                      renderButton={() => null}
                                      requestConfiguration={{
                                          type: "http",
                                          url: Config.SERVER_URL + "api/engaging/sms",
                                          method: "post"
                                      }}/>
                        </Col>
                        <Col>
                            <div style={{maxHeight: 450, overflowY: 'scroll'}}>
                                <Header size={"small"}>Selected Members</Header>
                                {
                                    this.props.members.map(item => {
                                        return <List bulleted key={item.id}>
                                            <List.Item>{item.name}</List.Item>
                                        </List>

                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.send} color={'green'}>SEND</Button>
                    <Button onClick={() => this.props.handleClose()}>CANCEL</Button>
                </Modal.Actions>
            </Modal>
        )
    }

    private send = () => {
        this.form.attachValue('members', JSON.stringify(this.props.members));
        this.form.submit();
        this.props.handleClose();
    }
}