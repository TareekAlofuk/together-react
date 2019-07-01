import IAutoField from "./../AutoField/IAutoField";

export default interface IAutoForm {

    getValues(): object;

    setValues(values: object): void;

    validate(): boolean;

    attachValue(name: string, value: any): void;

    deAttachValue(name: string): void;

    attachFile(name: string, file: any): void;

    deAttachFile(name: string): void;

    submit(): void;

    onLoad(): void;

    onComplete(): void;

    onSuccess(response: any): void;

    onError(reason: any): void;

    onAnyValueChange(name: string, value: any, form: IAutoForm): void;

    getField(name: string): IAutoField | null;

    getAllFields(): any[];

}