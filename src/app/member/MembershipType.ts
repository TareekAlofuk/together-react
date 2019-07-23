enum MembershipType {
    SILVER = 1,
    GOLD = 2,
    BUSINESS = 3,
}

export default MembershipType;


export function getMembershipTypeText(type: MembershipType) {
    switch (type) {
        case MembershipType.SILVER:
            return "SILVER";
        case MembershipType.GOLD:
            return "GOLD";
        case MembershipType.BUSINESS:
            return "BUSINESS";
    }
    return "UNKNOWN";
}