export default class SessionManager {
    public static login(token: string, userType: string) {
        localStorage["token"] = token;
        localStorage["userType"] = userType;
    }

    public static getUserType() {
        return localStorage["userType"];
    }

    public static isAdmin() {
        return localStorage["userType"] === "Admin";
    }

    public static isControl() {
        return localStorage["userType"] === "Control";
    }

    public static isAccountant() {
        return localStorage["userType"] === "Accountant";
    }

    public static hasSession() {
        return !!localStorage["token"]
    }

    public static logout() {
        localStorage["token"] = "";
        localStorage["userType"] = "";
    }

    public static getToken() {
        return localStorage["token"];
    }
}