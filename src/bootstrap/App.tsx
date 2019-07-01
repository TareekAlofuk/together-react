import { hot } from 'react-hot-loader/root';
import * as React from 'react'
import { Provider as ReduxProvider } from "react-redux";

import store from "./store";
import CreateMember from '../app/member/Create/CreateMember';


class App extends React.Component {
    render() {
        return (
            <>
                <ReduxProvider store={store}>
                    <CreateMember />
                </ReduxProvider>
            </>
        )
    }
}


export default hot(App);