import * as React from 'react';
import {Button, Divider} from "semantic-ui-react";

export interface IWizardStepProps {
    component: any;
    onAction: (action: "end" | "next" | "skip") => any;
    title?: string;

    nextButton?: string;
    prevButton?: string;
    skipButton?: string;
    finishButton?: string;
    actionLoading?: boolean;

}

export default class WizardStep extends React.Component<IWizardStepProps, any> {

    constructor(props: IWizardStepProps) {
        super(props);
        this.state = {animationClass: true};
    }

    componentDidUpdate(prevProps: IWizardStepProps) {
        console.log(prevProps, this.props);
        if (!this.state.animationClass) {
            this.setState({animationClass: true});
        }
    }

    public render() {
        return (
            <div className={`wizard-step`}>
                <h3>Wizard / {this.props.title}</h3>
                <Divider/>
                <div
                    ref={ref => ref && ref.addEventListener('animationend', () => this.setState({animationClass: false}))}
                    className={`wrapped-component ${this.state.animationClass ? 'animated bounceInUp' : ''}`}>
                    {this.props.component}
                </div>
                {
                    this.renderActions()
                }
            </div>
        );
    }

    private renderActions = (): any => {
        if (!this.anyAction()) return null;

        const skipButton = this.props.skipButton ?
            <Button loading={this.props.actionLoading} disabled={this.props.actionLoading}
                    onClick={() => this.props.onAction("skip")}>{this.props.skipButton}</Button> : null;
        const nextButton = this.props.nextButton ?
            <Button loading={this.props.actionLoading} disabled={this.props.actionLoading}
                    color={'blue'} onClick={() => this.props.onAction("next"
            )}>{this.props.nextButton}</Button> : null;
        const finishButton = this.props.finishButton ?
            <Button loading={this.props.actionLoading} disabled={this.props.actionLoading}
                    onClick={() => this.props.onAction("skip")}>{this.props.finishButton}</Button> : null;
        return <div className='wizard-actions'>
            {skipButton}
            {nextButton}
            {finishButton}
        </div>
    };

    private anyAction = (): boolean => {
        return this.props.skipButton !== undefined || this.props.nextButton !== undefined || this.props.prevButton !== undefined || this.props.finishButton !== undefined
    }

}
