import * as React from 'react'


interface Props {
    appContent: any
}

export default class AppLayout extends React.Component<Props> {
    render() {
        return (
            <div id="app-container">
                <div id="app-bar"></div>
                <div id="app-content">
                    {
                        this.props.appContent
                    }
                </div>
            </div>
        )
    }
}
