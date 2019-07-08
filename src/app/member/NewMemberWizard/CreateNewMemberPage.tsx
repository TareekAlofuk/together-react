import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import WizardStep from './WizardStep';
import CreateMember from '../Create/CreateMember';

export interface INewMemberWizardProps {
    route: RouteComponentProps
}

interface State {
    currentStep: "create" | "card" | "info" | "upload" | "credentials" | "report"
}

export default class NewMemberWizard extends React.Component<INewMemberWizardProps, State> {

    // 1 - Create New Member Form
    // 2 - Print Card Section
    // 3 - Edit Member Info Form
    // 4 - Upload Passport / FaceImage Form
    // 5 - User Credentials Form
    // 6 - Member Info Report Section        


    constructor(props: any) {
        super(props);
        this.state = { currentStep: "create" };
    }

    private lastStep: WizardStep = null;


    public render() {

        const currentStep = this.getCurrentStep();
        const lastStep = this.lastStep;

        return (
            <div id="new-member-wizard">
                <h1>Create Wizard</h1>
                {lastStep}
                {currentStep}
            </div>
        );
    }

    private getCurrentStep = (): React.ReactElement<WizardStep> => {

        switch (this.state.currentStep) {
            case "create":
                return <WizardStep component={<CreateMember />} />
                break;
        }

        throw new Error("CANNOT RECOGNIZE STEP");
    }
}
