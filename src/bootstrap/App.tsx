import { hot } from 'react-hot-loader/root';
import * as React from 'react'
import Test from './../Test';
import { Provider as ReduxProvider } from "react-redux";

import store from "./store";


class App extends React.Component {
    render() {
        return (
            <>
                <ReduxProvider store={store}>
                    <Test />
                </ReduxProvider>
            </>
        )
    }
}


export default hot(App);