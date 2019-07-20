import * as React from 'react';
import {Component} from "react";

class SnackbarProvider extends Component {
    render() {
        return (
            <div id={'snackbar-container'} style={{position: 'fixed', left: 0, top: 0, display: 'flex'}}>

            </div>
        );
    }
}

export default SnackbarProvider;