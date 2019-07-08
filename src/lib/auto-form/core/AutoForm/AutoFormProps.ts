import { AxiosRequestConfig } from "axios";
import AutoForm from "./AutoForm";

export default interface AutoFormProps {
    fields: any[];
    renderButton: (form: AutoForm) => any;
    renderLoadingIndicator?: (form: AutoForm) => any;
    onAnyValueChange?: (name: string, value: any) => void;
    onComplete?: (form: AutoForm) => void;
    onSuccess?: (response: any, form: AutoForm) => void;
    onError?: (e: any, form: AutoForm) => void;
    onLoadingStart?: (form: AutoForm) => void;
    onLoadingEnd?: (form: AutoForm) => void;
    onSubmit?: (form: AutoForm) => boolean;
    clearOnSuccess?: boolean;
    requestConfiguration: RequestConfiguration
    initialValues?: any;
}

export interface RequestConfiguration {
    type: "http" | "firebase_database" | "firebase_firestore"
    url: string;
    method?: "post" | "get" | "put" | "delete" | "patch";
    withUpload?: boolean;
    axiosConfig?: AxiosRequestConfig;
    extractDataAfterFilesUploaded?: (uploadedFiles: any[], data: any) => any | false;
    firestoreSaveMode?: "update" | "set";
    extractFirebaseFunc?: string;
}