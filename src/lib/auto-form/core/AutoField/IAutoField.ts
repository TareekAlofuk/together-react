export default interface IAutoField {

    onValueChange(e: any): void;

    getName(): string;

    setValue(value: any): void;

    getValue(): any;

    clear(): void;

    validate(): boolean;

    setError(error: boolean): void;

    getTag(): any;
}