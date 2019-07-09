import * as React from 'react';
import Button from '../../../ui/shared/Button';

export interface IWizardStepProps {
    component: any;
    onAction: (action: "end" | "next" | "prev") => any;
    title?: string;

    nextButton?: string;
    prevButton?: string;
    skipButton?: string;
    finishButton?: string;
    actionLoading?: boolean;

}

export default class WizardStep extends React.Component<IWizardStepProps, any> {

    private ref: any = null;

    constructor(props: IWizardStepProps) {
        super(props);
        this.state = { animationClass: true };
    }

    componentDidUpdate(prevProps: IWizardStepProps) {
        if (prevProps.component !== this.props.component && !this.state.animationClass) {
            this.setState({ animationClass: true });
        }
    }

    public render() {
        return (
            <div className={`wizard-step`}>
                <h3>Create Wizard / {this.props.title}</h3>
                <div
                    ref={ref => ref && ref.addEventListener('animationend', () => this.setState({ animationClass: false }))}
                    className={`wrapped-component ${this.state.animationClass ? 'animated bounceInUp' : ''}`}>
                    {this.props.component}
                </div>
                {
                    this.renderActions()
                }
            </div >
        );
    }

    public getWrappedComponent = () => {
        return this.props.component;
    }


    private renderActions = (): any => {
        if (!this.anyAction()) return null;

        const skipButton = this.props.skipButton ? <button onClick={() => this.props.onAction("end")}>{this.props.skipButton}</button> : null;
        const nextButton = this.props.nextButton ? <button onClick={() => this.props.onAction("next"
        )}>{this.props.nextButton}</button> : null;
        const prevButton = this.props.prevButton ? <Button title={this.props.prevButton} /> : null;
        const finishButton = this.props.finishButton ? <Button title={this.props.finishButton} /> : null;
        return <div className='wizard-actions'>
            {skipButton}
            {prevButton}
            {nextButton}
            {finishButton}
            {this.props.actionLoading && <h1>Loading...</h1>}
        </div>
    }

    private anyAction = (): boolean => {
        return this.props.skipButton !== undefined || this.props.nextButton !== undefined || this.props.prevButton !== undefined || this.props.finishButton !== undefined
    }

}
