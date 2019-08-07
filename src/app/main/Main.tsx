import * as React from 'react';
import {Header, Loader} from "semantic-ui-react";
import Axios from "axios";
import Config from "../../bootstrap/Config";
import SessionManager from "../../shared/utils/SessionManager";
import AppLayout from "../../bootstrap/AppLayout";
import AppRouter from "../../bootstrap/AppRouter";
import {BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./LoginPage";

class Main extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {loading: true, loggedIn: false};
    }


    componentDidMount(): void {
        if (!SessionManager.hasSession()) {
            this.setState({loggedIn: false, loading: false});
            return;
        }
        Axios.post(Config.SERVER_URL + "api/user/refresh-token")
            .then(res => {
                const token = res.data.token;
                const userType = res.data.userType;
                SessionManager.login(token, userType);
                this.setState({loading: false, loggedIn: true});
            }).catch(() => {
            SessionManager.logout();
            this.setState({loading: false, loggedIn: false});
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.loading ? (
                            <div style={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', height: '100vh'
                            }}>
                                <Loader active inline/>
                                <Header size={'medium'}>Trying to login , please wait...</Header>
                            </div>
                        ) :
                        (
                            this.state.loggedIn ? this.renderApp() : this.renderLogin()
                        )
                }
            </div>
        );
    }

    private renderApp = () => {
        return <BrowserRouter>
            <AppLayout appContent={<AppRouter/>}/>
        </BrowserRouter>
    };

    private renderLogin = () => {
        return <BrowserRouter>
            <Route component={() => <LoginPage/>}/>
        </BrowserRouter>
    }
}

export default Main;