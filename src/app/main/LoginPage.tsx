import * as React from 'react';
import AutoForm from "../../lib/auto-form/core/AutoForm/AutoForm";
import AutoField from "../../lib/auto-form/core/AutoField/AutoField";
import AutoFieldText from "../../lib/auto-form/components/FormElement/AutoFieldText/AutoFieldText";
import {Button, Header} from "semantic-ui-react";
import {toastr} from "react-redux-toastr";
import SessionManager from "../../shared/utils/SessionManager";
import Config from "../../bootstrap/Config";

class LoginPage extends React.Component {
    render() {
        return (
            <div className={'login-page'}
                 style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     background: '#FFF',
                     height: '100vh'
                 }}>


                <div style={{width: 450}}>
                    <Header textAlign={'center'} size={"small"}>Together System</Header>
                    <AutoForm fields={[
                        <AutoField name={'username'} as={'AutoField'} component={AutoFieldText} placeholder={'Username'}/>,
                        <AutoField name={'password'} as={'AutoField'} component={AutoFieldText} placeholder={'Password'}
                                   type={'password'}/>
                    ]}
                              renderButton={form => <div>
                                  <Button onClick={() => form.submit()}
                                          disabled={form.state.disabled}
                                          loading={form.state.loading}
                                          fluid color={'blue'}>LOGIN</Button>
                              </div>}
                              onError={() => {
                                  toastr.error('Fail to login', '');
                              }}
                              onSuccess={(response: any) => {
                                  const token = response.token;
                                  const userType = response.userType;
                                  SessionManager.login(token, userType);
                                  window.location.reload();
                              }}
                              requestConfiguration={{
                                  type: "http",
                                  url: Config.SERVER_URL + "api/user/login",
                                  method: "post"
                              }}/>
                </div>

            </div>
        );
    }
}

export default LoginPage;