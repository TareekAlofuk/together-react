import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import WizardStep from './WizardStep';
import CreateMember from '../Create/CreateMember';
import MemberCard from '../MemberCard';
import EditMember from '../EditMember';
import MemberPassportAndFaceImageUpload from '../Upload/MemberPassportAndFaceImageUpload';
import MemberCredentials from '../MemberCredentials';
import {toastr} from "react-redux-toastr";
import WizardCompletedStep from "./WizardCompletedStep";
import {getMemberErrorMessage} from "../MemberErrorResponse";

export interface INewMemberWizardProps {
    route: RouteComponentProps
}

interface State {
    currentStep: "create" | "card" | "info" | "upload" | "credentials" | "finish";
    loading: boolean;
    member: any;
}

export default class NewMemberWizard extends React.Component<INewMemberWizardProps, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentStep: "create",
            loading: false,
            member: {}
        };
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

    private onAction = (action: "next" | "skip" | "end") => {
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
        } else if (action === "skip") {
            this.nextStep();
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
                //NOTE:skip credentials page
                nextStep = "finish";
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
            component={<WizardCompletedStep memberId={this.state.member.id}/>}
        />;
    }

    private getCredentialsStep() {
        const component = <div className={"member-credential-step"}>
            <MemberCredentials
                memberId={this.state.member.id}
                onComplete={() => this.setState({loading: false})}
                onError={() => {
                    toastr.error('Fail To Save Member Credentials',
                        'check your internet connection');
                }}
                onSuccess={() => this.nextStep()}
                ref={ref => this.currentComponent = ref}
                saveButton={false}/>
        </div>;
        return <WizardStep onAction={this.onAction}
                           nextButton="Next" skipButton="Skip" prevButton="Back"
                           title={"Member Credentials"}
                           component={component}/>;
    }

    private getUploadStep() {
        return <WizardStep
            nextButton="Next" skipButton="Skip" prevButton="Back"
            onAction={this.onAction}
            title={"Upload Passport Image / Identity Image"}
            component={<MemberPassportAndFaceImageUpload memberId={this.state.member.id}
                                                         ref={ref => this.currentComponent = ref}/>}/>;
    }

    private getEditMemberStep() {
        const component = <div className={'edit-member-step'}>
            <EditMember
                ref={ref => this.currentComponent = ref}
                onSuccess={(response: any) => {
                    this.setState({member: {...response}}, () => this.nextStep());
                }}
                onError={error => {
                    let message = "check your internet connection";
                    if (error.response && error.response.data) {
                        message = getMemberErrorMessage(error.response.data.errorCode);
                    }
                    toastr.error('Failed To Create Member', message);
                }}
                onComplete={() => {
                    this.setState({loading: false})
                }}
                editButton={false} member={this.state.member}/>
        </div>;
        return <WizardStep
            nextButton="Next" skipButton="Skip" prevButton="Back"
            onAction={this.onAction} actionLoading={this.state.loading}
            title={"Edit Member"}
            component={component}
        />;
    }

    private getDisplayCardStep() {
        return <WizardStep ref={ref => this.currentStep = ref}
                           actionLoading={this.state.loading} onAction={this.onAction} nextButton="Next"
                           skipButton="Skip"
                           title={"Member Card"}
                           component={<MemberCard member={this.state.member}/>}/>;
    }

    private getCreateMemberStep() {
        const component = <div className={'create-member-step'}>
            <CreateMember
                ref={ref => this.currentComponent = ref}
                renderButton={false} onSuccess={(response: any) => {
                if (response.id) {
                    this.setState({member: {...response}}, () => this.nextStep());
                }
            }} onError={(error) => {
                let message = "check your internet connection";
                if (error.response && error.response.data) {
                    message = getMemberErrorMessage(error.response.data.errorCode);
                }
                toastr.error('Failed To Create Member', message);
            }} onComplete={() => {
                this.setState({loading: false})
            }}/>
        </div>;
        return <WizardStep ref={ref => this.currentStep = ref}
                           actionLoading={this.state.loading}
                           onAction={this.onAction}
                           nextButton="Next"
                           title={"Create New Member"}
                           component={component}/>;
    }
}


//TODO : print card page