import {hot} from 'react-hot-loader/root';
import * as React from 'react'
import {Provider as ReduxProvider} from "react-redux";
import ReduxToastr from "react-redux-toastr";
import store from "./store";
import AppLayout from './AppLayout';
import AppRouter from './AppRouter';
import {BrowserRouter} from 'react-router-dom';

import "./style-loader";

class App extends React.Component {
    render() {
        return (
            <>
                <ReduxProvider store={store}>
                    <BrowserRouter>
                        <AppLayout appContent={<AppRouter/>}/>
                    </BrowserRouter>


                    <ReduxToastr
                        timeOut={5000}
                        transitionIn={'bounceIn'}
                        transitionOut={'bounceOutUp'}
                        position={'bottom-right'}
                        newestOnTop={false}
                        progressBar={true}
                        closeOnToastrClick/>

                </ReduxProvider>
            </>
        )
    }
}


export default hot(App);