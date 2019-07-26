enum MemberErrorCode {
    NAME_ALREADY_EXISTS = 103
}

export function getMemberErrorMessage(code: any): any {
    return getErrorMessageEn(code);
}

function getErrorMessageEn(code: any): any {
    switch (code) {
        case MemberErrorCode.NAME_ALREADY_EXISTS :
            return "Member name is already taken"
    }
    return "Unknown Error";
}