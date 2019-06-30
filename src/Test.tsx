import * as React from 'react'

export default class Test extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { counter: 0 };
    }

    render() {
        const title: string = "Test Component";
        return (
            <div>
                {title}
                <h1>{this.state.counter}</h1>
                <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>CHANGE</button>
            </div>
        )
    }
}
