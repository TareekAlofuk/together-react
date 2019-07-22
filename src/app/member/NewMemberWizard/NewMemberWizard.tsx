import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import WizardStep from './WizardStep';
import CreateMember from '../Create/CreateMember';
import MemberCard from '../MemberCard';
import EditMember from '../EditMember';
import MemberPassportAndFaceImageUpload from '../Upload/MemberPassportAndFaceImageUpload';
import MemberCredentials from '../MemberCredentials';
import {toastr} from "react-redux-toastr";

export interface INewMemberWizardProps {
    route: RouteComponentProps
}

interface State {
    currentStep: "create" | "card" | "info" | "upload" | "credentials" | "finish";
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
        this.state = {currentStep: "create", loading: false, member: {}};
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
                    this.setStateToTrueAndCallSave();
                    break;
                case "card":
                    this.nextStep();
                    break;
                case "info":
                    this.setStateToTrueAndCallSave();
                    break;
                case "upload":
                    if (this.currentComponent != null) {
                        if (!this.currentComponent.isBusy()) {
                            this.nextStep();
                        }
                    }
                    break;
                case "credentials":
                    this.setStateToTrueAndCallSave();
                    break;
            }
        } else if (action === "prev") {

        } else if (action === "end") {
            this.props.route.history.push("/member")
        }
    };

    private setStateToTrueAndCallSave() {
        this.setState({loading: true});
        if (this.currentComponent !== null) {
            this.currentComponent.save();
        }
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
                nextStep = "finish";
                break;
        }
        this.currentComponent = null;
        this.setState({currentStep: nextStep});
    };

    private getCurrentStep = (): React.ReactElement<WizardStep> => {
        switch (this.state.currentStep) {
            case "create":
                return this.getCreateMemberStep();
            case "card":
                return this.getDisplayCardStep();
            case "info":
                return this.getEditMemberStep();
            case "upload":
                return this.getUploadStep();
            case "credentials":
                return this.getCredentialsStep();
            case "finish":
                return this.getFinishStep();
        }
        throw new Error("CANNOT RECOGNIZE STEP");
    };

    private getFinishStep() {
        return <WizardStep
            onAction={this.onAction}
            component={<h1>DONE</h1>}
        />;
    }

    private getCredentialsStep() {
        return <WizardStep onAction={this.onAction}
                           nextButton="Next" skipButton="Skip" prevButton="Back"
                           component={<MemberCredentials
                               onComplete={() => this.setState({loading: false})}
                               onError={() => console.log("error")}
                               onSuccess={() => this.nextStep()}
                               ref={ref => this.currentComponent = ref}
                               saveButton={false}/>}/>;
    }

    private getUploadStep() {
        return <WizardStep
            nextButton="Next" skipButton="Skip" prevButton="Back"
            onAction={this.onAction}
            component={<MemberPassportAndFaceImageUpload ref={ref => this.currentComponent = ref}/>}/>;
    }

    private getEditMemberStep() {
        return <WizardStep
            nextButton="Next" skipButton="Skip" prevButton="Back"
            onAction={this.onAction} actionLoading={this.state.loading}
            component={<EditMember
                ref={ref => this.currentComponent = ref}
                onSuccess={(response: any) => {
                    this.setState({member: {...response}}, () => this.nextStep());
                }} onError={error => {

            }} onComplete={() => {
                this.setState({loading: false})
            }}
                editButton={false} member={this.state.member}/>}
        />;
    }

    private getDisplayCardStep() {
        return <WizardStep ref={ref => this.currentStep = ref}
                           actionLoading={this.state.loading} onAction={this.onAction} nextButton="Next"
                           skipButton="Skip"
                           component={<MemberCard member={this.state.member}/>}/>;
    }

    private getCreateMemberStep() {
        return <WizardStep ref={ref => this.currentStep = ref}
                           actionLoading={this.state.loading}
                           onAction={this.onAction}
                           nextButton="Next"
                           title={"Create New Member"}
                           component={<CreateMember
                               ref={ref => this.currentComponent = ref}
                               renderButton={false} onSuccess={(response: any) => {
                               if (response.id) {
                                   this.setState({member: {...response}}, () => this.nextStep());
                               }
                           }} onError={() => {
                               toastr.error('Failed To Create Member', 'Check your internet connection');
                           }} onComplete={() => {
                               this.setState({loading: false})
                           }}/>}/>;
    }
}
