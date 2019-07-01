import * as React from "react";
import AutoField from "./AutoField";
import AutoFieldProps from "./AutoFieldProps";

export interface AutoFileFieldProps extends AutoFieldProps {
    validTypes?: string[];
    multiple: boolean;
    showSelectedFileName?: boolean;
}

export default abstract class AutoFileField<T extends AutoFileFieldProps> extends AutoField<T> {

    constructor(props: T) {
        super(props);
        this.state = {files: [], error: false, value: ''};
    }

    public clear(): void {
        this.setState({files: [], value: ''});
    };

    public onFilesSelected = (e: any): void => {
        let files: FileList = e.target.fields;
        if (!files) {
            this.setState({files: null});
            return;
        }

        if (this.props.validTypes && this.props.validTypes.length > 0 && !this.validateFiles(files)) {
            this.setState({files: null});
            return
        }
        this.setState({files: files});
    };

    validateFiles(files: FileList): boolean {
        for (let i = 0; i < files.length; i++) {
            const type = files[i].type;
            const validTypes = this.props.validTypes!;
            if (validTypes.indexOf(type) === -1)
                return false;
        }
        return true;
    };

    public getFile(): any {
        if (!this.state.files) {
            return null;
        }
        if (this.props.multiple)
            return this.state.files;
        else
            return this.state.files[0];
    };

    public getFileName(placeholder: string = "Selected Files", placeholderAtTheStart: boolean = true): string {
        if (!this.props.showSelectedFileName || !this.state.files || this.state.files.length == 0) {
            return '';
        }
        if (this.state.files.length > 1) {
            return (placeholderAtTheStart ? placeholder : '')
                + ' ' + this.state.files.length + " "
                + (placeholderAtTheStart ? '' : placeholder)
        }

        return (this.state.files[0] as any)["name"];
    }

}