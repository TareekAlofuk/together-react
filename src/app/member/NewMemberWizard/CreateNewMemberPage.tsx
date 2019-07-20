import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import WizardStep from './WizardStep';
import CreateMember from '../Create/CreateMember';
import MemberCard from '../MemberCard';
import EditMember from '../EditMember';
import MemberPassportAndFaceImageUpload from '../Upload/MemberPassportAndFaceImageUpload';
import MemberCredentials from '../MemberCredentials';

export interface INewMemberWizardProps {
    route: RouteComponentProps
}

interface State {
    currentStep: "create" | "card" | "info" | "upload" | "credentials" | "report";
    loading: boolean;
    member: any;
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
        this.state = { currentStep: "upload", loading: false, member: { name: 'Ali Faris Abed', id: 1 } };
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
                case "card":
                    this.nextStep();
                    break;
                case "info":
                    this.setState({ loading: true });
                    if (this.currentComponent !== null) {
                        this.currentComponent.save();
                    }
                    break;
                case "upload":
                    if (this.currentComponent != null) {
                        if (!this.currentComponent.isBusy()) {
                            this.nextStep();
                        }
                    }
                    break;
                case "credentials":
                    this.setState({ loading: true });
                    if (this.currentComponent != null) {
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
            case "card":
                nextStep = "info";
                break;

            case "info":
                nextStep = "upload";
                break;

            case "upload":
                nextStep = "credentials";
                break;

            case "credentials":
                nextStep = "report";
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
                                this.setState({ member: { ...response } }, () => this.nextStep());
                            }
                        }} onError={error => {
                            console.log(error);
                        }} onComplete={() => {
                            this.setState({ loading: false })
                        }} />} />

            case "card":
                return <WizardStep ref={ref => this.currentStep = ref}
                    actionLoading={this.state.loading} onAction={this.onAction} nextButton="Next" skipButton="Skip"
                    component={<MemberCard member={this.state.member} />} />


            case "info":
                return <WizardStep
                    nextButton="Next" skipButton="Skip" prevButton="Back"
                    onAction={this.onAction} actionLoading={this.state.loading}
                    component={<EditMember
                        ref={ref => this.currentComponent = ref}
                        onSuccess={(response: any) => {
                            this.setState({ member: { ...response } }, () => this.nextStep());
                        }} onError={error => {
                            console.log(error);
                        }} onComplete={() => {
                            this.setState({ loading: false })
                        }}
                        editButton={false} member={this.state.member} />}
                />;


            case "upload":
                return <WizardStep
                    nextButton="Next" skipButton="Skip" prevButton="Back"
                    onAction={this.onAction} component={<MemberPassportAndFaceImageUpload ref={ref => this.currentComponent = ref} />} />;


            case "credentials":
                return <WizardStep onAction={this.onAction}
                    nextButton="Next" skipButton="Skip" prevButton="Back"
                    component={<MemberCredentials
                        onComplete={() => this.setState({ loading: false })}
                        onError={() => console.log("error")}
                        onSuccess={() => this.nextStep()}
                        ref={ref => this.currentComponent = ref}
                        saveButton={false} />} />

            case "report":
                return <WizardStep
                    onAction={this.onAction}
                    component={<h1>MEMBER REPORT</h1>}
                />

        }

        throw new Error("CANNOT RECOGNIZE STEP");
    }
}
