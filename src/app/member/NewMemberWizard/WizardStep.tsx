import * as React from 'react';

export interface IWizardStepProps {
    component: React.ReactElement;
}

export default class WizardStep extends React.Component<IWizardStepProps> {
    public render() {
        return (
            <div className="wizard-step">
                {
                    this.props.component
                }
            </div>
        );
    }
}
