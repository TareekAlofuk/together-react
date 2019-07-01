import { hot } from 'react-hot-loader/root';
import * as React from 'react'
import { Provider as ReduxProvider } from "react-redux";

import store from "./store";
import CreateMember from '../app/member/Create/CreateMember';
import AppLayout from './AppLayout';
import AppRouter from './AppRouter';


class App extends React.Component {
    render() {
        return (
            <>
                <ReduxProvider store={store}>
                    <AppLayout appContent={<AppRouter />} />
                </ReduxProvider>
            </>
        )
    }
}


export default hot(App);