import * as React from 'react';

export interface IButtonProps {
    title: string;
}

export default class Button extends React.Component<IButtonProps> {
    public render() {
        return (
            <button className='app-button'>
                {this.props.title}
            </button>
        );
    }
}
