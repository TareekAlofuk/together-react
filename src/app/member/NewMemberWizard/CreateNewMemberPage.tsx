import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import WizardStep from './WizardStep';
import CreateMember from '../Create/CreateMember';

export interface INewMemberWizardProps {
    route: RouteComponentProps
}

interface State {
    currentStep: "create" | "card" | "info" | "upload" | "credentials" | "report";
    loading: boolean;
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
        this.state = { currentStep: "create", loading: false };
    }

    private currentStep: WizardStep = null;
    private currentComponent: any = null;


    public render() {

        const currentStep = this.getCurrentStep();

        return (
            <div id="new-member-wizard">
                {currentStep}
            </div>
        );
    }

    private onAction = (action: "next" | "prev" | "end") => {
        if (action === "next") {
            switch (this.state.currentStep) {
                case "create":
                    this.setState({ loading: true });
                    if (this.currentComponent !== null) {
                        this.currentComponent.save();
                    }
                    break;
            }
        } else if (action === "prev") {

        } else if (action === "end") {
            this.props.route.history.push("/member")
        }
    }



    private onResult = () => {
    }

    private nextStep = () => {
        let nextStep: any = null;
        switch (this.state.currentStep) {
            case "create":
                nextStep = "card";
                break;
        }
        this.currentComponent = null;
        this.setState({ currentStep: nextStep });
    }

    private getCurrentStep = (): React.ReactElement<WizardStep> => {

        switch (this.state.currentStep) {
            case "create":
                return <WizardStep ref={ref => this.currentStep = ref}
                    actionLoading={this.state.loading}
                    onAction={this.onAction}
                    nextButton="Next"
                    component={<CreateMember
                        ref={ref => this.currentComponent = ref}
                        renderButton={false} onSuccess={(response: any) => {
                            if (response.id) {
                                this.nextStep();
                            }
                        }} onError={error => {
                            console.log(error);
                        }} onComplete={() => {
                            this.setState({ loading: false })
                        }} />} />
                break;
            case "card":
                return <WizardStep ref={ref => this.currentStep = ref} actionLoading={this.state.loading} onAction={this.onAction} nextButton="Next" skipButton="Skip" component={<h1>Card To Print</h1>} />
        }

        throw new Error("CANNOT RECOGNIZE STEP");
    }
}
