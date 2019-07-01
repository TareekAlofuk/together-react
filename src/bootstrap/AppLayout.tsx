import * as React from 'react'
import AppBar from '../ui/AppLayout/AppBar';


interface Props {
    appContent: any
}

export default class AppLayout extends React.Component<Props> {
    render() {
        return (
            <div id="app-container">
                <AppBar />
                <div id="app-content">
                    {
                        this.props.appContent
                    }
                </div>
            </div>
        )
    }
}
