import { hot } from 'react-hot-loader/root';
import * as React from 'react'
import Test from './Test';

class App extends React.Component {
    render() {
        return (
            <>
                <Test />
            </>
        )
    }
}


export default hot(App);