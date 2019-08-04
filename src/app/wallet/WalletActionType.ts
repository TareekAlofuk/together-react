export enum WalletActionType {
    DEPOSIT = 1,
    WITHDRAW = 2
}

export function getWalletActionTypeText(actionType: WalletActionType) {
    if (actionType === WalletActionType.DEPOSIT) return "DEPOSIT";
    else if (actionType === WalletActionType.WITHDRAW) return "WITHDRAW";
    return "UNKNOWN";
}