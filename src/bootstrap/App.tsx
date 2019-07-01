import { hot } from 'react-hot-loader/root';
import * as React from 'react'
import { Provider as ReduxProvider } from "react-redux";

import store from "./store";
import AppLayout from './AppLayout';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';


class App extends React.Component {
    render() {
        return (
            <>
                <ReduxProvider store={store}>
                    <BrowserRouter>
                        <AppLayout appContent={<AppRouter />} />
                    </BrowserRouter>
                </ReduxProvider>
            </>
        )
    }
}


export default hot(App);