export enum ServiceErrorCode {
    NOT_ALLOWED = 201,
    NOT_ENOUGH_IN_STORE = 202,
    SERVICE_NOT_FOUND = 203,
    CANNOT_DECREASE_SERVICE = 204,
    CANNOT_UNREGISTER_UNLIMITED_SERVICE = 205,
    MEMBER_IS_ARCHIVED = 206,
    MEMBER_IS_DISABLED = 207
}


export function getServiceErrorMessage(errorCode: ServiceErrorCode): string {
    switch (errorCode) {
        case ServiceErrorCode.NOT_ALLOWED:
            return "الخدمة غير متوفرة";
        case ServiceErrorCode.NOT_ENOUGH_IN_STORE:
            return "لا يوجد رصيد لهذا النوع من الخدمات";
        case ServiceErrorCode.SERVICE_NOT_FOUND:
            return "الخدمة غير موجودة";
        case ServiceErrorCode.CANNOT_DECREASE_SERVICE:
            return "لا يمكن تقليل الرصيد";
        case ServiceErrorCode.CANNOT_UNREGISTER_UNLIMITED_SERVICE:
            return "لم يتمكن من حدف الخدمة";
        case ServiceErrorCode.MEMBER_IS_ARCHIVED:
            return "المشترك مؤرشف";
        case ServiceErrorCode.MEMBER_IS_DISABLED:
            return "الاشتراك غير فعال";
    }
    return "غير معروف";
}